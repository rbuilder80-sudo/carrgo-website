import { db } from '@/lib/db';
import { logActivity } from './log';
import { webSearch } from './ai';
import { generateArticle } from './content';
import { checkRankLive, TARGET_DOMAIN } from './rank';

// ---------- platform permission store (one-time permission per platform) ----------

type PermissionMap = Record<string, { status: 'granted' | 'denied'; at: string }>;

const PERM_KEY = 'platform_permissions';

export async function getPermissions(): Promise<PermissionMap> {
  const row = await db.setting.findUnique({ where: { key: PERM_KEY } });
  if (!row) return {};
  try { return JSON.parse(row.value) as PermissionMap; } catch { return {}; }
}

export async function getPermission(platform: string): Promise<'granted' | 'denied' | 'none'> {
  // credential-level permission wins (set from Publisher Hub), else shared setting map
  const cred = await db.platformCredential.findFirst({ where: { platform }, orderBy: { updatedAt: 'desc' } });
  if (cred && cred.permission !== 'none') return cred.permission as 'granted' | 'denied';
  const perms = await getPermissions();
  return perms[platform]?.status || 'none';
}

export async function setPermission(platform: string, status: 'granted' | 'denied' | 'none'): Promise<void> {
  const perms = await getPermissions();
  if (status === 'none') delete perms[platform];
  else perms[platform] = { status, at: new Date().toISOString() };
  await db.setting.upsert({ where: { key: PERM_KEY }, create: { key: PERM_KEY, value: JSON.stringify(perms) }, update: { value: JSON.stringify(perms) } });
  await db.platformCredential.updateMany({ where: { platform }, data: { permission: status, permissionAt: status === 'none' ? null : new Date() } });
}

async function getSetting(key: string, fallback = ''): Promise<string> {
  const row = await db.setting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

async function setSetting(key: string, value: string) {
  await db.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
}

// ---------- logging ----------

async function alog(step: 'think' | 'act' | 'result', message: string, detail = '', ok = true) {
  await db.autopilotLog.create({ data: { step, message: message.slice(0, 400), detail: detail.slice(0, 3000), ok } });
}

/** Hard timeout wrapper — LLM/search calls must never hang a cycle forever. */
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)), ms);
    p.then(v => { clearTimeout(t); resolve(v); }).catch(e => { clearTimeout(t); reject(e); });
  });
}

// ---------- the autonomous brain ----------

type LatestRank = { term: string; position: number | null; checkedAt: Date | null; priority: boolean; estVolume: number | null };

export async function runAutopilotCycle(trigger: 'auto' | 'manual' = 'auto'): Promise<{ ran: boolean; reason?: string; summary?: string }> {
  // concurrency guard (with stale-lock recovery)
  const runningSince = await getSetting('autopilot_running_at');
  if (runningSince && Date.now() - Number(runningSince) < 5 * 60 * 1000) {
    return { ran: false, reason: 'cycle already running' };
  }
  await setSetting('autopilot_running_at', String(Date.now()));

  const startedAt = Date.now();
  try {
    const mode = await getSetting('autopilot_mode', 'aggressive');
    await alog('think', `Autopilot cycle triggered (${trigger}, mode: ${mode}). Assessing battlefield…`);

    // 1. Gather real state: every priority keyword with its latest rank
    const priorityKws = await db.keyword.findMany({ where: { priority: true }, orderBy: { createdAt: 'asc' } });
    const latestChecks = await db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 400 });
    const latestByTerm = new Map<string, { position: number | null; checkedAt: Date }>();
    for (const c of latestChecks) {
      if (!latestByTerm.has(c.term)) latestByTerm.set(c.term, { position: c.position, checkedAt: c.checkedAt });
    }
    const ranks: LatestRank[] = priorityKws.map(k => ({
      term: k.term,
      position: latestByTerm.get(k.term)?.position ?? null,
      checkedAt: latestByTerm.get(k.term)?.checkedAt ?? null,
      priority: true,
      estVolume: k.estVolume,
    }));

    const ranked = ranks.filter(r => r.checkedAt);
    const unchecked = ranks.filter(r => !r.checkedAt);
    const enquiriesToday = await db.enquiry.count({ where: { receivedAt: { gte: new Date(new Date().toISOString().slice(0, 10)) } } });
    const devicesOnline = await db.pairedDevice.count({ where: { status: 'online' } });
    const drafts = await db.contentDraft.count();

    await alog('think', `State: ${priorityKws.length} priority keywords, ${ranked.length} with live rank data, ${unchecked.length} never checked. Enquiries today: ${enquiriesToday}. Extension device: ${devicesOnline ? 'ONLINE' : 'offline'}. Drafts in studio: ${drafts}.`);

    // 2. RANK SWEEP — check the 2 stalest priority keywords (live Google searches)
    const stalest = [...ranks]
      .sort((a, b) => (a.checkedAt?.getTime() ?? 0) - (b.checkedAt?.getTime() ?? 0))
      .slice(0, 2);
    const rankResults: Array<{ term: string; position: number | null }> = [];
    for (const k of stalest) {
      try {
        const r = await checkRankLive(k.term, TARGET_DOMAIN, 20);
        rankResults.push({ term: r.term, position: r.position });
        await alog('act', `Live rank check: "${r.term}"`, r.found
          ? `carrgo.co.uk found at position ${r.position} — ${r.url}`
          : `Not in top 20. Leaders: ${r.top.slice(0, 3).map(t => `${t.pos}. ${t.host}`).join(', ')}`, true);
      } catch (e) {
        await alog('act', `Rank check failed for "${k.term}"`, (e as Error).message, false);
      }
    }

    // merge fresh results into the picture
    for (const r of rankResults) {
      const hit = ranks.find(x => x.term === r.term);
      if (hit) { hit.position = r.position; hit.checkedAt = new Date(); }
    }

    // 3. OPPORTUNITY ANALYSIS — striking distance first (pos 4-25), then unranked with volume
    const striking = ranks.filter(r => r.checkedAt && r.position !== null && r.position >= 4 && r.position <= 25)
      .sort((a, b) => (a.position! - b.position!));
    const unranked = ranks.filter(r => r.checkedAt && r.position === null);
    let target: LatestRank | null = striking[0] || unranked[0] || null;
    let rationale = '';
    if (target && striking.includes(target)) {
      rationale = `position ${target.position} — striking distance (pages 1-3); a dedicated article can push it into the top 3`;
    } else if (target) {
      rationale = 'currently not ranking in top 20; a fresh targeted page creates a new ranking asset';
    }
    if (!target && ranks.length) {
      target = ranks[0];
      rationale = 'no live rank data yet — building a content asset for the top priority keyword';
    }

    // 4. CONTENT — generate a real article for the chosen keyword
    let draftTitle = '';
    let draftId = '';
    if (target) {
      await alog('think', `Content decision: targeting "${target.term}" — ${rationale}. Writing a full SEO article now…`);
      try {
        const searchCtx = (await withTimeout(webSearch(`${target.term} UK`, 4), 30000, 'Search context')).map(r => `${r.name}: ${r.snippet || ''}`).join('\n');
        const article = await withTimeout(generateArticle(target.term, [target.term, 'freight forwarding', 'UK logistics'], 1100, searchCtx), 240000, 'Article generation');
        const draft = await db.contentDraft.create({
          data: {
            title: article.title.slice(0, 250),
            bodyMd: article.bodyMd,
            tags: article.tags.join(', '),
            keywords: target.term,
            wordCount: article.wordCount,
            status: 'draft',
            source: 'agent',
            metaJson: JSON.stringify({ metaDescription: article.metaDescription, autopilot: true, targetKeyword: target.term }),
          },
        });
        draftTitle = draft.title;
        draftId = draft.id;
        await alog('act', `Article written: "${article.title}" (${article.wordCount} words)`, `Saved to Content Studio as draft ${draft.id}. Meta: ${article.metaDescription?.slice(0, 160)}`, true);
        await logActivity('autopilot', `Autopilot wrote "${article.title}" targeting "${target.term}"`);
      } catch (e) {
        await alog('act', `Content generation failed for "${target.term}"`, (e as Error).message, false);
      }
    } else {
      await alog('think', 'No keywords available to target — add priority keywords in Keyword Scout.', '', false);
    }

    // 5. PUBLISH — send to the first destination with one-time permission granted
    let publishedTo = '';
    if (draftId) {
      const platformsWanted = ['medium', 'linkedin', 'devto', 'wordpress', 'medium_api', 'telegram', 'webhook', 'x', 'quora', 'blogger', 'facebook', 'pinterest', 'reddit'];
      let destination: { platform: string; channel: 'api' | 'extension' } | null = null;

      for (const p of platformsWanted) {
        const perm = await getPermission(p);
        if (perm !== 'granted') continue;
        const isApi = ['medium_api', 'devto', 'wordpress', 'telegram', 'webhook'].includes(p);
        if (isApi) {
          const cred = await db.platformCredential.findFirst({ where: { platform: p, status: 'ok' } });
          if (!cred) continue;
          destination = { platform: p, channel: 'api' };
          break;
        } else {
          if (!devicesOnline) continue;
          destination = { platform: p, channel: 'extension' };
          break;
        }
      }
      // browser sites discovered + permitted count as destinations too
      if (!destination) {
        const grantedSites = await db.browserSite.findMany({ where: { added: true } });
        for (const s of grantedSites) {
          const perm = await getPermission('site:' + s.host);
          if (perm === 'granted' && devicesOnline) { destination = { platform: 'site:' + s.host, channel: 'extension' }; break; }
        }
      }

      if (destination) {
        const draft = await db.contentDraft.findUnique({ where: { id: draftId } });
        const job = await db.publishJob.create({
          data: {
            draftId,
            platform: destination.platform,
            channel: destination.channel,
            title: draftTitle,
            bodyMd: draft?.bodyMd || '',
            tags: draft?.tags || '',
            status: 'queued',
            approval: 'approved', // one-time permission already granted → auto-approved
          },
        });
        publishedTo = destination.platform;
        await alog('act', `Publish job queued to ${destination.platform} (${destination.channel} channel) — one-time permission already granted, auto-approved`, `Job ${job.id}. It will execute via ${destination.channel === 'api' ? 'the platform API' : 'your paired Chrome extension'}.`, true);
        await logActivity('autopilot', `Autopilot queued publish to ${destination.platform}: "${draftTitle}"`);
      } else {
        await alog('think', 'No destination has one-time permission granted yet. Draft is safe in Content Studio. Grant permission to any platform/site in the Publisher Hub and future cycles publish automatically.', 'Platforms awaiting permission: medium, linkedin, devto, wordpress, telegram, webhook + any site open in your Chrome.', true);
      }
    }

    const checkedNow = rankResults.length;
    const summary = `Cycle complete in ${Math.round((Date.now() - startedAt) / 1000)}s: ${checkedNow} live rank checks${draftTitle ? `, article "${draftTitle.slice(0, 60)}" written` : ''}${publishedTo ? `, queued to ${publishedTo}` : ', draft awaiting destination permission'}.`;
    await alog('result', summary, `Rankings snapshot: ${ranks.filter(r => r.checkedAt).slice(0, 8).map(r => `"${r.term}": ${r.position === null ? '>20' : '#' + r.position}`).join(', ')}`);
    await setSetting('autopilot_last_run', new Date().toISOString());
    await setSetting('autopilot_cycles', String(Number(await getSetting('autopilot_cycles', '0')) + 1));
    return { ran: true, summary };
  } catch (e) {
    await alog('result', `Cycle crashed: ${(e as Error).message}`, (e as Error).stack?.slice(0, 800) || '', false);
    return { ran: false, reason: (e as Error).message };
  } finally {
    await setSetting('autopilot_running_at', '');
  }
}

/** Called from the background worker tick — fires a cycle if due. Non-blocking. */
export async function maybeAutopilot(): Promise<void> {
  const enabled = await getSetting('autopilot_enabled', 'false');
  if (enabled !== 'true') return;
  const last = await getSetting('autopilot_last_run');
  const intervalMin = Number(await getSetting('autopilot_interval_min', '20')) || 20;
  if (last && Date.now() - new Date(last).getTime() < intervalMin * 60 * 1000) return;
  const running = await getSetting('autopilot_running_at');
  if (running) return;
  // fire and forget — the concurrency guard inside prevents overlap
  runAutopilotCycle('auto').catch(() => { /* logged internally */ });
}

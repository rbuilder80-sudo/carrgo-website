import { llm, extractJson, webSearch } from './ai';
import { runLiveAudit } from './audit';
import { researchKeywords } from './keywords';
import { generateArticle } from './content';
import { db } from '@/lib/db';
import { logActivity } from './log';
import { fetchText, ensureUrl, normalizeDomain } from './http';

export type AgentAction =
  | { tool: 'web_search'; query: string }
  | { tool: 'run_site_audit'; url?: string }
  | { tool: 'keyword_research'; seed: string }
  | { tool: 'generate_content'; topic: string; keywords?: string[] }
  | { tool: 'queue_publish'; draftId?: string; title?: string; platform: string; channel?: 'api' | 'extension' }
  | { tool: 'check_backlink'; sourceUrl: string; targetUrl?: string }
  | { tool: 'competitor_recon'; domain: string }
  | { tool: 'create_task'; type: string; title: string };

export type AgentTurn = { reply: string; actions: Array<{ tool: string; summary: string; ok: boolean; detail: string }> };

const DEFAULT_SITE = 'https://carrgo.co.uk';

const TOOLS_DESC = `Available tools (execute REAL operations):
1. web_search {query} — live web search, returns real results with URLs.
2. run_site_audit {url?} — full live technical audit of the site (default carrgo.co.uk): real HTTP checks of sitemap, robots.txt, headers, on-page SEO. Stores an AuditRun.
3. keyword_research {seed} — live Google autocomplete research; stores real keyword suggestions with volume estimates.
4. generate_content {topic, keywords?[]} — writes a full SEO article via AI and saves it to Content Studio as a draft.
5. queue_publish {draftId?|title?, platform, channel?} — queues a publishing job. channel "api" publishes directly via connected API credentials (medium, devto, wordpress, telegram, webhook); channel "extension" sends it to the paired Chrome extension (medium web, linkedin, x, facebook, instagram, pinterest, quora, reddit). Jobs require approval in Approval Queue before going live.
6. check_backlink {sourceUrl, targetUrl?} — live HTTP verification of a backlink.
7. competitor_recon {domain} — live web search recon of a competitor; stores Competitor record.
8. create_task {type, title} — add a follow-up task to the queue (types: schema-inject, backlink-outreach, content-refresh, citation-build, technical-fix).

Reply protocol — output STRICT JSON only:
{"reply": "conversational answer for the user", "actions": [{"tool": "...", ...args}]}
Include actions only when the user's request needs them. If the user just asks a question, reply with no actions. You may include up to 3 actions per turn.`;

async function siteSnapshot(): Promise<string> {
  const [drafts, jobs, keywords, audits, devices, creds, suggestions, gscQ, enquiriesToday, rankChecks, autopilotLast, browserSites] = await Promise.all([
    db.contentDraft.count(), db.publishJob.findMany({ orderBy: { queuedAt: 'desc' }, take: 5, select: { platform: true, status: true, title: true, publishedUrl: true } }),
    db.keyword.count(), db.auditRun.findFirst({ orderBy: { createdAt: 'desc' }, select: { score: true, grade: true, createdAt: true } }),
    db.pairedDevice.findMany({ select: { name: true, status: true } }), db.platformCredential.findMany({ select: { platform: true, status: true } }),
    db.suggestion.count({ where: { status: 'open' } }), db.gscQuery.count(),
    db.enquiry.count({ where: { receivedAt: { gte: new Date(new Date().toISOString().slice(0, 10)) } } }),
    db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 300 }),
    db.setting.findUnique({ where: { key: 'autopilot_last_run' } }),
    db.browserSite.count(),
  ]);
  const latestByTerm = new Map<string, number | null>();
  for (const c of rankChecks) if (!latestByTerm.has(c.term)) latestByTerm.set(c.term, c.position);
  const positions = [...latestByTerm.values()];
  return JSON.stringify({
    drafts, keywords, openSuggestions: suggestions, gscQueries: gscQ,
    latestAudit: audits,
    devices: devices.map(d => `${d.name}=${d.status}`),
    credentials: creds.map(c => `${c.platform}=${c.status}`),
    recentJobs: jobs.map(j => ({ platform: j.platform, status: j.status, title: j.title.slice(0, 60), url: j.publishedUrl })),
    enquiriesToday,
    priorityRankData: { checked: positions.length, top10: positions.filter(p => p !== null && p <= 10).length, top20: positions.filter(p => p !== null && p <= 20).length, notRanking: positions.filter(p => p === null).length },
    autopilotLastRun: autopilotLast?.value || null,
    browserSitesInHub: browserSites,
  });
}

async function executeAction(action: AgentAction): Promise<{ ok: boolean; summary: string; detail: string }> {
  try {
    switch (action.tool) {
      case 'web_search': {
        const results = await webSearch(action.query, 6);
        if (!results.length) return { ok: true, summary: `Searched: ${action.query}`, detail: 'No results returned.' };
        return { ok: true, summary: `Live web search: "${action.query}" (${results.length} results)`, detail: results.map(r => `- ${r.name || 'untitled'} [${r.host_name || r.url || ''}] ${r.snippet || ''}`.slice(0, 300)).join('\n') };
      }
      case 'run_site_audit': {
        const url = action.url || DEFAULT_SITE;
        const audit = await runLiveAudit(url);
        const run = await db.auditRun.create({ data: { url, score: audit.score, grade: audit.grade, summaryJson: JSON.stringify({ checks: audit.checks, stats: audit.stats }) } });
        await logActivity('audit', `Live audit of ${url}: score ${audit.score} (${audit.grade})`);
        const fails = audit.checks.filter(c => c.status === 'fail').map(c => c.title);
        return { ok: true, summary: `Live audit of ${url} complete — score ${audit.score}/100 (grade ${audit.grade}), run #${run.id}`, detail: `Passed: ${audit.checks.filter(c => c.status === 'pass').length}, warnings: ${audit.checks.filter(c => c.status === 'warn').length}, failures: ${fails.length}${fails.length ? ' → ' + fails.join(', ') : ''}` };
      }
      case 'keyword_research': {
        const kws = await researchKeywords(action.seed);
        let stored = 0;
        for (const k of kws.slice(0, 30)) {
          await db.keyword.upsert({
            where: { term: k.term },
            create: { term: k.term, source: k.source, estVolume: k.estVolume, difficulty: k.difficulty, intent: k.intent },
            update: { estVolume: k.estVolume, difficulty: k.difficulty, intent: k.intent },
          });
          stored++;
        }
        const top = kws.slice(0, 5).map(k => `${k.term} (vol~${k.estVolume}, diff ${k.difficulty})`).join('; ');
        await logActivity('keywords', `Keyword research "${action.seed}": ${stored} live suggestions stored`);
        return { ok: true, summary: `Researched "${action.seed}" via live Google Suggest — ${stored} keywords saved to Keyword Scout`, detail: `Top suggestions: ${top}` };
      }
      case 'generate_content': {
        const kws = action.keywords || [];
        let searchCtx = '';
        try {
          const s = await webSearch(`${action.topic} UK freight 2026`, 4);
          searchCtx = s.map(r => `${r.name}: ${r.snippet || ''}`).join('\n');
        } catch { /* context optional */ }
        const article = await generateArticle(action.topic, kws, 1100, searchCtx);
        const draft = await db.contentDraft.create({
          data: {
            title: article.title.slice(0, 250), bodyMd: article.bodyMd, tags: article.tags.join(', '), keywords: kws.join(', '),
            wordCount: article.wordCount, status: 'draft', source: 'agent',
            metaJson: JSON.stringify({ metaDescription: article.metaDescription }),
          },
        });
        await logActivity('content', `Agent generated "${article.title}" (${article.wordCount} words)`);
        return { ok: true, summary: `Generated "${article.title}" (${article.wordCount} words) — saved as draft ${draft.id} in Content Studio`, detail: `Title: ${article.title}\nTags: ${article.tags.join(', ')}\nMeta: ${article.metaDescription?.slice(0, 160)}` };
      }
      case 'queue_publish': {
        let title = action.title || '';
        let bodyMd = '';
        let tags = '';
        if (action.draftId) {
          const d = await db.contentDraft.findUnique({ where: { id: action.draftId } });
          if (!d) return { ok: false, summary: 'Draft not found', detail: `No draft with id ${action.draftId}` };
          title = d.title; bodyMd = d.bodyMd; tags = d.tags;
        }
        if (!title) return { ok: false, summary: 'Publish request incomplete', detail: 'Provide draftId or title.' };
        const channel = action.channel === 'api' ? 'api' : 'extension';
        const job = await db.publishJob.create({
          data: { title: title.slice(0, 250), bodyMd, tags, platform: action.platform, channel, status: 'queued', approval: 'pending' },
        });
        await logActivity('publish', `Agent queued ${channel} publish job to ${action.platform} (awaiting approval)`);
        return { ok: true, summary: `Publishing job ${job.id} queued for ${action.platform} (${channel} channel) — approve it in the Approval Queue to send it live`, detail: `Job ${job.id}: "${title.slice(0, 80)}" → ${action.platform} via ${channel}` };
      }
      case 'check_backlink': {
        const target = action.targetUrl || DEFAULT_SITE;
        const r = await fetchText(action.sourceUrl, 15000);
        const found = r.ok && r.body && r.body.toLowerCase().includes(normalizeDomain(target));
        await db.backlink.upsert({
          where: { sourceUrl_targetUrl: { sourceUrl: action.sourceUrl, targetUrl: target } },
          create: { sourceUrl: action.sourceUrl, targetUrl: target, status: found ? 'live' : r.ok ? 'dead' : 'pending', httpStatus: r.status, lastChecked: new Date() },
          update: { status: found ? 'live' : r.ok ? 'dead' : 'pending', httpStatus: r.status, lastChecked: new Date() },
        });
        return { ok: true, summary: `Backlink check: ${found ? 'LINK FOUND' : 'link NOT found'} on ${action.sourceUrl} (HTTP ${r.status})`, detail: `Fetched ${action.sourceUrl} live (${r.ms}ms). ${found ? 'Target domain present in page HTML.' : 'Target domain not present in page HTML.'}` };
      }
      case 'competitor_recon': {
        const domain = normalizeDomain(action.domain);
        const results = await webSearch(`${domain} UK freight forwarding logistics`, 6);
        await db.competitor.upsert({
          where: { domain },
          create: { domain, angle: 'agent-recon', metricsJson: JSON.stringify({ results: results.slice(0, 5) }) },
          update: { metricsJson: JSON.stringify({ results: results.slice(0, 5) }) },
        });
        return { ok: true, summary: `Competitor recon for ${domain} — ${results.length} live results stored`, detail: results.map(r => `- ${r.name} [${r.host_name || ''}]: ${r.snippet || ''}`.slice(0, 250)).join('\n') };
      }
      case 'create_task': {
        const t = await db.agentTask.create({ data: { type: action.type || 'general', title: action.title || 'Untitled task', status: 'queued', autoExecuted: false } });
        return { ok: true, summary: `Task "${t.title}" added to the queue (${t.type})`, detail: `Task id ${t.id} — visible in Approval Queue` };
      }
      default:
        return { ok: false, summary: 'Unknown tool', detail: `Tool "${(action as { tool?: string }).tool}" is not recognised.` };
    }
  } catch (e) {
    return { ok: false, summary: `Tool ${action.tool} failed`, detail: (e as Error).message };
  }
}

export async function runAgentTurn(history: Array<{ role: 'user' | 'assistant'; content: string }>, userMessage: string): Promise<AgentTurn> {
  const snapshot = await siteSnapshot();
  const system = `You are the CARRGO Master Agent — the autonomous SEO & publishing brain of a SaaS that manages carrgo.co.uk (UK freight forwarding).

You operate the real system: your tool calls execute real live operations (HTTP audits, Google autocomplete scraping, AI content writing, publishing queue). Never claim an action succeeded unless its tool result confirms it.

Current system snapshot (real data): ${snapshot}

${TOOLS_DESC}

Rules:
- Be concise and concrete. British English.
- When the user asks for something actionable (audit, content, publish, research), actually call the tools.
- For publishing without an explicit platform, pick the best default: medium (extension channel).
- Publishing jobs always land in Approval Queue first — tell the user that.`;

  const messages = history.slice(-8).map(h => ({ role: h.role, content: h.content.slice(0, 4000) }));
  const actions: AgentTurn['actions'] = [];
  let reply = '';

  let conversation = [
    { role: 'system' as const, content: system },
    ...messages,
    { role: 'user' as const, content: userMessage },
  ];

  for (let iter = 0; iter < 3; iter++) {
    const raw = await llm2(conversation);
    const parsed = extractJson<{ reply: string; actions?: AgentAction[] }>(raw);
    if (!parsed) {
      reply = raw.trim() || 'I could not process that — please rephrase.';
      break;
    }
    reply = parsed.reply || '';
    const todo = (parsed.actions || []).slice(0, 3);
    if (!todo.length) break;

    const results: string[] = [];
    for (const a of todo) {
      const r = await executeAction(a);
      actions.push({ tool: a.tool, summary: r.summary, ok: r.ok, detail: r.detail });
      results.push(`[${a.tool}] ${r.ok ? 'OK' : 'FAIL'}: ${r.summary} :: ${r.detail.slice(0, 1200)}`);
    }
    conversation = [
      ...conversation,
      { role: 'assistant' as const, content: raw.slice(0, 3000) },
      { role: 'user' as const, content: `Tool results:\n${results.join('\n---\n')}\n\nContinue: reply to the user with the outcomes. Output STRICT JSON {"reply": "...", "actions": []} — no further actions unless genuinely required.` },
    ];
  }

  return { reply, actions };
}

async function llm2(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>): Promise<string> {
  const { getZai } = await import('./ai');
  const zai = await getZai();
  const completion = await zai.chat.completions.create({
    messages,
    thinking: { type: 'disabled' },
    max_tokens: 4000,
  });
  return completion.choices[0]?.message?.content || '';
}

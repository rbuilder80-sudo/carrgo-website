import { db } from '@/lib/db';
import { webSearch } from './ai';

export const TARGET_DOMAIN = 'carrgo.co.uk';

export type RankResult = {
  term: string;
  found: boolean;
  position: number | null;
  url: string | null;
  top: Array<{ pos: number; host: string; name: string; url: string }>;
};

function hostOf(url?: string): string {
  if (!url) return '';
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

/**
 * Live Google rank check for one term via real web search.
 * Scans the top `depth` results and records where the target domain appears.
 */
export async function checkRankLive(term: string, domain = TARGET_DOMAIN, depth = 20): Promise<RankResult> {
  const results = await webSearch(term, Math.min(depth, 20));
  const top = results.slice(0, 10).map((r, i) => ({
    pos: i + 1,
    host: hostOf(r.url),
    name: (r.name || '').slice(0, 120),
    url: r.url || '',
  }));

  let position: number | null = null;
  let url: string | null = null;
  results.forEach((r, i) => {
    if (position !== null) return;
    const host = hostOf(r.url);
    const name = (r.name || '').toLowerCase();
    const link = (r.url || '').toLowerCase();
    if (host === domain || host.endsWith('.' + domain) || link.includes(domain) || name.includes(domain)) {
      position = i + 1;
      url = r.url || null;
    }
  });

  const record = {
    term,
    found: position !== null,
    position,
    url,
    top,
  };

  await db.rankCheck.create({
    data: {
      term,
      domain,
      position,
      found: record.found,
      url,
      topJson: JSON.stringify(top),
      source: 'manual',
    },
  });

  return record;
}

/**
 * Checks a batch of terms sequentially (safe pacing), skipping terms
 * checked within `staleMinutes`. Returns only executed checks.
 */
export async function checkRanksBatch(terms: string[], domain = TARGET_DOMAIN, opts: { limit?: number; staleMinutes?: number; source?: string } = {}): Promise<RankResult[]> {
  const limit = opts.limit ?? 3;
  const staleMs = (opts.staleMinutes ?? 720) * 60 * 1000;
  const out: RankResult[] = [];

  for (const term of terms) {
    if (out.length >= limit) break;
    const last = await db.rankCheck.findFirst({ where: { term, domain }, orderBy: { checkedAt: 'desc' } });
    if (last && Date.now() - last.checkedAt.getTime() < staleMs) continue;
    try {
      const r = await checkRankLive(term, domain);
      // re-tag source (checkRankLive writes 'manual')
      if (opts.source && last === null) {
        await db.rankCheck.updateMany({ where: { term, domain, checkedAt: { gte: new Date(Date.now() - 60000) } }, data: { source: opts.source } });
      }
      out.push(r);
    } catch (e) {
      console.error('[rank] check failed for', term, (e as Error).message);
    }
  }
  return out;
}

export function summariseRanks(checks: RankResult[]) {
  const top3 = checks.filter(c => c.position !== null && c.position <= 3).length;
  const top10 = checks.filter(c => c.position !== null && c.position <= 10).length;
  const top20 = checks.filter(c => c.position !== null && c.position <= 20).length;
  const missing = checks.filter(c => c.position === null).length;
  return { checked: checks.length, top3, top10, top20, missing };
}

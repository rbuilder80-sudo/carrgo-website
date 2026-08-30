import { db } from '@/lib/db';
import { checkRankLive, TARGET_DOMAIN } from '@/lib/rank';
import { ensureWorker } from '@/lib/worker';

export async function GET(req: Request) {
  const term = new URL(req.url).searchParams.get('term') || '';
  if (!term) return Response.json({ ok: false, error: 'term required' }, { status: 400 });
  const history = await db.rankCheck.findMany({ where: { term }, orderBy: { checkedAt: 'desc' }, take: 20 });
  return Response.json({ ok: true, history });
}

export async function POST(req: Request) {
  ensureWorker();
  const body = await req.json().catch(() => ({}));

  // single keyword check
  if (body.term) {
    const r = await checkRankLive(String(body.term), TARGET_DOMAIN, 20);
    return Response.json({ ok: true, result: r });
  }

  // batch: check the stalest priority keywords
  const limit = Math.min(Number(body.limit) || 3, 6);
  const priorityKws = await db.keyword.findMany({ where: { priority: true }, select: { term: true } });
  const lastChecks = await db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 800 });
  const lastByTerm = new Map<string, Date>();
  for (const c of lastChecks) if (!lastByTerm.has(c.term)) lastByTerm.set(c.term, c.checkedAt);

  const stale = priorityKws
    .map(k => ({ term: k.term, at: lastByTerm.get(k.term)?.getTime() ?? 0 }))
    .sort((a, b) => a.at - b.at)
    .slice(0, limit);

  const results = [];
  for (const s of stale) {
    try {
      const r = await checkRankLive(s.term, TARGET_DOMAIN, 20);
      results.push({ term: r.term, position: r.position, found: r.found, url: r.url });
    } catch (e) {
      results.push({ term: s.term, error: (e as Error).message });
    }
  }
  return Response.json({ ok: true, results, checked: results.length });
}

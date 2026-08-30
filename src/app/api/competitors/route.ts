import { db } from '@/lib/db';
import { webSearch } from '@/lib/ai';
import { normalizeDomain } from '@/lib/http';
import { logActivity } from '@/lib/log';

export async function GET() {
  const competitors = await db.competitor.findMany({ orderBy: { createdAt: 'desc' }, take: 30 });
  return Response.json({ ok: true, competitors: competitors.map(c => ({ id: c.id, domain: c.domain, angle: c.angle, metrics: safeParse(c.metricsJson), createdAt: c.createdAt })) });
}

export async function POST(req: Request) {
  const { domain } = await req.json().catch(() => ({ domain: '' }));
  const d = normalizeDomain(String(domain || ''));
  if (!d || !d.includes('.')) return Response.json({ ok: false, error: 'Valid domain required' }, { status: 400 });

  const results = await webSearch(`${d} UK freight forwarding logistics services`, 6);
  const comp = await db.competitor.upsert({
    where: { domain: d },
    create: { domain: d, angle: 'manual', metricsJson: JSON.stringify({ results: results.slice(0, 6) }) },
    update: { metricsJson: JSON.stringify({ results: results.slice(0, 6) }) },
  });
  await logActivity('competitors', `Competitor recon stored for ${d} (${results.length} live results)`);
  return Response.json({ ok: true, competitor: { id: comp.id, domain: comp.domain, results } });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ ok: false, error: 'id required' }, { status: 400 });
  await db.competitor.delete({ where: { id } }).catch(() => {});
  return Response.json({ ok: true });
}

function safeParse(s: string): Record<string, unknown> {
  try { return JSON.parse(s || '{}'); } catch { return {}; }
}

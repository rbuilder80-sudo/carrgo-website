import { db } from '@/lib/db';
import { fetchText, normalizeDomain } from '@/lib/http';
import { logActivity } from '@/lib/log';

export async function GET() {
  const backlinks = await db.backlink.findMany({ orderBy: { lastChecked: 'desc' }, take: 50 });
  return Response.json({ ok: true, backlinks });
}

export async function POST(req: Request) {
  const { sourceUrl, targetUrl } = await req.json().catch(() => ({ sourceUrl: '', targetUrl: '' }));
  const source = String(sourceUrl || '').trim();
  const target = normalizeDomain(String(targetUrl || 'https://carrgo.co.uk'));
  if (!/^https?:\/\//i.test(source)) return Response.json({ ok: false, error: 'sourceUrl must be a full URL' }, { status: 400 });

  const r = await fetchText(source, 15000);
  const found = r.ok && r.body && r.body.toLowerCase().includes(target);
  const bl = await db.backlink.upsert({
    where: { sourceUrl_targetUrl: { sourceUrl: source, targetUrl: `https://${target}` } },
    create: { sourceUrl: source, targetUrl: `https://${target}`, anchor: '', status: found ? 'live' : r.ok ? 'dead' : 'pending', httpStatus: r.status, lastChecked: new Date() },
    update: { status: found ? 'live' : r.ok ? 'dead' : 'pending', httpStatus: r.status, lastChecked: new Date() },
  });
  await logActivity('backlinks', `Backlink check ${source}: ${found ? 'live' : 'not found'} (HTTP ${r.status})`);
  return Response.json({ ok: true, backlink: bl, found, httpStatus: r.status });
}

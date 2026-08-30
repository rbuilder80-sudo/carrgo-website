import { db } from '@/lib/db';
import { checkDeviceAuth, jsonError } from '@/lib/bridge';
import { logActivity } from '@/lib/log';

type Ga4Row = { path?: string; sessions?: number; users?: number; engagement?: number };

// GA4 import — accepts { deviceId, batch?, summary?: {...}, pages: Ga4Row[] }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const auth = await checkDeviceAuth(String(body.deviceId || ''), req.headers.get('x-device-key'));
  if (!auth.ok) return jsonError(auth.error || 'Unauthorized', 401);

  const pages: Ga4Row[] = Array.isArray(body.pages) ? body.pages.slice(0, 1000) : [];
  const summary = body.summary && typeof body.summary === 'object' ? body.summary : null;
  if (!pages.length && !summary) return jsonError('No GA4 rows supplied');

  const batch = String(body.batch || `ext-${Date.now()}`).slice(0, 60);
  const ops: Promise<unknown>[] = [];
  if (summary) {
    ops.push(db.ga4Summary.create({
      data: {
        sessions: num(summary.sessions), users: num(summary.users),
        pageviews: num(summary.pageviews), engagementRate: num(summary.engagementRate), batch,
      },
    }));
  }
  for (const p of pages) {
    if (!p.path) continue;
    ops.push(db.ga4Page.create({
      data: { path: String(p.path).slice(0, 300), sessions: num(p.sessions), users: num(p.users), engagement: num(p.engagement), batch },
    }));
  }
  await Promise.all(ops);
  await logActivity('ga4', `Imported GA4 data via extension bridge (batch ${batch}): ${pages.length} pages${summary ? ' + summary' : ''}`);
  return Response.json({ ok: true, stored: { pages: pages.length, summary: !!summary }, batch });
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

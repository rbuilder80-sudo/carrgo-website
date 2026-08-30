import { db } from '@/lib/db';
import { checkDeviceAuth, jsonError } from '@/lib/bridge';
import { logActivity } from '@/lib/log';

type GscRow = { query?: string; page?: string; clicks?: number; impressions?: number; ctr?: number; position?: number };

// GSC import — accepts { deviceId, batch?, queries: GscRow[], pages: GscRow[] }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const auth = await checkDeviceAuth(String(body.deviceId || ''), req.headers.get('x-device-key'));
  if (!auth.ok) return jsonError(auth.error || 'Unauthorized', 401);

  const queries: GscRow[] = Array.isArray(body.queries) ? body.queries.slice(0, 1000) : [];
  const pages: GscRow[] = Array.isArray(body.pages) ? body.pages.slice(0, 1000) : [];
  if (!queries.length && !pages.length) return jsonError('No GSC rows supplied');

  const batch = String(body.batch || `ext-${Date.now()}`).slice(0, 60);
  const ops: Promise<unknown>[] = [];
  for (const q of queries) {
    if (!q.query) continue;
    ops.push(db.gscQuery.create({
      data: { query: String(q.query).slice(0, 200), clicks: num(q.clicks), impressions: num(q.impressions), ctr: num(q.ctr), position: num(q.position), batch },
    }));
  }
  for (const p of pages) {
    if (!p.page) continue;
    ops.push(db.gscPage.create({
      data: { page: String(p.page).slice(0, 300), clicks: num(p.clicks), impressions: num(p.impressions), ctr: num(p.ctr), position: num(p.position), batch },
    }));
  }
  await Promise.all(ops);
  await logActivity('gsc', `Imported ${queries.length} GSC queries + ${pages.length} GSC pages via extension bridge (batch ${batch})`);
  return Response.json({ ok: true, stored: { queries: queries.length, pages: pages.length }, batch });
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

import { db } from '@/lib/db';

/** Latest rank checks (newest first) for building per-keyword history + trends. */
export async function GET() {
  const checks = await db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 1000 });
  return Response.json({ ok: true, checks });
}

import { db } from '@/lib/db';

/** Bulk import / mark priority keywords (one per line or comma separated). */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const raw = String(body.terms || body.text || '');
  const terms = raw.split(/[\n,]/).map(t => t.trim().toLowerCase()).filter(Boolean);
  if (!terms.length) return Response.json({ ok: false, error: 'No keywords provided' }, { status: 400 });

  let created = 0, marked = 0;
  for (const term of terms.slice(0, 200)) {
    const existing = await db.keyword.findUnique({ where: { term } });
    if (existing) {
      await db.keyword.update({ where: { term }, data: { priority: true, source: 'priority', status: existing.status === 'new' ? 'targeting' : existing.status } });
      marked++;
    } else {
      await db.keyword.create({ data: { term, priority: true, source: 'priority', status: 'targeting' } });
      created++;
    }
  }
  const total = await db.keyword.count({ where: { priority: true } });
  return Response.json({ ok: true, created, marked, priorityTotal: total });
}

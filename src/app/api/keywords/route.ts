import { db } from '@/lib/db';
import { researchKeywords } from '@/lib/keywords';
import { logActivity } from '@/lib/log';

export async function GET() {
  const keywords = await db.keyword.findMany({ orderBy: [{ estVolume: 'desc' }], take: 200 });
  return Response.json({ ok: true, keywords });
}

export async function POST(req: Request) {
  const { seed } = await req.json().catch(() => ({ seed: '' }));
  if (!seed || seed.trim().length < 2) {
    return Response.json({ ok: false, error: 'Provide a seed keyword (min 2 chars)' }, { status: 400 });
  }
  const results = await researchKeywords(seed.trim());
  const stored = [];
  for (const k of results) {
    stored.push(await db.keyword.upsert({
      where: { term: k.term },
      create: { term: k.term, source: k.source, estVolume: k.estVolume, difficulty: k.difficulty, intent: k.intent },
      update: { estVolume: k.estVolume, difficulty: k.difficulty, intent: k.intent },
    }));
  }
  await logActivity('keywords', `Keyword research "${seed}": ${stored.length} live suggestions stored`);
  return Response.json({ ok: true, count: stored.length, keywords: stored.slice(0, 40) });
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json().catch(() => ({ id: '', status: '' }));
  if (!id || !['new', 'targeting', 'tracked', 'ignored'].includes(status)) {
    return Response.json({ ok: false, error: 'id and valid status required' }, { status: 400 });
  }
  await db.keyword.update({ where: { id }, data: { status } });
  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ ok: false, error: 'id required' }, { status: 400 });
  await db.keyword.delete({ where: { id } }).catch(() => {});
  return Response.json({ ok: true });
}

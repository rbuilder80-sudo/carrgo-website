import { db } from '@/lib/db';

export async function GET() {
  const tasks = await db.agentTask.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return Response.json({ ok: true, tasks });
}

export async function POST(req: Request) {
  const { type, title } = await req.json().catch(() => ({ type: '', title: '' }));
  if (!type || !title) return Response.json({ ok: false, error: 'type and title required' }, { status: 400 });
  const task = await db.agentTask.create({ data: { type, title: String(title).slice(0, 200) } });
  return Response.json({ ok: true, task });
}

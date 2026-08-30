import { db } from '@/lib/db';

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const allowed = ['new', 'contacted', 'quoted', 'won', 'lost'];
  const status = String(body.status || '');
  if (!allowed.includes(status)) return Response.json({ ok: false, error: 'Bad status' }, { status: 400 });
  const lead = await db.enquiry.update({ where: { id }, data: { status } }).catch(() => null);
  if (!lead) return Response.json({ ok: false, error: 'Lead not found' }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await db.enquiry.delete({ where: { id } }).catch(() => null);
  return Response.json({ ok: true });
}

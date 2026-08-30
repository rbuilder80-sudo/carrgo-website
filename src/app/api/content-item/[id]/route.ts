import { db } from '@/lib/db';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const draft = await db.contentDraft.findUnique({ where: { id }, include: { jobs: { orderBy: { queuedAt: 'desc' } } } });
  if (!draft) return Response.json({ ok: false, error: 'Draft not found' }, { status: 404 });
  return Response.json({ ok: true, draft });
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, string> = {};
  if (typeof body.title === 'string') data.title = body.title.slice(0, 250);
  if (typeof body.bodyMd === 'string') data.bodyMd = body.bodyMd;
  if (typeof body.tags === 'string') data.tags = body.tags;
  if (typeof body.status === 'string' && ['draft', 'approved', 'published'].includes(body.status)) data.status = body.status;
  if (!Object.keys(data).length) return Response.json({ ok: false, error: 'Nothing to update' }, { status: 400 });
  const draft = await db.contentDraft.update({ where: { id }, data }).catch(() => null);
  if (!draft) return Response.json({ ok: false, error: 'Draft not found' }, { status: 404 });
  return Response.json({ ok: true, draft });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await db.publishJob.updateMany({ where: { draftId: id, status: { in: ['queued', 'awaiting_approval'] } }, data: { status: 'failed', error: 'Draft deleted' } });
  await db.contentDraft.delete({ where: { id } }).catch(() => {});
  return Response.json({ ok: true });
}

import { db } from '@/lib/db';

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const job = await db.publishJob.findUnique({ where: { id } });
  if (!job) return Response.json({ ok: false, error: 'Job not found' }, { status: 404 });
  if (['published', 'verified'].includes(job.status)) {
    return Response.json({ ok: false, error: 'Cannot cancel a job that already went live' }, { status: 400 });
  }
  await db.publishJob.update({ where: { id }, data: { status: 'failed', error: 'Cancelled by user', finishedAt: new Date() } });
  return Response.json({ ok: true });
}

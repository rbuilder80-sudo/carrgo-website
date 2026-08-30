import { db } from '@/lib/db';
import { checkDeviceAuth } from '@/lib/bridge';
import { logActivity } from '@/lib/log';

// Extension reports job outcome: { deviceId, jobId, ok, publishedUrl?, error?, steps?: [{step, ok, detail}], authOk? }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const auth = await checkDeviceAuth(String(body.deviceId || ''), req.headers.get('x-device-key'));
  if (!auth.ok) return Response.json({ ok: false, error: auth.error }, { status: 401 });

  const job = await db.publishJob.findUnique({ where: { id: String(body.jobId || '') } });
  if (!job) return Response.json({ ok: false, error: 'Job not found' }, { status: 404 });

  const steps = Array.isArray(body.steps) ? body.steps : [];
  const stepLog = steps.map(s => `${s.step}:${s.ok ? 'ok' : 'fail'}`).join(' → ');

  if (body.authOk === false) {
    await db.publishJob.update({
      where: { id: job.id },
      data: { status: 'awaiting_auth', error: 'You are not logged in to the platform in this Chrome profile — log in, then re-approve the job.', finishedAt: new Date(), evidence: stepLog },
    });
    await logActivity('bridge', `Job ${job.id} blocked: platform not authenticated in Chrome`);
    return Response.json({ ok: true, status: 'awaiting_auth' });
  }

  if (body.ok && body.publishedUrl) {
    await db.publishJob.update({
      where: { id: job.id },
      data: {
        status: 'published',
        publishedUrl: String(body.publishedUrl),
        evidence: `Extension evidence: ${stepLog}`,
        finishedAt: new Date(),
      },
    });
    if (job.draftId) await db.contentDraft.update({ where: { id: job.draftId }, data: { status: 'published' } }).catch(() => {});
    await logActivity('publish', `Extension published "${job.title}" to ${job.platform}`, { url: body.publishedUrl });
    return Response.json({ ok: true, status: 'published' });
  }

  await db.publishJob.update({
    where: { id: job.id },
    data: {
      status: (job.attempts || 1) >= 3 ? 'failed' : 'queued',
      error: String(body.error || 'Extension reported failure').slice(0, 500),
      evidence: stepLog || job.evidence,
      finishedAt: (job.attempts || 1) >= 3 ? new Date() : null,
      deviceName: null,
      startedAt: null,
    },
  });
  await logActivity('bridge', `Job ${job.id} failed on extension: ${body.error || 'unknown'}`);
  return Response.json({ ok: true, status: 'requeued' });
}

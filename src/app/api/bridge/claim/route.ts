import { db } from '@/lib/db';
import { checkDeviceAuth } from '@/lib/bridge';
import { logActivity } from '@/lib/log';

// Extension claims the next approved extension-channel job
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const auth = await checkDeviceAuth(String(body.deviceId || ''), req.headers.get('x-device-key'));
  if (!auth.ok) return Response.json({ ok: false, error: auth.error }, { status: 401 });

  const job = await db.publishJob.findFirst({
    where: { channel: 'extension', approval: 'approved', status: 'queued' },
    orderBy: { queuedAt: 'asc' },
  });
  if (!job) return Response.json({ ok: true, job: null });

  await db.publishJob.update({
    where: { id: job.id },
    data: { status: 'claimed', startedAt: new Date(), deviceName: auth.device!.name, attempts: { increment: 1 } },
  });
  await logActivity('bridge', `Job ${job.id} claimed by ${auth.device!.name} → ${job.platform}`);

  return Response.json({
    ok: true,
    job: {
      id: job.id,
      platform: job.platform,
      title: job.title,
      bodyMd: job.bodyMd,
      tags: job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    },
  });
}

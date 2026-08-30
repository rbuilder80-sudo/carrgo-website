import { db } from '@/lib/db';
import { checkDeviceAuth } from '@/lib/bridge';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const auth = await checkDeviceAuth(String(body.deviceId || ''), req.headers.get('x-device-key'));
  if (!auth.ok) return Response.json({ ok: false, error: auth.error }, { status: 401 });

  await db.pairedDevice.update({
    where: { id: auth.device!.id },
    data: { status: 'online', lastHeartbeat: new Date(), version: String(body.version || '1.0.0') },
  });

  // Any jobs already claimed by this device but stale (claimed > 15 min ago, never completed) are requeued
  const staleCutoff = new Date(Date.now() - 15 * 60 * 1000);
  await db.publishJob.updateMany({
    where: { channel: 'extension', status: 'claimed', deviceName: auth.device!.name, startedAt: { lt: staleCutoff } },
    data: { status: 'queued', startedAt: null, deviceName: null, error: 'Requeued: previous claim timed out' },
  });

  return Response.json({ ok: true, serverTime: new Date().toISOString() });
}

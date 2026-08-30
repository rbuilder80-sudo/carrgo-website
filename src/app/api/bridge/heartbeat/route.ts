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

  // Register every site the user has open in Chrome → surfaced in Publisher Hub
  const tabs = Array.isArray(body.tabs) ? body.tabs.slice(0, 40) : [];
  for (const t of tabs) {
    const raw = String(t?.host || '').toLowerCase();
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(raw)) continue;
    const host = raw.replace(/^www\./, '');
    if (/(^|\.)google\.com$/.test(host) || /(^|\.)chrome\.com$/.test(host) || raw === 'newtab' || host.endsWith('.z.ai')) continue;
    await db.browserSite.upsert({
      where: { host },
      create: { host, title: String(t?.title || '').slice(0, 200), deviceName: auth.device!.name },
      update: { lastSeen: new Date(), title: String(t?.title || '').slice(0, 200), deviceName: auth.device!.name },
    });
  }

  return Response.json({ ok: true, serverTime: new Date().toISOString() });
}

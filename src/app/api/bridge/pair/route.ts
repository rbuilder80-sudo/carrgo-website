import { db } from '@/lib/db';
import { encryptSecret, newControlKey } from '@/lib/crypto';
import { logActivity } from '@/lib/log';

// Extension completes pairing: { deviceId, name, pairingCode, version }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const deviceId = String(body.deviceId || '').slice(0, 100);
  const name = String(body.name || 'Chrome').slice(0, 100);
  const code = String(body.pairingCode || '').trim();
  const version = String(body.version || '1.0.0');

  if (!deviceId || !code) return Response.json({ ok: false, error: 'deviceId and pairingCode required' }, { status: 400 });

  const row = await db.setting.findUnique({ where: { key: 'bridge_pairing_code' } });
  if (!row) return Response.json({ ok: false, error: 'No pairing code active — generate one in the Bridge page' }, { status: 400 });

  const [expected, expiryIso] = row.value.split('|');
  if (expected !== code) return Response.json({ ok: false, error: 'Invalid pairing code' }, { status: 401 });
  if (new Date(expiryIso) < new Date()) return Response.json({ ok: false, error: 'Pairing code expired — generate a new one' }, { status: 401 });

  const controlKey = newControlKey();
  const device = await db.pairedDevice.upsert({
    where: { deviceId },
    create: { deviceId, name, keyEnc: encryptSecret(controlKey), status: 'online', version, pairedAt: new Date(), lastHeartbeat: new Date() },
    update: { name, keyEnc: encryptSecret(controlKey), status: 'online', version, pairedAt: new Date(), lastHeartbeat: new Date() },
  });

  await logActivity('bridge', `Chrome device "${name}" paired successfully`);
  return Response.json({ ok: true, deviceKey: controlKey, deviceName: device.name, saas: 'CARRGO SEO SaaS' });
}

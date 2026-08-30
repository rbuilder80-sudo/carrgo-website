import { db } from '@/lib/db';
import { decryptSecret } from './crypto';

export async function checkDeviceAuth(deviceId: string | null, key: string | null): Promise<{ ok: boolean; device?: { id: string; name: string }; error?: string }> {
  if (!deviceId || !key) return { ok: false, error: 'Missing deviceId or X-Device-Key header' };
  const device = await db.pairedDevice.findUnique({ where: { deviceId } });
  if (!device) return { ok: false, error: 'Device not paired' };
  const stored = decryptSecret(device.keyEnc);
  if (stored !== key) return { ok: false, error: 'Invalid device key' };
  return { ok: true, device: { id: device.id, name: device.name } };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

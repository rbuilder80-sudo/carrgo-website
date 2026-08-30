import { db } from '@/lib/db';
import { encryptSecret, newPairingCode } from '@/lib/crypto';
import { logActivity } from '@/lib/log';

// UI requests a fresh pairing code
export async function POST() {
  const code = newPairingCode();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);
  await db.setting.upsert({
    where: { key: 'bridge_pairing_code' },
    create: { key: 'bridge_pairing_code', value: `${code}|${expiry.toISOString()}` },
    update: { value: `${code}|${expiry.toISOString()}` },
  });
  await logActivity('bridge', `New pairing code generated (valid 10 minutes)`);
  return Response.json({ ok: true, code, expiresAt: expiry });
}

export async function GET() {
  const row = await db.setting.findUnique({ where: { key: 'bridge_pairing_code' } });
  if (!row) return Response.json({ ok: true, code: null });
  const [code, expiryIso] = row.value.split('|');
  const valid = new Date(expiryIso) > new Date();
  return Response.json({ ok: true, code: valid ? code : null, expiresAt: expiryIso });
}

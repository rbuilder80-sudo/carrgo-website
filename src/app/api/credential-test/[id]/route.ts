import { db } from '@/lib/db';
import { decryptSecret } from '@/lib/crypto';
import { testCredential } from '@/lib/platforms';
import { logActivity } from '@/lib/log';

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const cred = await db.platformCredential.findUnique({ where: { id } });
  if (!cred) return Response.json({ ok: false, error: 'Credential not found' }, { status: 404 });

  const secret = decryptSecret(cred.secretEnc);
  let meta: Record<string, string> = {};
  try { meta = JSON.parse(cred.metaJson || '{}'); } catch { /* */ }

  const test = await testCredential(cred.platform, secret, meta);
  await db.platformCredential.update({
    where: { id },
    data: { status: test.ok ? 'ok' : 'invalid', lastCheckOk: test.ok, lastCheckedAt: new Date() },
  });
  await logActivity('credentials', `Re-tested ${cred.platform} credential: ${test.detail}`);
  return Response.json({ ok: true, test });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await db.platformCredential.delete({ where: { id } }).catch(() => {});
  return Response.json({ ok: true });
}

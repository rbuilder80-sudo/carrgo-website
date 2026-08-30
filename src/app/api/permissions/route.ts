import { db } from '@/lib/db';
import { setPermission, getPermissions } from '@/lib/autopilot';

/**
 * One-time publishing permission per platform.
 * grant → every future publish job to that platform runs without per-article approval.
 */
export async function GET() {
  const creds = await db.platformCredential.findMany({ select: { platform: true, label: true, status: true, permission: true, permissionAt: true } });
  const perms = await getPermissions();
  return Response.json({ ok: true, credentials: creds, permissions: perms });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const platform = String(body.platform || '');
  const action = String(body.action || '');
  if (!platform) return Response.json({ ok: false, error: 'platform required' }, { status: 400 });

  if (!['grant', 'deny', 'revoke'].includes(action)) {
    return Response.json({ ok: false, error: 'action must be grant | deny | revoke' }, { status: 400 });
  }
  await setPermission(platform, action === 'grant' ? 'granted' : action === 'deny' ? 'denied' : 'none');
  return Response.json({
    ok: true,
    note: action === 'grant'
      ? `One-time permission GRANTED for ${platform}. Future articles publish automatically without asking again.`
      : action === 'deny' ? `Permission denied for ${platform}.` : `Permission revoked for ${platform}.`,
  });
}

import { db } from '@/lib/db';
import { setPermission } from '@/lib/autopilot';
import { ensureWorker } from '@/lib/worker';

/** Sites discovered open in the user's Chrome (reported by the extension heartbeat). */
export async function GET() {
  ensureWorker();
  const sites = await db.browserSite.findMany({ orderBy: { lastSeen: 'desc' }, take: 60 });
  const perms = await db.setting.findUnique({ where: { key: 'platform_permissions' } });
  return Response.json({ ok: true, sites, permissions: perms ? JSON.parse(perms.value) : {} });
}

export async function POST(req: Request) {
  ensureWorker();
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || '');
  const host = String(body.host || '').toLowerCase().replace(/^www\./, '');
  if (!host || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) {
    return Response.json({ ok: false, error: 'Valid host required' }, { status: 400 });
  }

  if (action === 'add') {
    const site = await db.browserSite.upsert({
      where: { host },
      create: { host, title: String(body.title || ''), added: true, deviceName: String(body.deviceName || '') },
      update: { added: true, title: String(body.title || '') },
    });
    return Response.json({ ok: true, site, note: `${host} added to Publisher Hub — grant one-time permission to enable live publishing.` });
  }

  if (action === 'grant' || action === 'deny' || action === 'revoke') {
    await db.browserSite.upsert({
      where: { host },
      create: { host, title: String(body.title || ''), added: true },
      update: { added: true },
    });
    await setPermission('site:' + host, action === 'grant' ? 'granted' : action === 'deny' ? 'denied' : 'none');
    return Response.json({ ok: true, note: action === 'grant'
      ? `Permission GRANTED for ${host} — all future article jobs to this site run without asking again.`
      : action === 'deny' ? `Permission denied for ${host}.` : `Permission revoked for ${host}.` });
  }

  if (action === 'remove') {
    await db.browserSite.delete({ where: { host } }).catch(() => null);
    await setPermission('site:' + host, 'none');
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: 'Unknown action' }, { status: 400 });
}

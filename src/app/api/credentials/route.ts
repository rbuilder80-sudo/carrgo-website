import { db } from '@/lib/db';
import { encryptSecret } from '@/lib/crypto';
import { testCredential } from '@/lib/platforms';
import { logActivity } from '@/lib/log';

const API_PLATFORMS = ['medium_api', 'devto', 'wordpress', 'telegram', 'webhook'];

export async function GET() {
  const creds = await db.platformCredential.findMany({ orderBy: { updatedAt: 'desc' } });
  return Response.json({
    ok: true,
    apiPlatforms: API_PLATFORMS,
    credentials: creds.map(c => ({
      id: c.id, platform: c.platform, label: c.label, status: c.status,
      lastCheckOk: c.lastCheckOk, lastCheckedAt: c.lastCheckedAt,
      meta: safeParse(c.metaJson), secretPreview: maskSecret(c.platform),
      updatedAt: c.updatedAt,
    })),
  });
}

function safeParse(s: string): Record<string, unknown> {
  try { return JSON.parse(s || '{}'); } catch { return {}; }
}

function maskSecret(platform: string): string {
  // We don't expose secrets; show platform-specific hints instead
  return platform === 'wordpress' ? '•••• app password' : '••••••••';
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const platform = String(body.platform || '');
  if (!API_PLATFORMS.includes(platform)) {
    return Response.json({ ok: false, error: `Platform "${platform}" is published via the Chrome extension — no API credential needed. Pair the extension in the Bridge page.` }, { status: 400 });
  }
  const secret = String(body.secret || '').trim();
  const meta: Record<string, string> = body.meta && typeof body.meta === 'object' ? body.meta : {};
  if (!secret) return Response.json({ ok: false, error: 'Secret/token required' }, { status: 400 });

  // Live validation against the real platform API
  const test = await testCredential(platform, secret, meta);

  const cred = await db.platformCredential.create({
    data: {
      platform,
      label: String(body.label || platform).slice(0, 100),
      secretEnc: encryptSecret(secret),
      metaJson: JSON.stringify(meta),
      status: test.ok ? 'ok' : 'invalid',
      lastCheckOk: test.ok,
      lastCheckedAt: new Date(),
    },
  });
  await logActivity('credentials', `${platform} credential added — live test: ${test.detail}`);
  return Response.json({ ok: true, id: cred.id, test });
}

import { db } from '@/lib/db';
import { logActivity } from '@/lib/log';
import { ensureWorker } from '@/lib/worker';
import { getPermission } from '@/lib/autopilot';

export const PLATFORMS: Record<string, { channel: 'api' | 'extension'; name: string }> = {
  medium: { channel: 'extension', name: 'Medium' },
  medium_api: { channel: 'api', name: 'Medium (API)' },
  devto: { channel: 'api', name: 'DEV.to' },
  wordpress: { channel: 'api', name: 'WordPress' },
  telegram: { channel: 'api', name: 'Telegram' },
  webhook: { channel: 'api', name: 'Webhook' },
  linkedin: { channel: 'extension', name: 'LinkedIn' },
  x: { channel: 'extension', name: 'X / Twitter' },
  facebook: { channel: 'extension', name: 'Facebook' },
  instagram: { channel: 'extension', name: 'Instagram' },
  pinterest: { channel: 'extension', name: 'Pinterest' },
  quora: { channel: 'extension', name: 'Quora' },
  reddit: { channel: 'extension', name: 'Reddit' },
  blogger: { channel: 'extension', name: 'Blogger' },
};

export async function GET() {
  ensureWorker();
  const jobs = await db.publishJob.findMany({
    orderBy: { queuedAt: 'desc' },
    take: 80,
    include: { draft: { select: { title: true } } },
  });
  return Response.json({
    ok: true,
    platforms: PLATFORMS,
    jobs: jobs.map(j => ({
      id: j.id, platform: j.platform, channel: j.channel, status: j.status, approval: j.approval,
      title: j.title || j.draft?.title || '', tags: j.tags, publishedUrl: j.publishedUrl,
      evidence: j.evidence, error: j.error, attempts: j.attempts, deviceName: j.deviceName,
      queuedAt: j.queuedAt, finishedAt: j.finishedAt, verifiedAt: j.verifiedAt,
    })),
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  let platform = String(body.platform || '');

  // Dynamic destination: a site open in the user's Chrome ("site:example.com")
  let siteHost = '';
  if (platform.startsWith('site:')) {
    siteHost = platform.slice(5).toLowerCase().replace(/^www\./, '');
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(siteHost)) {
      return Response.json({ ok: false, error: `Invalid site host: ${siteHost}` }, { status: 400 });
    }
    const site = await db.browserSite.findUnique({ where: { host: siteHost } });
    if (!site) {
      return Response.json({ ok: false, error: `Site ${siteHost} is not in the Publisher Hub. Open it in Chrome with the extension running, or add it from Publisher Hub → Browser Sites.` }, { status: 400 });
    }
  } else if (!PLATFORMS[platform]) {
    return Response.json({ ok: false, error: `Unknown platform: ${platform}` }, { status: 400 });
  }
  const channel: 'api' | 'extension' = siteHost ? 'extension' : PLATFORMS[platform].channel;
  const displayName = siteHost ? `${siteHost} (your Chrome)` : PLATFORMS[platform].name;

  let title = String(body.title || '');
  let bodyMd = String(body.bodyMd || '');
  let tags = String(body.tags || '');
  let draftId: string | null = null;

  if (body.draftId) {
    const draft = await db.contentDraft.findUnique({ where: { id: body.draftId } });
    if (!draft) return Response.json({ ok: false, error: 'Draft not found' }, { status: 404 });
    title = draft.title; bodyMd = draft.bodyMd; tags = draft.tags; draftId = draft.id;
  }
  if (!title || !bodyMd) return Response.json({ ok: false, error: 'Title and body required (or provide draftId)' }, { status: 400 });

  // API-channel jobs need a verified credential before queueing
  if (channel === 'api') {
    const cred = await db.platformCredential.findFirst({ where: { platform, status: 'ok' } });
    if (!cred) {
      return Response.json({ ok: false, error: `No verified ${platform} credential. Connect and test it in Credentials Manager first (extension channel works without API credentials).` }, { status: 400 });
    }
  }

  // One-time permission: if already granted for this destination, the job skips the approval queue.
  const permKey = siteHost ? 'site:' + siteHost : platform;
  const permission = await getPermission(permKey);
  const approval = permission === 'granted' ? 'approved' : 'pending';

  const job = await db.publishJob.create({
    data: { draftId, title, bodyMd, tags, platform, channel, status: 'queued', approval },
  });
  await logActivity('publish', approval === 'approved'
    ? `Queued publish job → ${displayName} — permission previously granted, executing without asking again`
    : `Queued publish job → ${displayName} (${channel} channel), awaiting approval`, { jobId: job.id });
  return Response.json({ ok: true, jobId: job.id, channel, approval, note: approval === 'approved'
    ? `Executing — one-time permission for ${displayName} is already granted.`
    : 'Queued — approve it once in the Approval Queue, or grant standing permission in Publisher Hub.' });
}

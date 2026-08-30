import { db } from '@/lib/db';
import { logActivity } from '@/lib/log';
import { ensureWorker } from '@/lib/worker';

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
  const platform = String(body.platform || '');
  const spec = PLATFORMS[platform];
  if (!spec) return Response.json({ ok: false, error: `Unknown platform: ${platform}` }, { status: 400 });

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
  if (spec.channel === 'api') {
    const cred = await db.platformCredential.findFirst({ where: { platform, status: 'ok' } });
    if (!cred) {
      return Response.json({ ok: false, error: `No verified ${platform} credential. Connect and test it in Credentials Manager first (extension channel works without API credentials).` }, { status: 400 });
    }
  }

  const job = await db.publishJob.create({
    data: { draftId, title, bodyMd, tags, platform, channel: spec.channel, status: 'queued', approval: 'pending' },
  });
  await logActivity('publish', `Queued publish job → ${spec.name} (${spec.channel} channel), awaiting approval`, { jobId: job.id });
  return Response.json({ ok: true, jobId: job.id, channel: spec.channel, approval: 'pending' });
}

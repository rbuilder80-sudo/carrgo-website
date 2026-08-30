import { db } from '@/lib/db';
import { decryptSecret } from './crypto';
import { publishViaApi } from './platforms';
import { verifyPublishedUrl } from './verify';
import { logActivity } from './log';

const TICK_MS = 15000;
const DEVICE_STALE_MS = 95000;
const MAX_ATTEMPTS = 3;

type G = typeof globalThis & { __carrgoWorker?: { running: boolean; timer?: NodeJS.Timeout } };
const g = globalThis as G;

export function startWorker() {
  if (g.__carrgoWorker?.running) return;
  g.__carrgoWorker = { running: true };
  console.log('[worker] background worker started');
  setTimeout(tick, 4000);
  g.__carrgoWorker.timer = setInterval(tick, TICK_MS);
}

// Lazy init guard usable from API routes (works even if instrumentation.ts did not run)
export function ensureWorker() {
  startWorker();
}

async function tick() {
  try {
    await markStaleDevices();
    await processApiJobs();
    await verifyUnverified();
    await retryQueuedApiJobs();
  } catch (e) {
    console.error('[worker] tick error', e);
  }
}

async function markStaleDevices() {
  const cutoff = new Date(Date.now() - DEVICE_STALE_MS);
  await db.pairedDevice.updateMany({
    where: { status: 'online', OR: [{ lastHeartbeat: { lt: cutoff } }, { lastHeartbeat: null }] },
    data: { status: 'offline' },
  });
}

async function processApiJobs() {
  const jobs = await db.publishJob.findMany({
    where: { channel: 'api', status: { in: ['queued', 'running'] }, approval: 'approved', attempts: { lt: MAX_ATTEMPTS } },
    include: { draft: true },
    orderBy: { queuedAt: 'asc' },
    take: 3,
  });

  for (const job of jobs) {
    const cred = await db.platformCredential.findFirst({ where: { platform: job.platform }, orderBy: { updatedAt: 'desc' } });
    if (!cred) {
      await db.publishJob.update({
        where: { id: job.id },
        data: { status: 'failed', error: `No credential connected for ${job.platform} — connect it in Credentials Manager`, finishedAt: new Date(), attempts: { increment: 1 } },
      });
      await logActivity('publish', `Job ${job.id} failed: missing ${job.platform} credential`);
      continue;
    }
    if (cred.status !== 'ok') {
      await db.publishJob.update({
        where: { id: job.id },
        data: { status: 'queued', error: `Credential for ${job.platform} is not verified (status: ${cred.status}). Test it in Credentials Manager.` },
      });
      continue;
    }

    let meta: Record<string, string> = {};
    try { meta = JSON.parse(cred.metaJson || '{}'); } catch { /* */ }

    await db.publishJob.update({ where: { id: job.id }, data: { status: 'running', startedAt: new Date(), attempts: { increment: 1 }, error: null } });

    try {
      const result = await publishViaApi(cred.platform, cred.secretEnc, meta, {
        title: job.title,
        bodyMd: job.bodyMd,
        tags: job.tags,
      });

      if (result.ok) {
        await db.publishJob.update({
          where: { id: job.id },
          data: { status: 'published', publishedUrl: result.url || null, evidence: result.raw || `Published via ${cred.platform} API`, finishedAt: new Date() },
        });
        if (job.draftId) await db.contentDraft.update({ where: { id: job.draftId }, data: { status: 'published' } }).catch(() => {});
        await logActivity('publish', `Published "${job.title}" to ${cred.platform} via API`, { url: result.url });
      } else {
        const attempts = job.attempts + 1;
        await db.publishJob.update({
          where: { id: job.id },
          data: { status: attempts >= MAX_ATTEMPTS ? 'failed' : 'queued', error: result.error || 'Unknown publish error', finishedAt: attempts >= MAX_ATTEMPTS ? new Date() : null },
        });
        await logActivity('publish', `Publish to ${cred.platform} failed: ${result.error}`, { jobId: job.id });
      }
    } catch (e) {
      await db.publishJob.update({
        where: { id: job.id },
        data: { status: 'failed', error: `Worker exception: ${(e as Error).message}`, finishedAt: new Date() },
      });
    }
  }
}

async function verifyUnverified() {
  const jobs = await db.publishJob.findMany({
    where: { status: 'published', publishedUrl: { not: null }, verifiedAt: null },
    take: 3,
  });
  for (const job of jobs) {
    if (!job.publishedUrl) continue;
    const evidence = job.evidence || '';
    const triesMatch = evidence.match(/verify#(\d+)/);
    const tries = triesMatch ? Number(triesMatch[1]) : 0;
    if (tries >= 10) continue; // stop re-checking after 10 failed verification rounds
    try {
      const v = await verifyPublishedUrl(job.publishedUrl, job.title);
      if (v.verified) {
        await db.publishJob.update({
          where: { id: job.id },
          data: { status: 'verified', verifiedAt: new Date(), evidence: `${evidence} | Verified: ${v.detail}`.slice(0, 900) },
        });
        await logActivity('verify', `Verified published URL for "${job.title}" — ${v.detail}`, { url: job.publishedUrl });
      } else {
        const base = evidence.replace(/ \| verify#\d+.*$/, '');
        await db.publishJob.update({
          where: { id: job.id },
          data: { evidence: `${base} | verify#${tries + 1}: ${v.detail}`.slice(0, 900) },
        });
      }
    } catch { /* next tick */ }
  }
}

async function retryQueuedApiJobs() {
  // Jobs queued but waiting for approval stay untouched. Jobs with pending approval that are approved elsewhere get picked up by processApiJobs.
}

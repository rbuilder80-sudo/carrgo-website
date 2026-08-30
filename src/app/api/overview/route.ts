import { db } from '@/lib/db';
import { ensureWorker } from '@/lib/worker';

export async function GET() {
  ensureWorker();
  const [drafts, jobs, keywords, devices, creds, suggestions, tasks, audits, gsc, ga4] = await Promise.all([
    db.contentDraft.count(),
    db.publishJob.findMany({ orderBy: { queuedAt: 'desc' }, take: 6, include: { draft: { select: { title: true } } } }),
    db.keyword.count(),
    db.pairedDevice.findMany({ orderBy: { pairedAt: 'desc' } }),
    db.platformCredential.findMany({ select: { id: true, platform: true, label: true, status: true, lastCheckedAt: true } }),
    db.suggestion.count({ where: { status: 'open' } }),
    db.agentTask.count({ where: { status: 'queued' } }),
    db.auditRun.findFirst({ orderBy: { createdAt: 'desc' } }),
    db.gscQuery.count(),
    db.ga4Summary.count(),
  ]);

  return Response.json({
    ok: true,
    site: 'carrgo.co.uk',
    counts: { drafts, keywords, suggestions, queuedTasks: tasks, gscQueries: gsc, ga4Batches: ga4 },
    latestAudit: audits ? { score: audits.score, grade: audits.grade, url: audits.url, createdAt: audits.createdAt } : null,
    devices: devices.map(d => ({ name: d.name, status: d.status, lastHeartbeat: d.lastHeartbeat, paired: !!d.pairedAt })),
    credentials: creds,
    recentJobs: jobs.map(j => ({
      id: j.id, platform: j.platform, channel: j.channel, status: j.status, approval: j.approval,
      title: j.title || j.draft?.title || '', publishedUrl: j.publishedUrl, queuedAt: j.queuedAt,
    })),
  });
}

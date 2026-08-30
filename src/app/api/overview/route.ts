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

  const [autopilotLast, autopilotEnabled, autopilotCycles, browserSites, enquiriesToday, rankChecks] = await Promise.all([
    db.setting.findUnique({ where: { key: 'autopilot_last_run' } }),
    db.setting.findUnique({ where: { key: 'autopilot_enabled' } }),
    db.setting.findUnique({ where: { key: 'autopilot_cycles' } }),
    db.browserSite.findMany({ orderBy: { lastSeen: 'desc' }, take: 12 }),
    db.enquiry.count({ where: { receivedAt: { gte: new Date(new Date().toISOString().slice(0, 10)) } } }),
    db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 300 }),
  ]);
  const latestByTerm = new Map<string, number | null>();
  for (const c of rankChecks) if (!latestByTerm.has(c.term)) latestByTerm.set(c.term, c.position);
  const positions = [...latestByTerm.values()];

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
    autopilot: {
      enabled: autopilotEnabled?.value === 'true',
      lastRun: autopilotLast?.value || null,
      cycles: Number(autopilotCycles?.value || '0'),
    },
    browserSites: browserSites.map(s => ({ host: s.host, title: s.title, added: s.added, lastSeen: s.lastSeen })),
    enquiriesToday,
    ranks: {
      checked: positions.length,
      top10: positions.filter(p => p !== null && p <= 10).length,
      top3: positions.filter(p => p !== null && p <= 3).length,
    },
  });
}

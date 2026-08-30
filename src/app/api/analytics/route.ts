import { db } from '@/lib/db';

export async function GET() {
  const [auditRuns, jobsAll, jobsVerified, drafts, keywords, gscTotals, ga4Latest, ga4Agg, backlinks, competitors, activity] = await Promise.all([
    db.auditRun.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    db.publishJob.count(),
    db.publishJob.count({ where: { status: { in: ['published', 'verified'] } } }),
    db.contentDraft.aggregate({ _sum: { wordCount: true } }),
    db.keyword.count(),
    db.gscQuery.aggregate({ _sum: { clicks: true, impressions: true } }),
    db.ga4Summary.findFirst({ orderBy: { createdAt: 'desc' } }),
    db.ga4Page.aggregate({ _sum: { sessions: true, users: true } }),
    db.backlink.findMany({ orderBy: { lastChecked: 'desc' }, take: 20 }),
    db.competitor.count(),
    db.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 25 }),
  ]);

  const latest = auditRuns[0];
  const contentWords = drafts._sum.wordCount || 0;

  return Response.json({
    ok: true,
    health: {
      latestAudit: latest ? { score: latest.score, grade: latest.grade, url: latest.url, createdAt: latest.createdAt } : null,
      auditHistory: auditRuns.map(a => ({ score: a.score, grade: a.grade, createdAt: a.createdAt, url: a.url })),
    },
    publishing: {
      totalJobs: jobsAll,
      livePublications: jobsVerified,
      liveRate: jobsAll ? Math.round((jobsVerified / jobsAll) * 100) : 0,
      recentLive: await db.publishJob.findMany({ where: { status: { in: ['published', 'verified'] } }, orderBy: { finishedAt: 'desc' }, take: 8, select: { platform: true, publishedUrl: true, title: true, finishedAt: true, status: true } }),
    },
    content: { totalWords: contentWords, estValueUsd: Math.round(contentWords * 0.12), draftCount: await db.contentDraft.count() },
    keywords: { count: keywords },
    gsc: { clicks: gscTotals._sum.clicks || 0, impressions: gscTotals._sum.impressions || 0 },
    ga4: { sessions: ga4Agg._sum.sessions || 0, users: ga4Agg._sum.users || 0, latest: ga4Latest },
    authority: { backlinks: backlinks.length, backlinkLive: backlinks.filter(b => b.status === 'live').length, competitors },
    activity: activity.map(a => ({ id: a.id, type: a.type, message: a.message, createdAt: a.createdAt })),
  });
}

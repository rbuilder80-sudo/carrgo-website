import { db } from '@/lib/db';
import { generateIntelligence } from '@/lib/content';

export async function GET() {
  const [suggestions, gscTop, ga4Top, gscTotals, ga4Latest] = await Promise.all([
    db.suggestion.findMany({ orderBy: [{ createdAt: 'desc' }], take: 60 }),
    db.gscQuery.findMany({ orderBy: { impressions: 'desc' }, take: 12 }),
    db.ga4Page.findMany({ orderBy: { sessions: 'desc' }, take: 10 }),
    db.gscQuery.aggregate({ _sum: { clicks: true, impressions: true } }),
    db.ga4Summary.findFirst({ orderBy: { createdAt: 'desc' } }),
  ]);
  const ga4Agg = await db.ga4Page.aggregate({ _sum: { sessions: true, users: true } });

  return Response.json({
    ok: true,
    suggestions,
    gsc: {
      topQueries: gscTop,
      totalClicks: gscTotals._sum.clicks || 0,
      totalImpressions: gscTotals._sum.impressions || 0,
      rows: await db.gscQuery.count(),
    },
    ga4: {
      summary: ga4Latest,
      topPages: ga4Top,
      totalSessions: ga4Agg._sum.sessions || 0,
      totalUsers: ga4Agg._sum.users || 0,
    },
  });
}

export async function POST() {
  try {
    const result = await generateIntelligence();
    return Response.json({ ok: true, summary: result.summary, count: result.suggestions.length, suggestions: result.suggestions });
  } catch (e) {
    return Response.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

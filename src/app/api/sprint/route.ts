import { db } from '@/lib/db';
import { ensureWorker } from '@/lib/worker';

function dayKey(d: Date) { return d.toISOString().slice(0, 10); }

export async function GET() {
  ensureWorker();
  const [startRow, targetRow] = await Promise.all([
    db.setting.findUnique({ where: { key: 'sprint_start' } }),
    db.setting.findUnique({ where: { key: 'sprint_target_daily' } }),
  ]);
  const start = startRow?.value || '2026-08-31';
  const targetDaily = Number(targetRow?.value || '10') || 10;
  const startMs = new Date(start + 'T00:00:00Z').getTime();
  const todayKey = dayKey(new Date());
  const todayMs = new Date(todayKey + 'T00:00:00Z').getTime();
  const dayOfSprint = Math.max(1, Math.min(30, Math.floor((todayMs - startMs) / 86400000) + 1));
  const daysLeft = Math.max(0, 30 - dayOfSprint);

  const enquiries = await db.enquiry.findMany({ orderBy: { receivedAt: 'desc' }, take: 500 });
  const perDay: Array<{ day: string; count: number }> = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(startMs + i * 86400000);
    perDay.push({ day: dayKey(d), count: 0 });
  }
  for (const e of enquiries) {
    const k = dayKey(e.receivedAt);
    const slot = perDay.find(p => p.day === k);
    if (slot) slot.count++;
  }
  const today = perDay.find(p => p.day === todayKey);
  const total = enquiries.length;
  const sprintTotal = perDay.reduce((s, p) => s + p.count, 0);
  // calendar-day count (independent of sprint window) — no enquiry ever shows as "0 today" when it exists
  const enquiriesToday = enquiries.filter(e => dayKey(e.receivedAt) === todayKey).length;
  const expectedByNow = targetDaily * dayOfSprint;
  const pace = expectedByNow > 0 ? Math.round((sprintTotal / expectedByNow) * 100) : 0;

  // rank summary from latest check per priority keyword
  const priorityCount = await db.keyword.count({ where: { priority: true } });
  const checks = await db.rankCheck.findMany({ orderBy: { checkedAt: 'desc' }, take: 600 });
  const latestByTerm = new Map<string, number | null>();
  for (const c of checks) if (!latestByTerm.has(c.term)) latestByTerm.set(c.term, c.position);
  const positions = [...latestByTerm.values()];
  const rankSummary = {
    priorityKeywords: priorityCount,
    checked: positions.length,
    top3: positions.filter(p => p !== null && p <= 3).length,
    top10: positions.filter(p => p !== null && p <= 10).length,
    top20: positions.filter(p => p !== null && p <= 20).length,
    notRanking: positions.filter(p => p === null).length,
  };

  const published = await db.publishJob.count({ where: { status: { in: ['published', 'verified'] } } });
  const autopilotLast = await db.setting.findUnique({ where: { key: 'autopilot_last_run' } });
  const autopilotEnabled = await db.setting.findUnique({ where: { key: 'autopilot_enabled' } });

  return Response.json({
    ok: true,
    start, targetDaily, dayOfSprint, daysLeft, todayKey,
    enquiriesTotal: total,
    sprintEnquiries: sprintTotal,
    expectedByNow,
    pacePct: pace,
    enquiriesToday,
    onTrackForDaily: enquiriesToday >= targetDaily,
    perDay,
    rankSummary,
    publishedCount: published,
    autopilot: { enabled: autopilotEnabled?.value === 'true', lastRun: autopilotLast?.value || null },
  });
}

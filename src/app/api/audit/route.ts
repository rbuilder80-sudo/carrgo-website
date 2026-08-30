import { db } from '@/lib/db';
import { runLiveAudit } from '@/lib/audit';
import { logActivity } from '@/lib/log';

export async function GET() {
  const runs = await db.auditRun.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
  return Response.json({
    ok: true,
    runs: runs.map(r => ({ id: r.id, url: r.url, score: r.score, grade: r.grade, createdAt: r.createdAt, summary: JSON.parse(r.summaryJson || '{}') })),
  });
}

export async function POST(req: Request) {
  const { url } = await req.json().catch(() => ({ url: '' }));
  const target = (url || 'https://carrgo.co.uk').trim();
  try {
    const result = await runLiveAudit(target);
    const run = await db.auditRun.create({
      data: { url: target, score: result.score, grade: result.grade, summaryJson: JSON.stringify({ checks: result.checks, stats: result.stats }) },
    });
    await logActivity('audit', `Live audit of ${target}: ${result.score}/100 (${result.grade})`);
    return Response.json({ ok: true, runId: run.id, score: result.score, grade: result.grade, checks: result.checks, stats: result.stats });
  } catch (e) {
    return Response.json({ ok: false, error: `Audit failed: ${(e as Error).message}` }, { status: 500 });
  }
}

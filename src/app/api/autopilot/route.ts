import { db } from '@/lib/db';
import { runAutopilotCycle } from '@/lib/autopilot';
import { ensureWorker } from '@/lib/worker';

export async function GET() {
  ensureWorker();
  const [enabled, mode, interval, lastRun, cycles, runningAt] = await Promise.all([
    db.setting.findUnique({ where: { key: 'autopilot_enabled' } }),
    db.setting.findUnique({ where: { key: 'autopilot_mode' } }),
    db.setting.findUnique({ where: { key: 'autopilot_interval_min' } }),
    db.setting.findUnique({ where: { key: 'autopilot_last_run' } }),
    db.setting.findUnique({ where: { key: 'autopilot_cycles' } }),
    db.setting.findUnique({ where: { key: 'autopilot_running_at' } }),
  ]);
  const logs = await db.autopilotLog.findMany({ orderBy: { createdAt: 'desc' }, take: 80 });
  return Response.json({
    ok: true,
    enabled: enabled?.value === 'true',
    mode: mode?.value || 'aggressive',
    intervalMin: Number(interval?.value || '20'),
    lastRun: lastRun?.value || null,
    cycles: Number(cycles?.value || '0'),
    running: Boolean(runningAt?.value),
    logs,
  });
}

export async function POST(req: Request) {
  ensureWorker();
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || '');
  const upsert = (key: string, value: string) => db.setting.upsert({ where: { key }, create: { key, value }, update: { value } });

  if (action === 'enable') { await upsert('autopilot_enabled', 'true'); }
  else if (action === 'disable') { await upsert('autopilot_enabled', 'false'); }
  else if (action === 'mode') { await upsert('autopilot_mode', body.mode === 'safe' ? 'safe' : 'aggressive'); }
  else if (action === 'interval') { await upsert('autopilot_interval_min', String(Math.max(5, Number(body.minutes) || 20))); }
  else if (action === 'run') {
    const res = await runAutopilotCycle('manual');
    return Response.json({ ok: res.ran, ...res });
  } else {
    return Response.json({ ok: false, error: 'Unknown action' }, { status: 400 });
  }
  return Response.json({ ok: true });
}

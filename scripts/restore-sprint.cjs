// Restore sprint settings, mark all keywords priority, enable autopilot
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const up = (key, value) => db.setting.upsert({ where: { key }, create: { key, value }, update: { value } });

async function main() {
  await up('sprint_start', '2026-08-31');
  await up('sprint_target_daily', '10');
  await up('autopilot_enabled', 'true');
  await up('autopilot_mode', 'aggressive');
  await up('autopilot_interval_min', '20');
  const kw = await db.keyword.updateMany({ data: { priority: true, status: 'targeting' } });
  const keys = await db.setting.count();
  console.log(`settings rows: ${keys}, keywords flagged priority: ${kw.count}`);
}
main().finally(() => db.$disconnect());

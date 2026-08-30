import { db } from '@/lib/db';

export async function logActivity(type: string, message: string, meta: Record<string, unknown> = {}) {
  try {
    await db.activityLog.create({
      data: { type, message, metaJson: JSON.stringify(meta).slice(0, 4000) },
    });
  } catch (e) {
    console.error('activity log failed', e);
  }
}

export async function recentActivity(limit = 50) {
  return db.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}

import { db } from '@/lib/db';
import { logActivity } from '@/lib/log';

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { status } = await req.json().catch(() => ({ status: '' }));
  if (!['open', 'approved', 'rejected', 'done'].includes(status)) {
    return Response.json({ ok: false, error: 'Invalid status' }, { status: 400 });
  }
  const s = await db.suggestion.update({ where: { id }, data: { status } }).catch(() => null);
  if (!s) return Response.json({ ok: false, error: 'Suggestion not found' }, { status: 404 });
  if (status === 'approved') {
    await db.agentTask.create({
      data: {
        type: suggestionTaskType(s.category),
        title: s.title.slice(0, 200),
        payloadJson: JSON.stringify({ suggestionId: s.id, detail: s.detail.slice(0, 1000) }),
        autoExecuted: false,
      },
    });
    await logActivity('approvals', `Suggestion approved → task created: ${s.title}`);
  }
  return Response.json({ ok: true });
}

function suggestionTaskType(category: string): string {
  switch (category) {
    case 'site': return 'technical-fix';
    case 'ranking': return 'content-refresh';
    case 'authority': return 'backlink-outreach';
    default: return 'general';
  }
}

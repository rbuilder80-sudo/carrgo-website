import { runAgentTurn } from '@/lib/agent';
import { db } from '@/lib/db';
import { logActivity } from '@/lib/log';

export const maxDuration = 300;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = String(body.message || '').trim();
  const history: Array<{ role: 'user' | 'assistant'; content: string }> = Array.isArray(body.history)
    ? body.history.filter((h: { role?: string; content?: string }) => h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string')
    : [];

  if (!message) return Response.json({ ok: false, error: 'Message required' }, { status: 400 });

  try {
    const turn = await runAgentTurn(history, message);
    await logActivity('agent', `Master Agent turn: ${turn.actions.length} action(s) executed`);
    return Response.json({ ok: true, reply: turn.reply, actions: turn.actions });
  } catch (e) {
    console.error('agent chat error', e);
    return Response.json({ ok: false, error: `Master Agent error: ${(e as Error).message}` }, { status: 500 });
  }
}

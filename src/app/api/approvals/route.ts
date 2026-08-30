import { db } from '@/lib/db';
import { logActivity } from '@/lib/log';
import { ensureWorker } from '@/lib/worker';

export async function GET() {
  ensureWorker();
  const [jobs, tasks] = await Promise.all([
    db.publishJob.findMany({
      orderBy: { queuedAt: 'desc' },
      take: 50,
      where: { approval: { in: ['pending', 'deferred'] } },
    }),
    db.agentTask.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);
  return Response.json({
    ok: true,
    jobs: jobs.map(j => ({ id: j.id, kind: 'job', platform: j.platform, channel: j.channel, title: j.title, approval: j.approval, status: j.status, queuedAt: j.queuedAt })),
    tasks: tasks.map(t => ({ id: t.id, kind: 'task', type: t.type, title: t.title, status: t.status, autoExecuted: t.autoExecuted, result: t.resultJson, error: t.error, createdAt: t.createdAt })),
  });
}

export async function POST(req: Request) {
  const { id, kind, action } = await req.json().catch(() => ({}));
  if (!id || !kind || !action) return Response.json({ ok: false, error: 'id, kind and action required' }, { status: 400 });

  if (kind === 'job') {
    const job = await db.publishJob.findUnique({ where: { id } });
    if (!job) return Response.json({ ok: false, error: 'Job not found' }, { status: 404 });

    if (action === 'approve') {
      if (job.channel === 'api') {
        const cred = await db.platformCredential.findFirst({ where: { platform: job.platform, status: 'ok' } });
        if (!cred) {
          return Response.json({ ok: false, error: `Cannot approve: no verified ${job.platform} credential. Connect it in Credentials Manager.` }, { status: 400 });
        }
      }
      await db.publishJob.update({ where: { id }, data: { approval: 'approved', status: 'queued', error: null } });
      await logActivity('approvals', `Publishing job approved: "${job.title}" → ${job.platform} (${job.channel})`);
      return Response.json({ ok: true, detail: job.channel === 'api' ? 'Approved — the publisher bot will push it live within ~15 seconds' : 'Approved — it will be claimed by your paired Chrome extension' });
    }
    if (action === 'reject') {
      await db.publishJob.update({ where: { id }, data: { approval: 'rejected', status: 'failed', error: 'Rejected in Approval Queue', finishedAt: new Date() } });
      await logActivity('approvals', `Publishing job rejected: "${job.title}"`);
      return Response.json({ ok: true });
    }
    if (action === 'defer') {
      await db.publishJob.update({ where: { id }, data: { approval: 'deferred', queuedAt: new Date() } });
      return Response.json({ ok: true, detail: 'Deferred to end of queue' });
    }
  }

  if (kind === 'task') {
    const task = await db.agentTask.findUnique({ where: { id } });
    if (!task) return Response.json({ ok: false, error: 'Task not found' }, { status: 404 });

    if (action === 'approve') {
      await db.agentTask.update({ where: { id }, data: { status: 'running' } });
      // Execute real task actions now
      try {
        const result = await executeTask(task.type, task.title, task.payloadJson);
        await db.agentTask.update({ where: { id }, data: { status: 'done', resultJson: JSON.stringify(result).slice(0, 2000), finishedAt: new Date() } });
        await logActivity('tasks', `Task executed: ${task.title}`);
        return Response.json({ ok: true, detail: result.summary });
      } catch (e) {
        await db.agentTask.update({ where: { id }, data: { status: 'failed', error: (e as Error).message.slice(0, 500), finishedAt: new Date() } });
        return Response.json({ ok: false, error: `Task failed: ${(e as Error).message}` }, { status: 500 });
      }
    }
    if (action === 'reject') {
      await db.agentTask.update({ where: { id }, data: { status: 'failed', error: 'Rejected in Approval Queue', finishedAt: new Date() } });
      return Response.json({ ok: true });
    }
    if (action === 'defer') {
      await db.agentTask.update({ where: { id }, data: { createdAt: new Date() } });
      return Response.json({ ok: true, detail: 'Deferred' });
    }
  }

  return Response.json({ ok: false, error: 'Unknown kind/action' }, { status: 400 });
}

async function executeTask(type: string, title: string, payloadJson: string): Promise<{ summary: string }> {
  const { runLiveAudit } = await import('@/lib/audit');
  const { researchKeywords } = await import('@/lib/keywords');
  const { generateArticle } = await import('@/lib/content');
  const { webSearch } = await import('@/lib/ai');
  const { fetchText } = await import('@/lib/http');

  let payload: Record<string, unknown> = {};
  try { payload = JSON.parse(payloadJson || '{}'); } catch { /* */ }

  switch (type) {
    case 'technical-fix': {
      const audit = await runLiveAudit('https://carrgo.co.uk');
      const fails = audit.checks.filter(c => c.status !== 'pass');
      return { summary: `Fresh live audit scored carrgo.co.uk ${audit.score}/100 (${audit.grade}). ${fails.length} items need attention: ${fails.map(f => f.title).slice(0, 5).join(', ')}` };
    }
    case 'content-refresh': {
      const kws = await researchKeywords(String(payload.detail ? title : title).slice(0, 60));
      const top = kws.slice(0, 6).map(k => k.term);
      const article = await generateArticle(title, top, 1000);
      const draft = await db.contentDraft.create({
        data: { title: article.title.slice(0, 250), bodyMd: article.bodyMd, tags: article.tags.join(', '), wordCount: article.wordCount, source: 'task', metaJson: JSON.stringify({ metaDescription: article.metaDescription, fromTask: title }) },
      });
      return { summary: `Refreshed content generated as draft "${article.title}" (${article.wordCount} words) in Content Studio` };
    }
    case 'backlink-outreach': {
      const results = await webSearch(`"freight forwarding" UK blog write for us guest post`, 8);
      const prospects = results.filter(r => r.url).slice(0, 6).map(r => `- ${r.host_name || r.url}: ${r.name || ''}`);
      return { summary: `Found ${prospects.length} live guest-post prospects:\n${prospects.join('\n')}` };
    }
    case 'citation-build': {
      const results = await webSearch('UK business directories logistics companies free listing', 6);
      const dirs = results.filter(r => r.url).slice(0, 5).map(r => `- ${r.host_name || r.url}`);
      return { summary: `Citation sources identified:\n${dirs.join('\n')}` };
    }
    case 'schema-inject': {
      const r = await fetchText('https://carrgo.co.uk', 15000);
      const hasSchema = r.ok && /application\/ld\+json/i.test(r.body);
      return { summary: `Live check of carrgo.co.uk: structured data ${hasSchema ? 'is present' : 'is MISSING'} (HTTP ${r.status}). ${hasSchema ? 'Validate it at validator.schema.org for errors.' : 'Add Organization + LocalBusiness JSON-LD to the homepage.'}` };
    }
    default:
      return { summary: `Task "${title}" acknowledged and queued for manual follow-up. Use the Master Agent to execute related actions.` };
  }
}

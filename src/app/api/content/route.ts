import { db } from '@/lib/db';
import { generateArticle } from '@/lib/content';
import { webSearch } from '@/lib/ai';
import { logActivity } from '@/lib/log';

export async function GET() {
  const drafts = await db.contentDraft.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 100,
    select: { id: true, title: true, tags: true, keywords: true, status: true, wordCount: true, source: true, createdAt: true, updatedAt: true, metaJson: true },
  });
  return Response.json({ ok: true, drafts });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const topic = (body.topic || '').trim();
  const keywords: string[] = Array.isArray(body.keywords) ? body.keywords : [];
  if (topic.length < 4) return Response.json({ ok: false, error: 'Topic required (min 4 chars)' }, { status: 400 });

  let context = '';
  if (body.liveResearch !== false) {
    try {
      const results = await webSearch(`${topic} UK freight logistics`, 5);
      context = results.map(r => `${r.name || ''}: ${r.snippet || ''}`).join('\n');
    } catch { /* optional */ }
  }

  const article = await generateArticle(topic, keywords, Number(body.targetWords) || 1100, context);
  const draft = await db.contentDraft.create({
    data: {
      title: article.title.slice(0, 250),
      bodyMd: article.bodyMd,
      tags: article.tags.join(', '),
      keywords: keywords.join(', '),
      wordCount: article.wordCount,
      status: 'draft',
      source: 'ai',
      metaJson: JSON.stringify({ metaDescription: article.metaDescription }),
    },
  });
  await logActivity('content', `Generated "${article.title}" (${article.wordCount} words) with live research context`);
  return Response.json({ ok: true, draft: { ...draft, metaDescription: article.metaDescription } });
}

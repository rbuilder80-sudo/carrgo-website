import { llm, extractJson } from './ai';
import { db } from '@/lib/db';
import { logActivity } from './log';

export type GeneratedArticle = {
  title: string;
  bodyMd: string;
  tags: string[];
  metaDescription: string;
  wordCount: number;
};

const CONTENT_SYSTEM = `You are the CARRGO Content Engine, an expert UK logistics copywriter and SEO specialist for carrgo.co.uk — a UK freight forwarding and logistics company.
Write for UK SME importers/exporters, operations directors, and e-commerce sellers. British English. Specific, practical, numbers where possible.
Return STRICT JSON only, no markdown fences:
{"title": "...", "metaDescription": "...(150-160 chars)", "tags": ["tag1","tag2","tag3"], "bodyMd": "full markdown article body (H2/H3 headings, lists, practical detail, 900-1300 words; do NOT repeat the title as an H1)"}`;

export async function generateArticle(topic: string, keywords: string[], targetWords = 1100, extraContext = ''): Promise<GeneratedArticle> {
  const kw = keywords.filter(Boolean).slice(0, 8).join(', ');
  const user = `Write a complete, publication-ready article.
Topic: ${topic}
Target keywords (weave naturally): ${kw || 'UK freight forwarding, shipping from the UK, customs clearance'}
Length: about ${targetWords} words.
${extraContext ? `Additional live research context to incorporate where relevant:\n${extraContext.slice(0, 3000)}` : ''}
Rules: markdown body only (no H1), UK English, practical freight/logistics insight, include realistic process steps, costs framing, and compliance touchpoints (HMRC, incoterms, customs declarations). No fabricated client names or fake statistics attributed to real organisations.`;

  const raw = await llm(CONTENT_SYSTEM, user, 8000);
  const parsed = extractJson<GeneratedArticle>(raw);
  if (parsed && parsed.title && parsed.bodyMd) {
    const words = parsed.bodyMd.split(/\s+/).filter(Boolean).length;
    return { ...parsed, wordCount: words };
  }
  // Fallback: treat whole response as body
  const words = raw.split(/\s+/).filter(Boolean).length;
  return { title: topic, bodyMd: raw, tags: keywords.slice(0, 3), metaDescription: '', wordCount: words };
}

// ---------- SEO Intelligence brain ----------

export type IntelResult = {
  suggestions: Array<{ category: 'site' | 'ranking' | 'authority'; title: string; detail: string; priority: 'high' | 'medium' | 'low' }>;
  summary: string;
};

export async function generateIntelligence(): Promise<IntelResult> {
  const [queries, pages, ga4Pages, latestAudit, keywords, competitors, suggestionsOpen] = await Promise.all([
    db.gscQuery.findMany({ orderBy: { impressions: 'desc' }, take: 25 }),
    db.gscPage.findMany({ orderBy: { impressions: 'desc' }, take: 15 }),
    db.ga4Page.findMany({ orderBy: { sessions: 'desc' }, take: 15 }),
    db.auditRun.findFirst({ orderBy: { createdAt: 'desc' } }),
    db.keyword.findMany({ where: { status: { in: ['targeting', 'tracked'] } }, take: 20 }),
    db.competitor.findMany({ take: 10 }),
    db.suggestion.findMany({ where: { status: 'open' }, take: 200, select: { title: true } }),
  ]);

  const ga4 = await db.ga4Summary.findFirst({ orderBy: { createdAt: 'desc' } });
  const existing = suggestionsOpen.map(s => s.title);

  const dataPack = {
    gscQueries: queries.map(q => ({ query: q.query, clicks: q.clicks, impressions: q.impressions, ctr: +(q.ctr * 100).toFixed(2) + '%', position: +q.position.toFixed(1) })),
    gscPages: pages.map(p => ({ page: p.page, clicks: p.clicks, impressions: p.impressions, position: +p.position.toFixed(1) })),
    ga4Summary: ga4 ? { sessions: ga4.sessions, users: ga4.users, pageviews: ga4.pageviews, engagementRate: ga4.engagementRate } : null,
    ga4TopPages: ga4Pages.map(p => ({ path: p.path, sessions: p.sessions, users: p.users, engagement: p.engagement })),
    latestAudit: latestAudit ? { score: latestAudit.score, grade: latestAudit.grade, createdAt: latestAudit.createdAt } : null,
    targetedKeywords: keywords.map(k => k.term),
    competitors: competitors.map(c => c.domain),
    existingOpenSuggestions: existing.slice(0, 20),
  };

  const system = `You are the AI SEO Brain for carrgo.co.uk (UK freight forwarding). You analyse real performance data and output prioritised, specific, actionable recommendations.
Ground every recommendation in the provided data — cite the exact query/page/number that motivates it. Do not invent metrics.
Return STRICT JSON only:
{"summary": "2-3 sentence executive summary", "suggestions": [{"category": "site"|"ranking"|"authority", "title": "...", "detail": "2-4 sentences, specific, with data references and concrete steps", "priority": "high"|"medium"|"low"}]}
Give 3-4 suggestions per category. Avoid duplicating existingOpenSuggestions.`;

  const raw = await llm(system, JSON.stringify(dataPack, null, 1), 6000);
  const parsed = extractJson<IntelResult>(raw);
  if (!parsed || !Array.isArray(parsed.suggestions)) {
    throw new Error('AI returned unparseable intelligence — try again');
  }

  // Persist suggestions
  const created = [];
  for (const s of parsed.suggestions.slice(0, 15)) {
    if (!s.title || !s.detail) continue;
    created.push(await db.suggestion.create({
      data: {
        category: ['site', 'ranking', 'authority'].includes(s.category) ? s.category : 'site',
        title: String(s.title).slice(0, 200),
        detail: String(s.detail).slice(0, 2000),
        priority: ['high', 'medium', 'low'].includes(s.priority) ? s.priority : 'medium',
        source: 'ai-brain',
        dataJson: JSON.stringify({ generatedAt: new Date().toISOString() }),
      },
    }));
  }
  await logActivity('intelligence', `AI SEO Brain generated ${created.length} suggestions from live GSC/GA4/audit data`);

  return { summary: parsed.summary || '', suggestions: created.map(c => ({ category: c.category as never, title: c.title, detail: c.detail, priority: c.priority as never })) };
}

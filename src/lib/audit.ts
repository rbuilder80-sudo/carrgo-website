import { fetchText, ensureUrl } from './http';

export type CheckResult = {
  id: string;
  category: string;
  title: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
  weight: number;
};

function extractMeta(html: string, name: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractCanonical(html: string): string | null {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m ? m[1] : null;
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractH1s(html: string): string[] {
  const out: string[] = [];
  const re = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text) out.push(text);
  }
  return out;
}

function extractLinks(html: string, baseUrl: string): { internal: string[]; external: string[] } {
  const internal: string[] = [];
  const external: string[] = [];
  const re = /<a[^>]+href=["']([^"'#]+)["']/gi;
  let m;
  const baseHost = (() => { try { return new URL(baseUrl).host; } catch { return ''; } })();
  while ((m = re.exec(html))) {
    const href = m[1];
    try {
      const abs = new URL(href, baseUrl);
      if (abs.host === baseHost) internal.push(abs.origin + abs.pathname);
      else if (/^https?:/.test(abs.href)) external.push(abs.href);
    } catch { /* skip */ }
  }
  return { internal: [...new Set(internal)], external: [...new Set(external)] };
}

export async function runLiveAudit(rawUrl: string): Promise<{ score: number; grade: string; checks: CheckResult[]; stats: Record<string, unknown> }> {
  const url = ensureUrl(rawUrl);
  const checks: CheckResult[] = [];
  const add = (id: string, category: string, title: string, status: CheckResult['status'], detail: string, weight = 1) =>
    checks.push({ id, category, title, status, detail, weight });

  // 1. Homepage fetch + timing
  const home = await fetchText(url, 20000);
  const httpsOk = url.startsWith('https://') && home.ok;
  add('https', 'Technical', 'HTTPS enabled', httpsOk ? 'pass' : 'fail', httpsOk ? `Site served over HTTPS (HTTP ${home.status})` : 'Site not reachable over HTTPS', 3);
  add('reachable', 'Technical', 'Homepage reachable', home.ok ? 'pass' : 'fail', `HTTP ${home.status} in ${home.ms}ms`, 3);
  add('speed', 'Performance', 'Server response time', home.ms < 800 ? 'pass' : home.ms < 2000 ? 'warn' : 'fail', `${home.ms}ms TTFB measured live`, 2);

  if (!home.ok || !home.body) {
    // Can't continue deeper checks
    const score = Math.round((checks.filter(c => c.status === 'pass').length / checks.length) * 40);
    return { score, grade: gradeFor(score), checks, stats: { url, reachable: home.ok, httpStatus: home.status } };
  }

  const html = home.body;
  const bytes = Buffer.byteLength(html, 'utf8');

  // 2. On-page basics
  const title = extractTitle(html);
  const titleOk = !!title && title.length >= 15 && title.length <= 65;
  add('title', 'On-page', 'Title tag', titleOk ? 'pass' : 'warn', title ? `"${title.slice(0, 80)}" (${title.length} chars)` : 'Missing <title>', 3);

  const desc = extractMeta(html, 'description');
  const descOk = !!desc && desc.length >= 70 && desc.length <= 165;
  add('description', 'On-page', 'Meta description', descOk ? 'pass' : 'warn', desc ? `${desc.length} chars: "${desc.slice(0, 100)}"` : 'Missing meta description', 2);

  const viewport = extractMeta(html, 'viewport');
  add('viewport', 'Mobile', 'Mobile viewport', viewport ? 'pass' : 'fail', viewport ? viewport.slice(0, 60) : 'No viewport meta — poor mobile rendering', 2);

  const canonical = extractCanonical(html);
  add('canonical', 'Technical', 'Canonical URL', canonical ? 'pass' : 'warn', canonical || 'No canonical tag found', 1);

  const og = extractMeta(html, 'og:title');
  const ogDesc = extractMeta(html, 'og:description');
  add('social', 'On-page', 'Open Graph tags', og && ogDesc ? 'pass' : 'warn', og ? 'og:title present' + (ogDesc ? ' + og:description' : '') : 'No Open Graph tags — weak social sharing', 1);

  const h1s = extractH1s(html);
  add('h1', 'On-page', 'H1 heading', h1s.length === 1 ? 'pass' : h1s.length === 0 ? 'fail' : 'warn', h1s.length === 0 ? 'No H1 found' : `${h1s.length} H1: "${h1s[0].slice(0, 60)}"`, 2);

  const imgs = html.match(/<img[^>]*>/gi) || [];
  const imgNoAlt = imgs.filter(t => !/\balt=["'][^"']+["']/i.test(t)).length;
  add('imgalt', 'Accessibility', 'Image alt attributes', imgs.length === 0 ? 'warn' : imgNoAlt === 0 ? 'pass' : imgNoAlt <= imgs.length * 0.2 ? 'warn' : 'fail', imgs.length === 0 ? 'No images found' : `${imgNoAlt}/${imgs.length} images missing alt text`, 1);

  const { internal, external } = extractLinks(html, url);
  add('links', 'Technical', 'Internal linking', internal.length >= 5 ? 'pass' : 'warn', `${internal.length} internal links, ${external.length} external links on homepage`, 1);

  const jsonLd = /application\/ld\+json/i.test(html);
  add('schema', 'Structured data', 'JSON-LD structured data', jsonLd ? 'pass' : 'fail', jsonLd ? 'Schema.org JSON-LD detected' : 'No structured data — missing rich results eligibility', 2);

  add('htmlsize', 'Performance', 'Homepage HTML size', bytes < 150_000 ? 'pass' : bytes < 500_000 ? 'warn' : 'fail', `${Math.round(bytes / 1024)} KB of HTML`, 1);

  const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  add('lang', 'Accessibility', 'Language attribute', langMatch ? 'pass' : 'warn', langMatch ? `lang="${langMatch[1]}"` : 'No lang attribute on <html>', 1);

  // 3. robots.txt
  const robots = await fetchText(new URL('/robots.txt', url).toString());
  const robotsOk = robots.ok && /user-agent/i.test(robots.body);
  add('robots', 'Indexing', 'robots.txt', robotsOk ? 'pass' : 'warn', robotsOk ? `Found (${robots.body.length} bytes)` : 'Missing or invalid robots.txt', 2);
  const sitemapInRobots = robotsOk && /sitemap:/i.test(robots.body);

  // 4. sitemap.xml
  const sitemap = await fetchText(new URL('/sitemap.xml', url).toString());
  const sitemapOk = sitemap.ok && /<(urlset|sitemapindex)/i.test(sitemap.body);
  let sitemapUrls = 0;
  if (sitemapOk) sitemapUrls = (sitemap.body.match(/<loc>/gi) || []).length;
  add('sitemap', 'Indexing', 'XML sitemap', sitemapOk ? 'pass' : 'fail', sitemapOk ? `Valid sitemap with ${sitemapUrls} URLs${sitemapInRobots ? ' (referenced in robots.txt)' : ''}` : 'No valid sitemap.xml', 2);

  // 5. Security headers
  const sec = home.headers;
  const hsts = !!sec['strict-transport-security'];
  add('hsts', 'Security', 'HSTS header', hsts ? 'pass' : 'warn', hsts ? 'Strict-Transport-Security present' : 'No HSTS header', 1);
  const xfo = !!sec['x-frame-options'] || /frame-ancestors/i.test(sec['content-security-policy'] || '');
  add('clickjack', 'Security', 'Clickjacking protection', xfo ? 'pass' : 'warn', xfo ? 'X-Frame-Options or CSP frame-ancestors set' : 'No frame protection header', 1);

  // 6. WWW redirect + trailing consistency (live check)
  try {
    const u = new URL(url);
    const altHost = u.host.startsWith('www.') ? u.host.replace(/^www\./, '') : `www.${u.host}`;
    const alt = await fetchText(`${u.protocol}//${altHost}`, 10000);
    const redirects = alt.finalUrl && new URL(alt.finalUrl).host === u.host;
    add('wwwredirect', 'Technical', 'WWW canonicalisation', redirects ? 'pass' : 'warn', redirects ? `${altHost} redirects to ${u.host}` : `${altHost} does not redirect to preferred host — duplicate content risk`, 1);
  } catch {
    add('wwwredirect', 'Technical', 'WWW canonicalisation', 'warn', 'Alternative host unreachable', 1);
  }

  // 7. Sample 3 internal pages for status
  const samples = internal.filter(l => l !== new URL(url).origin + '/').slice(0, 3);
  let sampleOk = 0;
  const sampleResults: Array<{ url: string; status: number; ms: number }> = [];
  for (const s of samples) {
    const r = await fetchText(s, 12000);
    if (r.ok) sampleOk++;
    sampleResults.push({ url: s, status: r.status, ms: r.ms });
  }
  if (samples.length > 0) {
    add('deepfetch', 'Technical', 'Key pages crawlable', sampleOk === samples.length ? 'pass' : sampleOk > 0 ? 'warn' : 'fail', `${sampleOk}/${samples.length} sampled pages returned HTTP 200`, 2);
  }

  // Score: weighted
  const totalWeight = checks.reduce((a, c) => a + c.weight, 0);
  const got = checks.reduce((a, c) => a + (c.status === 'pass' ? c.weight : c.status === 'warn' ? c.weight * 0.5 : 0), 0);
  const score = Math.round((got / totalWeight) * 100);

  return {
    score,
    grade: gradeFor(score),
    checks,
    stats: {
      url,
      httpStatus: home.status,
      ttfbMs: home.ms,
      htmlBytes: bytes,
      title, description: desc, canonical, h1Count: h1s.length,
      internalLinks: internal.length,
      externalLinks: external.length,
      images: imgs.length,
      imagesMissingAlt: imgNoAlt,
      hasJsonLd: jsonLd,
      sitemapUrls,
      sampledPages: sampleResults,
    },
  };
}

export function gradeFor(score: number): string {
  return score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
}

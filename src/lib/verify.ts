import { fetchText } from './http';

// Evidence gate: verify a "published" URL actually exists publicly and looks like the content we published.
export async function verifyPublishedUrl(publishedUrl: string, expectedTitle: string): Promise<{ verified: boolean; detail: string; httpStatus: number }> {
  if (!/^https?:\/\//i.test(publishedUrl)) {
    return { verified: false, detail: 'Not a valid URL', httpStatus: 0 };
  }
  const r = await fetchText(publishedUrl, 20000);
  if (!r.ok) {
    return { verified: false, detail: `Live fetch returned HTTP ${r.status || 'error'}`, httpStatus: r.status };
  }

  const body = r.body || '';
  const slug = expectedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  const urlOk = slug.length > 8 && r.finalUrl.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(slug.slice(0, 20));
  const canonicalMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const titleMatch = body.match(/<title[^>]*>([^<]*)<\/title>/i);
  const pageTitle = (titleMatch?.[1] || '').toLowerCase();
  const expectedWords = expectedTitle.toLowerCase().split(/\s+/).filter(w => w.length > 3).slice(0, 4);
  const titleWordsHit = expectedWords.filter(w => pageTitle.includes(w)).length;

  if (urlOk) return { verified: true, detail: `URL slug matches expected content slug (HTTP ${r.status})`, httpStatus: r.status };
  if (canonicalMatch && canonicalMatch[1] && canonicalMatch[1].toLowerCase().includes(slug.slice(0, 20))) {
    return { verified: true, detail: 'Canonical URL on live page matches expected slug', httpStatus: r.status };
  }
  if (titleWordsHit >= Math.min(2, expectedWords.length)) {
    return { verified: true, detail: `Live page title contains ${titleWordsHit}/${expectedWords.length} expected title words (HTTP ${r.status})`, httpStatus: r.status };
  }

  return {
    verified: false,
    detail: `Page loads (HTTP ${r.status}) but content signature not confirmed — slug match: ${urlOk}, title words: ${titleWordsHit}/${expectedWords.length}`,
    httpStatus: r.status,
  };
}

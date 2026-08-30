export const FETCH_TIMEOUT = 15000;

export async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = FETCH_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CarrgoSEOBot/1.0; +https://carrgo.co.uk)',
        ...(init.headers || {}),
      },
      ...init,
    });
  } finally {
    clearTimeout(t);
  }
}

export async function fetchText(url: string, initOrTimeout: RequestInit | number = {}, timeoutMsArg?: number): Promise<{ ok: boolean; status: number; body: string; ms: number; finalUrl: string; headers: Record<string, string> }> {
  const init: RequestInit = typeof initOrTimeout === 'number' ? {} : initOrTimeout;
  const timeoutMs = timeoutMsArg ?? (typeof initOrTimeout === 'number' ? initOrTimeout : FETCH_TIMEOUT);
  const start = Date.now();
  try {
    const res = await fetchWithTimeout(url, init, timeoutMs);
    const body = await res.text();
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => (headers[k] = v));
    return { ok: res.ok, status: res.status, body, ms: Date.now() - start, finalUrl: res.url || url, headers };
  } catch (e) {
    return { ok: false, status: 0, body: '', ms: Date.now() - start, finalUrl: url, headers: {} };
  }
}

export function normalizeDomain(input: string): string {
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
  return s;
}

export function ensureUrl(input: string): string {
  const s = input.trim();
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

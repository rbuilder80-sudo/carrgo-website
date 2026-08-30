import { fetchText } from './http';

// Real Google Suggest (public autocomplete endpoint) — live keyword expansions
export async function googleSuggest(seed: string, country = 'uk'): Promise<string[]> {
  const out = new Set<string>();
  const endpoints = [
    `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=${country}&q=${encodeURIComponent(seed)}`,
    `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=${country}&ds=y&q=${encodeURIComponent(seed)}`, // youtube
  ];
  const modifiers = ['', ' uk', ' how', ' best', ' cost', ' near me', ' services', ' vs'];
  const probes = [seed, ...modifiers.slice(1).map(m => seed + m)];

  await Promise.all(
    endpoints.flatMap(ep =>
      probes.map(async q => {
        const url = ep.replace(/q=.*$/, `q=${encodeURIComponent(q)}`);
        const r = await fetchText(url, 8000);
        if (!r.ok || !r.body) return;
        try {
          const arr = JSON.parse(r.body);
          if (Array.isArray(arr) && Array.isArray(arr[1])) {
            arr[1].forEach((s: string) => {
              if (typeof s === 'string') out.add(s.toLowerCase().trim());
            });
          }
        } catch { /* ignore malformed */ }
      })
    )
  );
  return [...out].filter(s => s.length > 2).slice(0, 60);
}

// Very light heuristic difficulty (0-100) derived from term properties — deterministic, not random
export function estimateDifficulty(term: string): number {
  const words = term.split(/\s+/).length;
  let d = 90 - Math.min(words, 8) * 6; // longer = easier
  if (/best|top|cheap/i.test(term)) d += 8;
  if (/how|what|why|guide|complete/i.test(term)) d -= 6;
  if (/near me|services/i.test(term)) d += 4;
  return Math.max(5, Math.min(95, d));
}

// Deterministic intent classification
export function classifyIntent(term: string): string {
  if (/how|what|why|guide|complete|meaning|explained/i.test(term)) return 'informational';
  if (/best|top|vs|review|compare/i.test(term)) return 'commercial';
  if (/quote|price|cost|hire|book|get/i.test(term)) return 'transactional';
  if (/near me|in uk|london|manchester|birmingham/i.test(term)) return 'local';
  return 'informational';
}

// Estimated relative volume from suggestion rank position (Google ranks suggestions by popularity)
export function estimateVolume(term: string, rank: number): number {
  const words = term.split(/\s+/).length;
  const base = Math.max(20, 2400 / (rank + 1) ** 1.35);
  return Math.round(base * (1 - Math.min(words, 10) * 0.04));
}

export async function researchKeywords(seed: string, country = 'uk') {
  const suggestions = await googleSuggest(seed, country);
  const seen = new Set<string>();
  const results: Array<{ term: string; source: string; estVolume: number; difficulty: number; intent: string }> = [];
  suggestions.forEach((term, i) => {
    if (seen.has(term) || term === seed.toLowerCase()) return;
    seen.add(term);
    results.push({
      term,
      source: 'suggest',
      estVolume: estimateVolume(term, i),
      difficulty: estimateDifficulty(term),
      intent: classifyIntent(term),
    });
  });
  results.sort((a, b) => b.estVolume - a.estVolume);
  return results.slice(0, 40);
}

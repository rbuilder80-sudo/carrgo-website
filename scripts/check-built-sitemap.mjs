import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve(process.argv[2] || 'dist');
const sitemap = readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length > 0, 'Built sitemap must contain URLs');
assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs');
for (const location of urls) {
  const url = new URL(location);
  assert.equal(url.origin, 'https://www.carrgo.co.uk');
  const relative = decodeURIComponent(url.pathname).replace(/^\//, '');
  const target = path.resolve(output, relative.endsWith('/') || !relative ? `${relative}index.html` : relative);
  assert.ok(target.startsWith(output + path.sep), `Path escapes output: ${location}`);
  assert.ok(existsSync(target) && statSync(target).isFile(), `Sitemap URL has no built page: ${location}`);
  const html = readFileSync(target, 'utf8');
  assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html), `Sitemap includes noindex: ${location}`);
  assert.ok(!/<meta[^>]*http-equiv="refresh"/i.test(html), `Sitemap includes redirect: ${location}`);
  assert.equal(html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1], location, `Canonical mismatch: ${location}`);
}
console.log(`Built sitemap checks passed: ${urls.length} unique, indexable pages with matching canonicals and output files.`);

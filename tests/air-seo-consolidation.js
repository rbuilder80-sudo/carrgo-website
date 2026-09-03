import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const failures = [];
const oldPath = '/services/air-cargo/';
const destination = 'https://www.carrgo.co.uk/services/air-freight/';

async function read(path) {
  return readFile(join(root, path), 'utf8');
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['.git', 'assets', 'node_modules'].includes(entry.name)) return htmlFiles(path);
    return entry.isFile() && entry.name.endsWith('.html') ? [path] : [];
  }));
  return nested.flat();
}

const sitemap = await read('sitemap.xml');
const redirects = await read('_redirects');
const air = await read('services/air-freight/index.html');
const oldPage = await read('services/air-cargo/index.html');

if (sitemap.includes(oldPath)) failures.push('sitemap.xml: former Air Cargo URL is still present');
if (!redirects.includes('/services/air-cargo/ /services/air-freight/ 301!')) {
  failures.push('_redirects: missing forced 301 rule for the trailing-slash Air Cargo URL');
}
if (!air.includes(`<link rel="canonical" href="${destination}"`)) {
  failures.push('services/air-freight/index.html: missing preferred self-canonical');
}
if (!air.includes('content="index, follow')) {
  failures.push('services/air-freight/index.html: destination is not explicitly indexable');
}
if (!air.includes('3-7 days')) failures.push('services/air-freight/index.html: missing 3-7 day claim');
if (/1[–-]5 days|3[–-]5 days worldwide|4[–-]8 days/i.test(air)) {
  failures.push('services/air-freight/index.html: contains a conflicting overall or door-to-door transit claim');
}
if (!oldPage.includes(`<link rel="canonical" href="${destination}"`)) {
  failures.push('services/air-cargo/index.html: fallback page does not canonicalise to Air Freight');
}

for (const file of await htmlFiles(root)) {
  if (file.endsWith(join('services', 'air-cargo', 'index.html'))) continue;
  const html = await readFile(file, 'utf8');
  if (new RegExp(`href=["'][^"']*${oldPath.replaceAll('/', '\\/')}`, 'i').test(html)) {
    failures.push(`${file}: contains an internal link to the former Air Cargo URL`);
  }
}

const entryMatch = air.match(/src="\/(assets\/index-[^"]+\.js)"/);
if (!entryMatch) {
  failures.push('services/air-freight/index.html: cannot resolve active application bundle');
} else {
  const entry = await read(entryMatch[1]);
  const chunkMatch = entry.match(/AirFreight-([A-Za-z0-9_-]+)\.js/);
  if (!chunkMatch) {
    failures.push(`${entryMatch[1]}: cannot resolve active Air Freight chunk`);
  } else {
    const chunk = await read(`assets/AirFreight-${chunkMatch[1]}.js`);
    if (!chunk.includes('Door-to-door air freight typically takes 3–7 days')) {
      failures.push('active Air Freight application chunk: missing standard 3–7 day door-to-door claim');
    }
    for (const forbidden of ['1–3 days door-to-door', 'Time-critical delivery in 1–5 days', '3-5 days worldwide']) {
      if (chunk.includes(forbidden)) failures.push(`active Air Freight application chunk: contains ${forbidden}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Air SEO consolidation checks passed.');

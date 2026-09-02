import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const failures = [];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['.git', 'assets', 'node_modules'].includes(entry.name)) return htmlFiles(path);
    return entry.isFile() && entry.name.endsWith('.html') ? [path] : [];
  }));
  return nested.flat();
}

for (const file of await htmlFiles(root)) {
  const html = await readFile(file, 'utf8');
  if (/history\.replaceState\([^)]*['"]\/#/.test(html) || /location\.hash/.test(html)) {
    failures.push(`${file}: contains a hash-route rewrite`);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const hreflang = html.match(/<link rel="alternate" hreflang="en-gb" href="([^"]+)"/i)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/i)?.[1] ?? '';
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];

  if (!canonical) continue;
  if (!robots.includes('noindex') && (!canonical.startsWith('https://www.carrgo.co.uk/') || (canonical !== 'https://www.carrgo.co.uk/' && !canonical.endsWith('/')))) {
    failures.push(`${file}: canonical is not the preferred www trailing-slash URL`);
  }
  if (!robots.includes('noindex') && hreflang !== canonical) {
    failures.push(`${file}: hreflang does not match canonical`);
  }
  if (ogUrl && ogUrl !== canonical) failures.push(`${file}: Open Graph URL does not match canonical`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Crawl integrity checks passed.');

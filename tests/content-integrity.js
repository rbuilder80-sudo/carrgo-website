import { readFile } from 'node:fs/promises';

const root = process.cwd();
const failures = [];

async function read(path) {
  return readFile(`${root}/${path}`, 'utf8');
}

const homepage = await read('index.html');
const quote = await read('get-a-quote/index.html');
const china = await read('routes/china-to-uk/index.html');
const air = await read('services/air-freight/index.html');
const sea = await read('services/sea-freight/index.html');
const rail = await read('services/rail-freight-china-uk/index.html');
const turkey = await read('routes/turkey-to-uk/index.html');
const results = await read('results/index.html');
const testimonials = await read('resources/testimonials/index.html');
const sitemap = await read('sitemap.xml');

function requireText(html, expected, file) {
  if (!html.includes(expected)) failures.push(`${file}: missing ${expected}`);
}

function rejectText(html, forbidden, file) {
  if (html.includes(forbidden)) failures.push(`${file}: still contains ${forbidden}`);
}

requireText(homepage, 'UK Freight Forwarder | International Freight Forwarding | Carrgo', 'index.html');
rejectText(homepage, 'freight quote uk,', 'index.html');
requireText(quote, 'Freight Shipping Quote UK | Get a Quote | Carrgo', 'get-a-quote/index.html');

for (const [file, html] of [
  ['routes/china-to-uk/index.html', china],
  ['services/sea-freight/index.html', sea],
  ['services/rail-freight-china-uk/index.html', rail],
  ['services/air-freight/index.html', air],
]) {
  rejectText(html, '25-35 days', file);
  rejectText(html, '30-40 days', file);
  rejectText(html, '3-5 days', file);
  rejectText(html, '4-8 days', file);
  rejectText(html, '14-20 days', file);
}

requireText(china, '25-40 days', 'routes/china-to-uk/index.html');
requireText(china, '3-7 days door to door', 'routes/china-to-uk/index.html');
requireText(china, '14-22 days', 'routes/china-to-uk/index.html');
requireText(turkey, 'sea freight (14-20 days) and road freight (5-7 days)', 'routes/turkey-to-uk/index.html');

for (const [file, html] of [
  ['results/index.html', results],
  ['resources/testimonials/index.html', testimonials],
]) {
  requireText(html, 'noindex, follow', file);
  requireText(html, 'https://www.carrgo.co.uk/resources/our-process/', file);
  rejectText(html, '500+', file);
  rejectText(html, '99%+', file);
  rejectText(html, '4.9/5', file);
}

rejectText(sitemap, 'https://www.carrgo.co.uk/results/', 'sitemap.xml');
rejectText(sitemap, 'https://www.carrgo.co.uk/resources/testimonials/', 'sitemap.xml');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Content integrity checks passed.');

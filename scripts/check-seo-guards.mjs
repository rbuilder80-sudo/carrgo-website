import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const requireText = (condition, message) => {
  if (!condition) throw new Error(message);
};

const layout = read('src/components/Layout.tsx');
const quoteForm = read('src/components/PortQuoteForm.tsx');

requireText(layout.includes('<PortQuoteForm'), 'Global contextual quote form is missing from Layout');
requireText(layout.includes("'/routes/china-to-uk'"), 'China–UK quote context is missing');
requireText(layout.includes("origin: 'China'"), 'China route origin is not preselected');
requireText(quoteForm.includes('Approximate weight / volume'), 'Quick quote weight/volume field is missing');
requireText(quoteForm.includes('I’m not sure'), 'Quick quote dimensions fallback is missing');
requireText(quoteForm.includes('name="email"'), 'Quick quote contact field is missing');

for (const date of ['2026-08-26', '2026-09-02']) {
  const page = read(`public/resources/uk-port-congestion-report/${date}/index.html`);
  requireText(page.includes('noindex, follow'), `${date} correction must be noindex, follow`);
  requireText(page.includes('Withdrawn on 21 September 2026'), `${date} withdrawal date is missing`);
  requireText(!/average health score|vessels waiting across|4-6 days|77\.4/i.test(page), `${date} still exposes unsupported figures`);
}

for (const sitemap of ['sitemap.xml', 'public/sitemap.xml']) {
  const xml = read(sitemap);
  requireText(!xml.includes('/2026-08-26/'), `${sitemap} includes withdrawn 26 August snapshot`);
  requireText(!xml.includes('/2026-09-02/'), `${sitemap} includes withdrawn 2 September snapshot`);
}

console.log('SEO guards passed');

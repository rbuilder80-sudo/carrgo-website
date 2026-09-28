import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const requireText = (condition, message) => {
  if (!condition) throw new Error(message);
};

const layout = read('src/components/Layout.tsx');
const quoteForm = read('src/components/PortQuoteForm.tsx');
const app = read('src/App.tsx');
const correction = read('src/pages/EvidenceCorrection.tsx');
const about = read('src/pages/About.tsx');
const home = read('src/pages/Home.tsx');
const footer = read('src/components/Footer.tsx');
const navbar = read('src/components/Navbar.tsx');
const generator = read('scripts/generate-static.py');

requireText(layout.includes('<PortQuoteForm'), 'Global contextual quote form is missing from Layout');
requireText(layout.includes("'/routes/china-to-uk'"), 'China–UK quote context is missing');
requireText(layout.includes("origin: 'China'"), 'China route origin is not preselected');
requireText(quoteForm.includes('Approximate weight / volume'), 'Quick quote weight/volume field is missing');
requireText(quoteForm.includes('I’m not sure'), 'Quick quote dimensions fallback is missing');
requireText(quoteForm.includes('name="email"'), 'Quick quote contact field is missing');

requireText(correction.includes('Unverified client claims withdrawn'), 'Evidence correction notice is missing');
requireText(correction.includes('noindex'), 'Evidence correction pages must be noindex');
requireText(app.includes('path="/results"') && app.includes('path="/resources/case-studies"') && app.includes('path="/resources/testimonials"'), 'Withdrawn client-claim URLs must remain available as correction notices');

const unsupportedTrustClaims = /BIFA|IATA|AEO Certified|500\+|99\.2|99%\+|30\+ years|over two decades/i;
for (const [path, content] of [
  ['src/pages/About.tsx', about],
  ['src/pages/Home.tsx', home],
  ['src/components/Footer.tsx', footer],
]) {
  requireText(!unsupportedTrustClaims.test(content), `${path} exposes an unsupported trust or performance claim`);
}

for (const url of ['/resources/case-studies', '/resources/testimonials', '/results']) {
  requireText(generator.includes(`"${url}": {`), `${url} correction metadata is missing from static generation`);
  requireText(!navbar.includes(`href="${url}"`) && !footer.includes(`href="${url}"`), `${url} remains in primary navigation`);
}

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
  requireText(!xml.includes('/resources/case-studies/'), `${sitemap} includes withdrawn case studies`);
  requireText(!xml.includes('/resources/testimonials/'), `${sitemap} includes withdrawn testimonials`);
  requireText(!xml.includes('/results/'), `${sitemap} includes withdrawn results page`);
}

console.log('SEO guards passed');

import { readFileSync, readdirSync } from 'node:fs';

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
const contact = read('src/pages/Contact.tsx');
const getAQuote = read('src/pages/GetAQuote.tsx');
const terms = read('src/pages/Terms.tsx');
const privacy = read('src/pages/Privacy.tsx');

const sourceFiles = (directory) => readdirSync(new URL(`../${directory}`, import.meta.url), { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory()
    ? sourceFiles(`${directory}/${entry.name}`)
    : entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')
      ? [`${directory}/${entry.name}`]
      : []);
const commercialSource = [...sourceFiles('src'), 'scripts/generate-static.py']
  .map((path) => `${path}\n${read(path)}`)
  .join('\n');

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

const unsupportedCommercialClaims = /(quote|quotes|respond|response|price)[^.\n]{0,60}(within|in)\s+(two|2)\s*hours?|(?:two|2)[-\s]*hour[^.\n]{0,40}(quote|response)|1 hour 42|up to 22%|HMRC Registered|447700123456|International Trade Centre|EC2A 4BX|Carrgo Freight Solutions Ltd/i;
requireText(!unsupportedCommercialClaims.test(commercialSource), 'Source exposes an unsupported response, performance, contact or legal-entity claim');

for (const [path, content] of [
  ['src/pages/Contact.tsx', contact],
  ['src/pages/GetAQuote.tsx', getAQuote],
  ['src/pages/Terms.tsx', terms],
  ['src/pages/Privacy.tsx', privacy],
  ['src/components/Footer.tsx', footer],
]) {
  requireText(content.includes('CARRGO FREIGHT LTD'), `${path} is missing the verified legal entity`);
}
requireText(contact.includes("identifier: '17480219'"), 'Contact schema is missing the verified company number');
requireText(contact.includes("streetAddress: '66 Paul Street'"), 'Contact schema is missing the verified registered office');
requireText(getAQuote.includes('name="origin-country"') && getAQuote.includes('name="dest-country"'), 'Quote form origin or destination field is missing');
requireText(getAQuote.includes('name="cargo"') && getAQuote.includes('name="weight"') && getAQuote.includes('name="volume"'), 'Quote form cargo, weight or volume field is missing');
requireText(getAQuote.includes('name="name"') && getAQuote.includes('name="email"') && getAQuote.includes('name="phone"'), 'Quote form contact fields are missing');
requireText(!generator.includes('<meta name="last-modified" content="2026-07-15"'), 'Static generator exposes a fabricated shared last-modified date');

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

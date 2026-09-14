#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputRoot = resolve(process.argv[2] || 'dist');
const ports = [
  ['felixstowe', 'Felixstowe', 'England'], ['southampton', 'Southampton', 'England'],
  ['london-gateway', 'London Gateway', 'England'], ['liverpool', 'Liverpool', 'England'],
  ['bristol', 'Bristol', 'England'], ['tilbury', 'Tilbury', 'England'],
  ['immingham', 'Immingham', 'England'], ['grangemouth', 'Grangemouth', 'Scotland'],
  ['holyhead', 'Holyhead', 'Wales'], ['belfast', 'Belfast', 'Northern Ireland'],
  ['larne', 'Larne', 'Northern Ireland'], ['londonderry', 'Londonderry', 'Northern Ireland'],
  ['dublin', 'Dublin', 'Ireland'], ['cork', 'Cork', 'Ireland'],
  ['rosslare-europort', 'Rosslare Europort', 'Ireland'], ['shannon-foynes', 'Shannon Foynes', 'Ireland'],
  ['waterford', 'Waterford', 'Ireland'],
];

const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const styles = `body{margin:0;color:#111827;background:#fff;font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}a{color:#0b57d0}.wrap{max-width:1040px;margin:auto;padding:28px 20px 96px}nav{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:32px}.hero{background:#1a6dff;color:#fff;padding:44px 20px}.hero>div{max-width:1040px;margin:auto}.hero h1{margin:0;font-size:clamp(2rem,5vw,3.3rem);line-height:1.15}.hero p{max-width:760px}.warning{margin:28px 0;padding:20px;border:1px solid #f3c66b;border-left:5px solid #b45309;background:#fffbeb;border-radius:10px}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.card{padding:18px;border:1px solid #e5e7eb;border-radius:12px;background:#f8fafc}table{width:100%;border-collapse:collapse}th,td{padding:11px;border:1px solid #d1d5db;text-align:left}.unknown{display:inline-block;padding:3px 9px;border-radius:99px;background:#e5e7eb;font-weight:700}.quote{position:fixed;right:16px;top:86px;z-index:30;width:320px;max-height:calc(100vh - 105px);overflow:auto;box-sizing:border-box;background:#fff;border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 24px 60px #0f172a33;padding:16px}.quote h2{margin:3px 0;font-size:20px}.quote p{font-size:12px}.quote form{display:grid;gap:8px}.quote label{display:grid;gap:3px;font-size:12px;font-weight:700}.quote input,.quote button{box-sizing:border-box;min-height:43px;width:100%;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font:16px system-ui}.quote button{border:0;background:#1a6dff;color:#fff;font-weight:800}.mobile-quote{display:none}@media(min-width:1180px){main{padding-right:350px}}@media(max-width:1179px){.quote{display:none}.mobile-quote{display:block;position:fixed;left:12px;right:12px;bottom:12px;z-index:30;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 20px 55px #0f172a3d;max-height:82vh;overflow:auto}.mobile-quote summary{cursor:pointer;display:flex;justify-content:space-between;gap:10px;padding:15px;background:#1a6dff;color:#fff;border-radius:16px;font-weight:800}.mobile-quote .body{padding:14px}.mobile-quote form{display:grid;gap:9px}.mobile-quote label{display:grid;gap:3px;font-size:12px;font-weight:700}.mobile-quote input,.mobile-quote button{min-height:44px;border:1px solid #d1d5db;border-radius:8px;padding:8px;font:16px system-ui}.mobile-quote button{background:#1a6dff;color:#fff;border:0;font-weight:800}}`;

function fields(destination, source) {
  return `<form action="https://formsubmit.co/support@carrgo.co.uk" method="POST"><input type="hidden" name="_subject" value="Port shipment quote request"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="source_page" value="${esc(source)}"><label>Origin<input required name="origin" placeholder="City, country or supplier"></label><label>Destination<input required name="destination" value="${esc(destination)}"></label><label>Goods<input required name="goods" placeholder="Furniture, cartons, machinery"></label><label>Approximate weight / volume<input required name="weight_volume" placeholder="600 kg / 4 CBM"></label><label>Dimensions<input name="dimensions" placeholder="Size or I’m not sure"></label><label>Name<input required name="name" autocomplete="name"></label><label>Email<input required type="email" name="email" autocomplete="email"></label><label>Phone / WhatsApp<input type="tel" name="phone" autocomplete="tel"></label><button type="submit">Request a freight quote</button></form>`;
}

function quote(title, destination, source) {
  const form = fields(destination, source);
  return `<aside class="quote" aria-label="Quick freight quote"><strong>2-minute quote</strong><h2>${esc(title)}</h2><p>Send the basics now. Extra shipment details can follow after the enquiry arrives.</p>${form}</aside><details class="mobile-quote"><summary>${esc(title)} <span>Open</span></summary><div class="body">${form}</div></details>`;
}

function shell({ title, description, canonical, heading, intro, body, quoteTitle, destination, source }) {
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: heading, description, url: canonical, dateModified: '2026-09-14', isPartOf: { '@type': 'WebSite', name: 'Carrgo', url: 'https://www.carrgo.co.uk/' } });
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"><link rel="canonical" href="${canonical}"><script type="application/ld+json">${schema}</script><style>${styles}</style></head><body><main><section class="hero"><div><h1>${esc(heading)}</h1><p>${esc(intro)}</p></div></section><div class="wrap"><nav aria-label="Breadcrumb"><a href="/">Home</a><a href="/resources/port-congestion-tracker/">Port evidence tracker</a><a href="/resources/uk-port-congestion-report/">Weekly report</a></nav>${body}</div></main>${quote(quoteTitle, destination, source)}</body></html>`;
}

async function output(relative, html) {
  const directory = resolve(outputRoot, relative);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html, 'utf8');
}

const rows = ports.map(([slug, name, area]) => `<tr><th scope="row"><a href="/ports/${slug}/">${name}</a></th><td>${area}</td><td><span class="unknown">Unknown</span></td><td>See dated notices and limitations in the tracker.</td></tr>`).join('');
await output('tools/port-comparison', shell({
  title: 'UK & Ireland Port Evidence Comparison | Carrgo',
  description: 'Compare evidence coverage for 17 UK and Ireland ports. Unverified waiting times, queues, berth utilisation, scores and forecasts are shown as unknown.',
  canonical: 'https://www.carrgo.co.uk/tools/port-comparison/', heading: 'UK & Ireland Port Evidence Comparison',
  intro: 'Compare what Carrgo can substantiate for 17 ports. This is an evidence-availability table, not a congestion ranking.',
  body: `<section class="warning"><h2>Current numerical measurements are unverified</h2><p>Carrgo withholds untraceable health scores, waiting times, vessel queues, berth utilisation and forecasts. Unknown does not mean normal operations.</p></section><div style="overflow:auto"><table><caption>Evidence availability for Carrgo’s 17-port coverage</caption><thead><tr><th>Port</th><th>Area</th><th>Current metrics</th><th>Evidence</th></tr></thead><tbody>${rows}</tbody></table></div><h2>Methodology</h2><p>A local operating restriction or weather warning is not treated as a port-wide congestion measurement. Missing measurements remain unknown and no ranking or forecast is generated.</p><p><a href="/resources/port-congestion-tracker/">Check the current evidence ledger</a>.</p>`,
  quoteTitle: 'Ask about your shipment through a UK or Ireland port', destination: 'UK or Ireland port', source: '/tools/port-comparison/',
}));

for (const [slug, name, area] of ports) {
  await output(`ports/${slug}`, shell({
    title: `${name} Port Status Evidence | Carrgo`,
    description: `Evidence-led ${name} port status page. Unverified waiting times, vessel queues, berth utilisation, scores and forecasts remain unknown.`,
    canonical: `https://www.carrgo.co.uk/ports/${slug}/`, heading: `${name} port status`,
    intro: `${area} port evidence for importers. Current numerical congestion measurements remain unknown.`,
    body: `<section class="warning"><h2>Current congestion measurements: unknown</h2><p>No comparable, timestamped primary measurement has been verified for ${name} port-wide waiting time, vessel queues, berth utilisation or congestion. Unknown does not mean normal operations.</p></section><h2>Questions to confirm before booking or collection</h2><div class="cards"><div class="card">Is the vessel booking and terminal receiving window confirmed?</div><div class="card">Are gate-in, release and collection appointments available?</div><div class="card">Does a dated notice affect the relevant berth, lock or access route?</div><div class="card">Has the carrier issued a shipment-specific schedule or cut-off change?</div><div class="card">Are customs documents and importer details complete?</div><div class="card">What free time and demurrage or detention terms apply?</div></div><h2>Sources and limitations</h2><p>Carrgo’s tracker is a public-source evidence review, not an AIS or terminal feed. Local notices are not converted into numerical scores or delay forecasts.</p><p><a href="/resources/port-congestion-tracker/">Check dated port evidence</a> · <a href="/tools/port-comparison/">Compare evidence coverage</a></p>`,
    quoteTitle: `Ask about your shipment through ${name}`, destination: name, source: `/ports/${slug}/`,
  }));
}

console.log(`Generated ${ports.length + 1} standalone evidence pages in ${outputRoot}`);

# SEO growth sprint — 2026-10-26

## Selected opportunity

The customs-clearance service page is a high-intent commercial landing page, but its prior copy contained claims that were not supported by repository evidence: `100% compliance`, `HMRC-authorised brokers`, use of `our own` duty-deferment facility, staff registration/training claims and guaranteed-cost language. The page was therefore improved before lower-impact content expansion.

## Implemented changes

- Rebuilt `/services/customs-clearance/` around a shipment-information checklist, declaration scope, limitations, official guidance and a customs-specific quote path.
- Removed unsupported authorisation, facility, outcome and expertise claims from both the React page and its crawlable static HTML.
- Added primary GOV.UK sources for CDS, customs intermediaries, the UK Trade Tariff, EORI and postponed VAT accounting.
- Added accessible checklist and FAQ content, matching structured data, a self-canonical and contextual links to commodity-code, Incoterms, sea-freight and road-freight pages.
- Made approximate weight/volume required in the global quick-quote form and added a packed-dimensions field with an `I'm not sure` option. This preserves the existing origin, destination, goods and contact fields.
- Added regression guards for the removed customs claims, required primary sources and quote-form fields.
- Updated the customs page sitemap `lastmod` to 2026-10-26. Existing URLs were preserved; `/services/air-cargo/` still redirects to `/services/air-freight/`.

## Evidence

- https://www.gov.uk/government/collections/customs-declaration-service
- https://www.gov.uk/guidance/appoint-someone-to-deal-with-customs-on-your-behalf
- https://www.gov.uk/trade-tariff
- https://www.gov.uk/eori
- https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return

## Validation before publication

- `npm run check:seo`: passed, including eight no-send form-delivery scenarios.
- `npm run build`: passed; 227 static HTML files generated and 89 unique indexable sitemap URLs validated.
- Changed-page assertions: primary-source links, unsupported-claim removal, sitemap date and air-cargo redirect passed. The generated customs canonical is self-referencing and the noscript HTML contains substantive customs information.
- Repository-wide lint: 48 errors and one warning remain across pre-existing components and pages. The changed quote component already carried its reported effect/catch lint debt; the customs page and generator compile and build successfully.
- Existing live SaaS regression suite: 10 passed, four unrelated legacy checks failed (two absent article URLs, stale engine heartbeat and an undefined `overall` field in `health.json`).
- PageSpeed lab observations, not field Core Web Vitals: desktop LCP 1.1 s and TBT 50 ms; mobile LCP 4.4 s and TBT 0 ms. Mobile render delay and approximately 104 KB of unused JavaScript remain a later performance opportunity.

## Search and distribution outcome review

- Public searches found Carrgo's 23 October report and current Carrgo service/resource pages, but no independently verifiable third-party publication or attribution link for the latest edition. This is a limited public-search observation, not Search Console, backlink or ranking data.
- Status for the latest report remains: Carrgo-published and live; external submission, acceptance and publication are unknown. The authorised `support@carrgo.co.uk` mailbox/send-as identity is not available in the connected account, so private editorial replies and opt-outs were not accessed and no outreach was sent.

## Earned-link opportunities — drafts only, not sent

1. **Logistics Manager** — official press-release newsdesk: https://www.logisticsmanager.com/contact-us/ . Audience fit: UK logistics decision-makers and an active multimodal-freight section. Tailored draft: “Carrgo's 23 October UK and Ireland port evidence report separates verified operational notices from unavailable congestion measurements. It records Liverpool, Belfast and weather context across 17 ports while withholding numerical rankings where comparable queue or berth data could not be substantiated. If useful to readers, the dated report and reusable evidence extract are available at https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-23/ and https://www.carrgo.co.uk/data/port-evidence/2026-10-23.csv. Please attribute Carrgo's report if used.”
2. **Shipping and Freight Resource** — its public guest-author guidance invites practical shipping, freight, customs and port experience: https://www.shippingandfreightresource.com/be-a-guest-author-for-shipping-and-freight-resource/ . Audience fit: freight practitioners who can reuse the transparent evidence method. Tailored draft: “Proposed practitioner article: how importers should read port-congestion claims when comparable queue, waiting-time and berth data are unavailable. Carrgo can contribute a methodology-led piece using its 17-port UK and Ireland evidence ledger, clearly separating primary notices, weather context, unknown measurements and operational advice, with the dated evidence extract linked as the source.”

No paid press-release route is recommended. The Loadstar's company-notice service currently states a £50 fee, so it is excluded from free earned-link activity: https://theloadstar.com/press-releases/

## Differentiated asset proposal

Defer until the next scoped build: an importer customs-readiness preflight that asks for the declaration inputs listed on the improved page, marks missing facts as unknown and links each result to the relevant GOV.UK source. It should not calculate duty or promise clearance without traceable tariff inputs. This adds practical utility beyond Carrgo's existing cost calculator and static guides.

## Publication status

- Drafted and tested locally: complete.
- Committed: complete in `c1ecdf6847b46bb1377f2845228c8186564ec385`; exact large-file restoration in `1f17e39b2cb7a9207e64810f6f15cc850c730949`.
- Deployment: successful through the established GitHub Pages workflow, run `40353272793`. An earlier run (`40352868643`) failed because the static generator blob was incompletely transferred during publication; the full exact file was restored before the successful run.
- Live verification: passed. `/services/customs-clearance/` returned HTTP 200 with the new title, description, visible checklist, official GOV.UK citations, self-canonical, indexable robots directive, Service and FAQPage data and customs-specific quote heading. The live quote form requires origin, destination, goods, approximate weight/volume, name and email, and exposes the dimensions `I'm not sure` option. The live sitemap contains the customs URL with `lastmod` 2026-10-26; robots.txt names the regular and news sitemaps; `/services/air-cargo/` resolves in the browser to `/services/air-freight/`.

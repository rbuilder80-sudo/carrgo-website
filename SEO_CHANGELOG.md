# SEO change and outcome log

## 5 October 2026 — legal entity and quote-claim correction

### Public evidence reviewed

- The official Companies House record identifies the active company as CARRGO FREIGHT LTD, company number 17480219, with its registered office at 66 Paul Street, London, England, EC2A 4NA: https://find-and-update.company-information.service.gov.uk/company/17480219
- Carrgo's public home, contact, quote and service pages still exposed an unsupported two-hour quote-response promise. The repository contained no response-time measurement or service commitment that substantiated it.
- The contact page also exposed a placeholder WhatsApp number, opening hours, map coordinates and a different office address without supporting business records.

### Shipped correction

- Aligned the legal entity across page copy, legal pages, footer, Organization schema and static HTML generation.
- Updated the legal pages' visible revision date to the actual date of this substantive company-identity correction.
- Removed the unsupported two-hour response promise across source and generated metadata while preserving route transit-time statements.
- Rebuilt the quote and contact copy around shipment-specific review, retained the high-intent quote forms and removed unverified contact methods and LocalBusiness fields.
- Removed the fabricated shared July `last-modified` and `date` meta tags from generated pages.
- Added repository guards against reintroducing the old legal name, placeholder contact details, unsupported response/performance claims or missing quote-form fields.

### Outcome and limitations

- This is a factual-integrity and conversion-trust correction. It does not claim ranking, traffic, authority, response-time or enquiry gains.
- Existing search snippets may retain the old wording until recrawled. No Search Console submission, Indexing API call or retired sitemap ping was used.
- Private Friday-distribution outcomes remain unknown because `support@carrgo.co.uk` is not available as an authenticated connected mailbox. No outreach or follow-up was sent.

## 28 September 2026 — evidence and trust correction

### Public evidence reviewed

- Public search results still exposed Carrgo pages claiming BIFA and IATA accreditation, 30+ years' experience, 500+ importers, a 4.9/5 rating, 99%+ performance and named client outcomes.
- The official BIFA member-search route and IATA cargo information were checked, but the repository contained no traceable evidence supporting those claims or permission to publish the named testimonials and case studies.
- Carrgo's 25 September port report and evidence-led tracker remained the current valid resources. No public evidence justified changing their congestion measurements from unknown.

### Shipped correction

- Replaced `/results/`, `/resources/case-studies/` and `/resources/testimonials/` with transparent, self-canonical, `noindex, nofollow` correction notices instead of deleting the URLs.
- Removed the withdrawn pages from navigation, the AI sitemap, `llms.txt` and both XML sitemap sources.
- Rewrote About-page claims around verifiable service scope and process, without unverified company history, accreditations, staffing or performance statistics.
- Removed unsupported customer totals, success rates, network totals, awards/accreditations and named outcomes from the home, service and route content touched by this correction.
- Preserved the global contextual quote form on every affected route and added an explicit quote path to the correction notice.
- Added regression guards so the withdrawn claims and URLs are not silently restored to navigation or sitemaps.

### Outcome and limitations

- This is a factual-integrity and conversion-trust correction. It does not claim ranking, traffic, authority or enquiry gains.
- Search-engine snippets may continue to show cached wording until the pages are recrawled; no indexing API or retired sitemap-ping endpoint was used.
- Reinstating any accreditation, testimonial, case study or quantified performance claim requires traceable evidence and publication permission.
- Private Friday-distribution outcomes remain unknown because `support@carrgo.co.uk` is not available as an authenticated connected mailbox. No outreach or follow-up was sent in this run.

# 5 October 2026 — production app-shell cache integrity

- Publish the generated JavaScript and CSS module graph in one content-addressed directory so CDN caches cannot combine chunks from different builds.
- Added an automated source guard for the content-addressed asset rule.
- Added explicit self-canonicals to the privacy and terms pages so React hydration cannot overwrite their generated canonical URLs with the homepage.

## 19 October 2026 — cargo shipping page evidence-path improvement

### Evidence reviewed

- Ubersuggest UK organic data showed Carrgo with 57 tracked organic keywords but only 2 estimated organic visits; the commercial keyword “cargo shipping company uk” was reported at position 24 for the homepage (data returned 19 October 2026). This is directional third-party data, not Search Console or a ranking guarantee.
- Public search results currently surface the homepage for that query, while the dedicated cargo shipping company page (https://www.carrgo.co.uk/cargo-shipping-company/) was not shown in the focused result set.
- The dedicated page already had a shipment-specific quote CTA and service links, but no contextual link to Carrgo's dated port-evidence resource in its main content.

### Shipped change

- Added a factual “Check current port notices for your shipment” section to the existing cargo shipping page.
- Linked the page to the port-evidence tracker and retained a page-matched shipment enquiry CTA.
- Aligned source-level canonical and Service-schema URLs to the published trailing-slash URL.
- Added guards for the canonical, evidence link and contextual section.
- Corrected the static generator override used by the deployed HTML, which is separate from the React route source, and guarded that output as well.
- Updated both sitemap sources' truthful lastmod for the substantive page improvement.

### Outcome and limitations

- This improves internal topical context and crawl paths for an existing commercial page; it does not claim ranking, traffic, authority or enquiry gains.
- The tracker states operational evidence and withholds unsupported queue, waiting-time and berth-utilisation measurements; the new copy makes the same distinction.
- No air-cargo URL consolidation or transit-time claim was changed. No outreach was sent; the authorised support@carrgo.co.uk mailbox remains unverified.


## 2026-10-20 — port evidence integrity update

- Public-source review checked Liverpool, Dublin and Belfast official notice indexes plus Met Office shipping and inshore forecasts at `2026-10-20T08:35:42+01:00` BST.
- Belfast’s index now lists Notice 27/2026 (ploughing operations); Liverpool Notice 70 remains current for Alfred Lock closures on 22 October; Dublin Notice 49 remains the latest listed port notice.
- The dated ledger and tracker continue to report 17-port coverage with all unsupported numerical congestion, queue, waiting-time and berth-utilisation fields as unknown/null.
- No port-wide comparable congestion measurement was found; weather and local navigation notices are retained only as operational context.

## 2026-10-21 — port weather evidence update

- Rechecked the official Liverpool, Dublin and Belfast notice indexes at `2026-10-21T08:37:12+01:00`; their latest listed notices remain Liverpool 70/2026, Dublin 49/2026 and Belfast 27/2026.
- Recorded the Met Office shipping forecast issued at 04:05 UTC: formal gale warnings cover the Irish Sea, Shannon and Malin, including severe-gale-force 9 wording for the Irish Sea and Shannon.
- Recorded the 06:00 UTC inshore forecast’s strong-wind warnings for relevant Irish Sea and Northern Ireland coastal sectors.
- Preserved 17-port coverage and all unsupported queue, waiting-time, berth-utilisation, score and forecast fields as unknown/null. Weather warnings remain operational context, not congestion measurements.

## 2026-10-22 — port notice and severe-weather evidence update

- Rechecked the official Liverpool, Dublin and Belfast notice indexes at `2026-10-22T08:46:54+01:00`; Liverpool Notice 70 remains latest, Dublin Notice 49 remains latest, and Belfast added Notice 28/2026 for a temporary no-wake zone in D1 and D3.
- Recorded Liverpool Notice 70’s two Alfred Lock closure tides on 22 October and its stated withdrawal time on 23 October, unless amended.
- Recorded the 04:05 UTC Met Office shipping forecast: formal gale warnings cover the Irish Sea and Shannon, with severe-gale-force 9 expected later in the Irish Sea and violent-storm-force 11 later in Shannon. Malin has no formal gale-warning heading in this issue.
- Recorded the 06:00 UTC inshore forecast’s strong-wind warnings for the reviewed Irish Sea and Northern Ireland sectors.
- Preserved 17-port coverage and all unsupported queue, waiting-time, berth-utilisation, score and forecast fields as unknown/null. Notices and weather warnings remain operational context, not congestion measurements.

## 2026-10-23 — Langton Lock and marine-weather evidence update

- Added Liverpool Notice 71/2026: Langton Lock is scheduled closed from 12:00 on 24 October to 22:00 on 25 October to protect the outer caisson from heavy swell expected with Storm Boelo. Suitable vessels may use Hornby Passage and Gladstone Lock subject to Dockmaster consultation.
- Recorded that Notice 70’s stated Alfred Lock window ended at 06:56 on 23 October unless amended; elapsed time is not treated as reopening confirmation.
- Rechecked Dublin and Belfast notice indexes; Notice 49 and Notice 28 remain latest respectively.
- Recorded the 04:05 UTC shipping forecast’s Irish Sea and Shannon gale warnings and the 06:00 UTC inshore strong-wind warnings. Weather remains operational context, not congestion evidence.
- Preserved 17-port coverage and all unsupported queue, waiting-time, berth-utilisation, score and forecast fields as unknown/null.

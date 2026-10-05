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

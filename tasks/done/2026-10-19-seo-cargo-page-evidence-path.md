# Carrgo SEO growth sprint — cargo shipping page evidence path — 19 October 2026

## Decision

The highest-impact scoped change was to improve the existing commercial cargo shipping page rather than create another landing page. Ubersuggest's UK data returned 57 organic keywords and 2 estimated organic visits for Carrgo; its commercial query record for “cargo shipping company uk” placed the homepage at 24. Public search currently showed the homepage, not the dedicated cargo page, for the focused query.

## Shipped

- Added a factual contextual section linking the cargo shipping page to the dated UK and Ireland port-evidence tracker.
- Retained a page-matched shipment quote CTA next to the evidence link.
- Aligned the source canonical and Service-schema URL with the published trailing-slash URL.
- Added SEO guard assertions for the canonical, tracker link and contextual section.
- Updated both sitemap sources' lastmod to 19 October 2026.

## Not changed

- The existing /services/air-cargo/ to /services/air-freight/ consolidation was verified separately and left unchanged.
- No transit-time promise, port metric, report date, URL or external repository was altered.
- No outreach was sent. The support@carrgo.co.uk mailbox is not a verified connected sender.

## Public research

- Focused search: https://www.carrgo.co.uk/ (current result for the query)
- Dedicated page: https://www.carrgo.co.uk/cargo-shipping-company/
- Port evidence tracker: https://www.carrgo.co.uk/resources/port-congestion-tracker/


## Live verification correction

The first source-only deployment passed its build but the deployed static generator override still served the old cargo-page body. Live verification caught that mismatch. The generator and its guard were then updated so the published HTML contains the new section and trailing-slash canonical before the final deployment claim.

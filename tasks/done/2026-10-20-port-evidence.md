# 2026-10-20 — daily port evidence update

## Decision

Update the Carrgo port evidence tracker and durable ledger for the 20 October 2026 check. Keep all unsupported numerical congestion fields unknown/null. Do not re-date older measurements or infer port-wide congestion from local notices or weather.

## Evidence reviewed

- [Peel Ports Liverpool marine index](https://www.peelports.com/marine/our-ports/liverpool/) — checked 20 October; Notice 70 remains latest and Notice 69 remains relevant.
- [Peel Ports Notice 70](https://www.peelports.com/media/l4xk0tzu/lntm-2026-070-temporary-closure-of-alfred-lock.pdf) — published 16 October; Alfred Lock closures scheduled on two 22 October high-water tides.
- [Peel Ports Notice 69](https://www.peelports.com/media/2fglwcqp/lntm-2026-069-temporary-removal-of-c11.pdf) — published 14 October; C11 remains expected off station until mid-November.
- [Dublin Port 2026 notices](https://www.dublinport.ie/information-centre/notice-to-mariners-2026/) — checked 20 October; Notice 49 remains the latest listed notice.
- [Belfast Harbour notices](https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/) — checked 20 October; Notice 27/2026, Ploughing operations, is now listed as latest, followed by Notice 24/2026.
- [Met Office shipping forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast) and [inshore forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast) — checked 20 October; Shannon has a gale warning, while the Irish Sea and Malin have no formal gale-warning heading; relevant coastal sectors have strong-wind advisories.

## Shipped

- Added `public/data/port-evidence/2026-10-20.json` with preserved prior sources plus the dated current review.
- Updated `latest.json` and `latest.csv` to the 20 October observation.
- Updated both sitemap copies with truthful tracker `lastmod` `2026-10-20`.
- Updated the public SEO/evidence changelog.

## Methodology and limitations

This is a dated public-source review, not an AIS feed. Notices support only their stated location and period. Weather advisories are context, not congestion evidence. No timestamped, comparable port-wide queue, waiting-time or berth-utilisation measurement was found, so no congestion change, score, ranking or forecast is calculated. Historical records remain preserved; last checked is kept separate from last measured.

## Outcome

Drafted and committed through the existing GitHub Pages workflow. Deployment and live verification are recorded in the automation outcome; no external outreach or private-app action was taken.

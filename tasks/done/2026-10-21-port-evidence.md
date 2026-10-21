# 2026-10-21 — daily port evidence update

## Decision

Publish a dated update because the official marine-weather evidence materially changed. Keep all unsupported numerical congestion fields unknown/null and do not infer port-wide delays from sea-area warnings.

## Evidence reviewed

- [Peel Ports Liverpool marine index](https://www.peelports.com/marine/our-ports/liverpool/) — checked 21 October; Notice 70 remains latest and Notice 69 remains relevant.
- [Dublin Port 2026 notices](https://www.dublinport.ie/information-centre/notice-to-mariners-2026/) — checked 21 October; Notice 49 remains the latest listed notice.
- [Belfast Harbour notices](https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/) — checked 21 October; Notice 27 remains latest, followed by Notice 24.
- [Met Office shipping forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast) — issued 04:05 UTC on 21 October; formal gale warnings cover the Irish Sea, Shannon and Malin, with severe-gale-force 9 wording for the Irish Sea and Shannon.
- [Met Office inshore forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast) — issued 06:00 UTC on 21 October; strong-wind warnings cover the relevant Irish Sea and Northern Ireland coastal sectors.

## Repository changes

- Added `public/data/port-evidence/2026-10-21.json`, preserving all earlier source records.
- Updated `latest.json` and `latest.csv` with five dated source checks.
- Refreshed the static tracker used by the production build and both sitemap copies.
- Recorded this evidence decision in the public changelog.

## Methodology and limitations

This is a dated public-source review, not an AIS feed. Notices and weather warnings support only their stated location, period and conditions. No comparable port-wide queue, waiting-time or berth-utilisation measurement was found, so no congestion change, score, ranking or forecast is calculated. Last checked remains separate from last measured.

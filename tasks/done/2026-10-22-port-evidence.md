# 2026-10-22 — daily port evidence update

## Decision

Publish a dated update because Liverpool Notice 70 reaches its stated closure date, Belfast added Notice 28, and official marine-weather warnings materially changed. Keep all unsupported numerical congestion fields unknown/null and do not infer port-wide delays from local notices or sea-area warnings.

## Evidence reviewed

- [Peel Ports Liverpool marine index](https://www.peelports.com/marine/our-ports/liverpool/) and Notice 70 — checked 22 October; Alfred Lock is scheduled closed on the 09:14 and 21:24 high-water tides, with withdrawal stated for 06:56 on 23 October unless amended.
- [Dublin Port 2026 notices](https://www.dublinport.ie/information-centre/notice-to-mariners-2026/) — checked 22 October; Notice 49 remains the latest listed notice.
- [Belfast Harbour notices](https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/) — checked 22 October; Notice 28, Temporary No-Wake Zone – D1 and D3, is newly listed ahead of Notice 27. The linked detail did not expose the full notice text in the public retrieval.
- [Met Office shipping forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast) — issued 04:05 UTC on 22 October; formal gale warnings cover the Irish Sea and Shannon, including severe-gale-force 9 and violent-storm-force 11 wording respectively.
- [Met Office inshore forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast) — issued 06:00 UTC on 22 October; strong-wind warnings cover the reviewed Irish Sea and Northern Ireland coastal sectors.

## Repository changes

- Added `public/data/port-evidence/2026-10-22.json`, preserving all earlier source records.
- Updated `latest.json` and `latest.csv` with five dated source checks.
- Refreshed the static tracker used by the production build and both sitemap copies.
- Recorded this evidence decision in the public changelog.

## Methodology and limitations

This is a dated public-source review, not an AIS feed. Notices and weather warnings support only their stated location, period and conditions. No comparable port-wide queue, waiting-time or berth-utilisation measurement was found, so no congestion change, score, ranking or forecast is calculated. Last checked remains separate from last measured.

## Validation

Repository validation confirms 17 port records, 203 preserved source records, zero broken source references, null unsupported numerical metrics and 17 static tracker rows.

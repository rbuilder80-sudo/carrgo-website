# 2026-10-23 — daily port evidence update

## Decision

Publish a dated update because Liverpool issued Notice 71 for a weekend Langton Lock closure and official marine-weather warnings remain material. Keep unsupported numerical congestion fields unknown/null and do not infer port-wide delays from local notices or sea-area warnings.

## Evidence reviewed

- [Liverpool Notice 71](https://www.peelports.com/media/e3llquvk/lntm-2026-071-temporary-closure-of-langton-lock.pdf) — dated 23 October; Langton Lock is scheduled closed 12:00 on 24 October to 22:00 on 25 October. Hornby Passage and Gladstone Lock are a conditional alternative for suitable vessels after Dockmaster consultation.
- [Peel Ports Liverpool index](https://www.peelports.com/marine/our-ports/liverpool/) — checked 23 October; Notice 71 is latest, followed by Notices 70 and 69.
- [Dublin Port notices](https://www.dublinport.ie/information-centre/notice-to-mariners-2026/) — checked 23 October; Notice 49 remains latest.
- [Belfast Harbour notices](https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/) — checked 23 October; Notice 28 remains latest, but its full effective period was unavailable in accessible text.
- [Met Office shipping forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast) — issued 04:05 UTC on 23 October; Irish Sea and Shannon retain gale warnings, while Malin has no formal gale-warning heading.
- [Met Office inshore forecast](https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast) — issued 06:00 UTC on 23 October; strong-wind warnings remain across the reviewed Irish Sea and Northern Ireland sectors.

## Repository changes

- Added `public/data/port-evidence/2026-10-23.json`, preserving all earlier source records.
- Updated `latest.json` and `latest.csv` with six dated source checks.
- Refreshed the static tracker and both sitemap copies.
- Recorded the decision in the public changelog.

## Methodology and limitations

This is a dated public-source review, not an AIS feed. Notices and weather warnings support only their stated location, period and conditions. No comparable port-wide queue, waiting-time or berth-utilisation measurement was found, so no congestion change, score, ranking or forecast is calculated. Last checked remains separate from last measured.

## Validation

Repository validation confirms 17 port records, 209 preserved source records, zero broken source references, null unsupported numerical metrics and 17 static tracker rows.

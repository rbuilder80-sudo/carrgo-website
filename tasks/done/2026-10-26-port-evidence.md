# Port evidence check — 2026-10-26

## Outcome

- Added the dated 17-port ledger and refreshed the public tracker without generating numerical congestion metrics.
- Recorded that Liverpool Notice 71 is no longer visible after its scheduled closure window ended, without claiming reopening or normal operations.
- Rechecked Belfast Notice 29 and Dublin Notice 49 as latest-listed notices.
- Recorded current Met Office gale and severe-gale warnings only as operating context.
- Left the 23 October weekly report and its dates unchanged.

## Primary evidence

- https://www.peelports.com/marine/our-ports/liverpool/
- https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/
- https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast

## Verification

- JSON/source-reference integrity: passed (17 ports, 227 unique sources, no broken references; all congestion measurements remain null/unknown)
- SEO guard and production build: passed (`npm run check:seo`; 227 static HTML files; built sitemap checks passed)
- Existing SaaS regression suite: 10 passed, 4 failed. The failures are unchanged legacy checks for two absent article URLs, a stale engine heartbeat and an `overall` field missing from the live health feed; none is caused by this content/data update.
- Deployment: successful via the established GitHub Pages workflow, run 40292086249, from commit `af72652261a3fcae68bdeddeed2b8274a63c140e`.
- Live verification: passed after deployment. The tracker returned the 26 October checked timestamp, self-canonical, quote path and 17 `Unknown` rows; both latest and dated ledgers returned 17 ports, 227 sources and null `measurementObservedAt`; robots.txt referenced the sitemap; the tracker sitemap `lastmod` was 26 October while the unchanged weekly report remained dated and mapped to 23 October.

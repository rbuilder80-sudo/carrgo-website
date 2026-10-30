# Port evidence check — 2026-10-30

## Outcome

- Added the dated 17-port ledger and refreshed the public tracker without generating numerical congestion metrics.
- Rechecked Liverpool Notice 72, Belfast Notice 29 and Dublin Notice 49 as latest-listed notices; no newer official port notice was found.
- Added Maersk’s dated London Gateway empty-return resumption advisory with carrier-specific limitations.
- Recorded the Malin gale warning and nearby inshore strong-wind warnings as weather context only, without inferring port disruption.
- Left the 23 October weekly report and its dates unchanged.

## Primary evidence

- https://www.peelports.com/marine/our-ports/liverpool/
- https://www.belfast-harbour.co.uk/publications/?doc_cat=notice-to-mariners
- https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- https://www.maersk.com/news/articles/2026/10/26/maersk-london-gateway-empty-returns-update
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast

## Verification

- JSON/source-reference integrity: passed — 17 ports, 248 unique sources, no missing source references; all measurements, observation times and comparable-change fields remain null.
- CSV integrity: passed — header plus six new evidence rows, 14 columns per row.
- SEO guard and form-delivery checks: passed (the first concurrent attempt began before dependency installation had completed; the clean rerun passed).
- Production build: passed — 227 static HTML files and 89 unique indexable sitemap URLs.
- Existing SaaS regression suite: 10 passed / 4 known baseline failures (two legacy 404 expectations, stale engine heartbeat and undefined health-feed overall status); no new failure attributable to this evidence update.
- Deployment: pending
- Live verification: pending

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
- Published commit: `0fb27cb1077088dc19fa44ba8b9bf2626033b699` on `main`.
- Deployment: passed — GitHub Pages workflow run [41029662483](https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/41029662483) completed successfully.
- Scheduled regression workflow: run [41029662406](https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/41029662406) failed on the same four documented baseline checks reproduced locally; the evidence change introduced no additional regression.
- Live verification: passed — tracker shows the 30 October check, 17 Unknown rows, the London Gateway carrier caveat and the complete quick-quote path; dated and latest JSON are byte-equivalent with 17 ports / 248 sources and all measurements null; the CSV download works; robots references the sitemap; the sitemap gives the tracker a 30 October lastmod while retaining the weekly report at 23 October; the weekly report itself remains dated 23 October.

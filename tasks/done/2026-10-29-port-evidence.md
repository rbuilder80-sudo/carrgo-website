# Port evidence check — 2026-10-29

## Outcome

- Added the dated 17-port ledger and refreshed the public tracker without generating numerical congestion metrics.
- Rechecked Liverpool Notice 72, Belfast Notice 29 and Dublin Notice 49 as latest-listed notices; no newer official port notice was found.
- Recorded the Shannon gale warning and nearby inshore strong-wind warnings as weather context only, without inferring port disruption.
- Left the 23 October weekly report and its dates unchanged.

## Primary evidence

- https://www.peelports.com/marine/our-ports/liverpool/
- https://www.belfast-harbour.co.uk/publications/?doc_cat=notice-to-mariners
- https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast

## Verification

- JSON/source-reference integrity: passed — 17 ports, 242 unique sources, no broken references, all port-wide measurements remain null/`Unknown`
- SEO guard and form-delivery checks: passed
- Production build and built-sitemap checks: passed — 227 static HTML files; 89 unique indexable sitemap URLs
- Existing SaaS regression suite: baseline unchanged — 10 passed, 4 failed (two retired article expectations, stale heartbeat and undefined legacy health status)
- Repository commit: `02283ad671fd701ba49c9fb6982a1aa05091638a`
- Deployment: GitHub Pages workflow [40844213330](https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/40844213330) completed successfully
- Live verification: passed — tracker, dated/latest JSON, CSV, sitemap, robots and unchanged 23 October report returned HTTP 200; tracker is canonical/indexable, shows 17 `Unknown` rows, exposes the complete quote path and records the 29 October check; both JSON files contain 17 ports and 242 sources with all port-wide measurements null
- Existing regression workflow [40844213338](https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/40844213338) failed on the same four legacy assertions reproduced locally; the scoped SEO/form/build checks passed

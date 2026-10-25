# Port evidence check — 2026-10-25

## Outcome

- Added the dated 17-port ledger and refreshed the public tracker without generating numerical congestion metrics.
- Recorded that Liverpool Notice 71’s scheduled closure period encompasses the check, without claiming actual closure or delay.
- Rechecked Belfast Notice 29 and Dublin Notice 49 as latest-listed notices.
- Recorded current Met Office storm/gale warnings only as operating context.
- Left the 23 October weekly report and its dates unchanged.

## Primary evidence

- https://www.peelports.com/marine/our-ports/liverpool/
- https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/
- https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast

## Verification

- JSON/source-reference integrity: passed (17 ports, 222 uniquely identified sources, no broken port references, all numerical metrics null)
- SEO guard and production build: passed
- Regression suite: 10/14 passed; four unchanged baseline failures remain (two retired article URLs return 404, stale engine heartbeat, and `health.json` has no `overall` value)
- Deployment: GitHub Pages workflow run 40176327255 succeeded for commit 22c5602126f9a0ee407ba9d54b09d3b214543cda
- Live verification: tracker, dated/latest ledgers, sitemap, robots.txt and unchanged 23 October weekly report loaded successfully; the tracker showed the 25 October check, 17 unknown rows, current source summaries, a self-canonical and the quote form. The dated and latest ledgers matched at 17 ports and 222 sources with every numerical metric null.

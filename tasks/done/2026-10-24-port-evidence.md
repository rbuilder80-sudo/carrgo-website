# Port evidence check — 2026-10-24

## Outcome

- Added a dated 17-port JSON ledger and updated the latest ledger without generating any congestion score, queue, waiting-time, berth-utilisation figure or forecast.
- Recorded Belfast Notice 29 only to the extent supported by the official archive title; the linked detail page did not expose the notice text.
- Recorded Liverpool’s current notice sequence and retained Notice 71’s scheduled closure wording without claiming that the lock was already closed.
- Recorded Dublin Notice 49 as the latest listed notice and current Met Office shipping/inshore warnings as weather context only.
- Updated the tracker check time, evidence cards, Dataset markup and tracker sitemap lastmod. The 23 October weekly report and its dates were not changed.

## Primary evidence

- https://www.peelports.com/marine/our-ports/liverpool/
- https://www.belfast-harbour.co.uk/news/document_categories/notice-to-mariners/
- https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast
- https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/inshore-waters-forecast

## Verification

- JSON parse, 17-port coverage, source-ID uniqueness, port/source reference integrity and null-metric checks: passed
- SEO guard: passed
- Production build: passed
- Regression suite: 10 passed, 4 pre-existing failures (two legacy article URLs return 404, stale engine heartbeat, and undefined health-feed overall status)
- Deployment and live verification: pending

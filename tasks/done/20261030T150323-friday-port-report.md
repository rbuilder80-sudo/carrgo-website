# Friday port report — 30 October 2026

## Publication target

- Edition: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-30/
- Current report: https://www.carrgo.co.uk/resources/uk-port-congestion-report/
- Evidence JSON: https://www.carrgo.co.uk/data/port-evidence/2026-10-30.json
- Evidence CSV: https://www.carrgo.co.uk/data/port-evidence/2026-10-30.csv
- Status at commit: prepared and tested; deployment and live verification are recorded after the established Pages workflow completes.

## Evidence outcome

- Published an operational-advisory roundup rather than a numerical ranking because no comparable primary queue, waiting-time, dwell-time or berth-utilisation measurements were verified.
- Maersk states that its London Gateway empty-container acceptance restrictions were lifted from 12:00 on 26 October; this remains carrier-specific evidence.
- Liverpool Notice 72 schedules Gladstone Lock closed from 07:00 to 19:00 on 2 November, with a conditional alternative route.
- Belfast Notice 29 is latest but its detail is unavailable; Dublin Notice 49 remains latest without a confirmed completion update.
- The 11:30 shipping forecast has no gale-warning heading for Irish Sea, Shannon or Malin; the 12:00 inshore forecast retains easing warnings in two Northern Ireland sectors.
- All unsupported numerical metrics remain unknown across the 17-port coverage.

## Discovery work

- Added the dated report, accessible evidence table, NewsArticle/Dataset metadata and crawlable dated JSON/CSV downloads.
- Updated the current report, archive, tracker, regular sitemap and News sitemap with truthful 30 October dates.
- Retained older editions in the regular sitemap and only the current eligible edition in the News sitemap.
- Confirmed Google’s current guidance: Article markup can help understanding but is not required for News eligibility; News sitemaps should include only articles from the last two days; Publisher Center is not a manual submission route and does not guarantee inclusion.
- Search Console submission and indexation verification were not attempted because no verified Search Console connection is available. Sitemap publication is not proof of indexing.

## Editorial distribution

- Status: not submitted unless and until the connected mailbox is verified as the authenticated support@carrgo.co.uk identity or an explicitly authorised send-as identity.
- No fallback sender, Reply-To substitution, test message or follow-up chaser is permitted.
- Official public outlet routes and any submission outcome are recorded after post-publication verification.

## Prepared pitch — not sent

Carrgo’s 30 October UK and Ireland port evidence report records two practical changes for importers: Maersk says empty-container acceptance resumed at London Gateway on 26 October, while Liverpool schedules a 12-hour Gladstone Lock closure on 2 November with alternative routing subject to tide and vessel suitability. Belfast advanced to Notice 29 without accessible detail, Dublin remains unchanged, and current marine forecasts are less severe across the principal reviewed sea areas than on 23 October. The report deliberately withholds congestion scores because no comparable primary queue, waiting-time, dwell-time or berth-utilisation measurements were available. If useful to freight readers, please attribute the dated report and evidence extract: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-30/ and https://www.carrgo.co.uk/data/port-evidence/2026-10-30.csv

## Validation before publication

- `npm run check:seo`: passed (SEO guards and eight no-send form-delivery scenarios).
- `npm run build`: passed (TypeScript, Vite, static generation and 90-URL built-sitemap checks).
- Custom report validation: passed (17 ports, 250 preserved source records, all numerical metrics null, valid NewsArticle/Dataset JSON-LD, dated/current canonicals, accessible table, quote fields, downloads and sitemap membership).
- `node tests/regression.js`: 10 passed, 4 known baseline failures. The applicable homepage, sitemap, IndexNow, `llms.txt`, heartbeat-presence and completed-task assertions passed; the suite continues to flag two retired article URLs, its stale heartbeat-age assertion and an existing `health.json` schema mismatch (`overall` undefined). These baseline failures are unrelated to this report.

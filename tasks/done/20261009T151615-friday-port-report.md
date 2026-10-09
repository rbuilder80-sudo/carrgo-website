# Friday port report — 9 October 2026

## Publication outcome

- Edition: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-09/
- Current report: https://www.carrgo.co.uk/resources/uk-port-congestion-report/
- Evidence JSON: https://www.carrgo.co.uk/data/port-evidence/2026-10-09.json
- Evidence CSV: https://www.carrgo.co.uk/data/port-evidence/2026-10-09.csv
- Source commit: `ef7ca365487f114397d8066c23dd1f8d92babb0e`
- Production commit: `f2d0707cdcefdf4a676099aa2fb2381db783e1c1`
- Pages run: https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/37944822756 — succeeded
- Live verification: current report, dated report, archive, tracker, JSON, CSV, regular sitemap, News sitemap and robots.txt returned HTTP 200 and matched the tested production files.

## Evidence outcome

- Published an operational-advisory roundup rather than a numerical ranking because no comparable primary waiting-time, queue or berth-utilisation measurements were verified.
- Liverpool Notices 67 and 68 schedule Langton Lock closures on 11–12 October and a Gladstone Lock closure on 15 October.
- Belfast Notice 24 schedules D3 dredging from 12 October 2026 to 5 January 2027 and allows VTS to introduce one-way traffic when required. Notice 25 gives no departure time for HMS Queen Elizabeth, so the current vessel and exclusion-zone status remain unknown.
- Dublin Notice 49 remains within its approximate dredging period, without a verified real-time work stage or completion date.
- The Met Office forecasts issued on 9 October carry gale warnings for Malin and Shannon and strong-wind warnings in the relevant coastal sectors. Weather is treated as context, not as proof of port congestion.
- All unverified port-wide congestion metrics remain unknown; the 17-port coverage is preserved.

## Discovery outcome

- Added the dated report, accessible evidence table, Article/Dataset metadata and crawlable JSON/CSV downloads.
- Updated the regular sitemap with truthful 9 October dates and retained only the new eligible edition in the News sitemap.
- Verified self-canonicals, contextual links, publisher contact, quote fields and robots.txt sitemap references live.
- Search Console submission and indexation verification were not attempted because no verified Search Console connection is available. Sitemap publication is not proof of indexing.

## Editorial distribution outcome

- No submission was sent. The connected mailbox is not authenticated as `support@carrgo.co.uk`, and no verified authorised send-as identity is available. The mandatory sender restriction therefore blocks all outreach.
- Logistics Manager — official press-release route reverified at https://www.logisticsmanager.com/contact-us/; status: not submitted.
- The Loadstar — public editorial/contact route rechecked at https://theloadstar.com/home-page/; no unambiguous authorised recipient was resolved; status: not submitted.
- Port Technology International — public contact route rechecked at https://www.porttechnology.org/contact/; the page was not publicly retrievable during this check, so no editorial recipient was resolved; status: not submitted.
- No follow-up, fallback sender, test message or duplicate submission was used.

## Prepared pitch drafts — not sent

### Logistics Manager

Carrgo's 9 October UK and Ireland port evidence report identifies three dated planning checks for importers: Liverpool lock closures on 11–12 and 15 October, Belfast's D3 dredging programme from 12 October to 5 January, and current marine-weather warnings. The report deliberately withholds port-wide congestion scores because no comparable primary queue, waiting-time or berth-utilisation measurements were available. If useful to your UK logistics readers, please cite the dated report and evidence download: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-09/ and https://www.carrgo.co.uk/data/port-evidence/2026-10-09.csv

### The Loadstar

Carrgo has published a source-led UK and Ireland port operating roundup for 9 October. The practical ocean-freight finding is a cluster of upcoming Liverpool lock windows and a Belfast dredging programme where VTS may introduce one-way traffic, alongside Dublin's ongoing approximate dredging period. No port-wide delay or numerical congestion ranking is claimed. The dated source and reusable evidence extract are available at https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-09/ and https://www.carrgo.co.uk/data/port-evidence/2026-10-09.csv

### Port Technology International

Carrgo's 9 October evidence review highlights how local operating notices should be separated from unsupported port-wide congestion claims: Liverpool has dated lock closures, Belfast has a multi-month dredging programme with conditional one-way traffic, and Dublin's notice gives only an approximate work duration. The methodology records missing measurements as unknown rather than normal. Source report: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-09/; evidence extract: https://www.carrgo.co.uk/data/port-evidence/2026-10-09.csv

## Verification notes

- SEO guard, structured-data/CSV/XML validation and production build passed.
- Sitewide lint retains 45 pre-existing React/UI errors outside this static report change.
- Live regression remains 12/14 because of the existing stale heartbeat and incomplete health-feed status.

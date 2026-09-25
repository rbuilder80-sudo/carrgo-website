# Friday port report — 25 September 2026

## Publication outcome

- Edition: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-09-25/
- Current report: https://www.carrgo.co.uk/resources/uk-port-congestion-report/
- Evidence JSON: https://www.carrgo.co.uk/data/port-evidence/2026-09-25.json
- Evidence CSV: https://www.carrgo.co.uk/data/port-evidence/2026-09-25.csv
- Source commit: `43c3f22f5a0c099e368ffa7ce36de3e821a5c6b4`
- Production commit: `075a441d05e7e2a2f84df2751aca20558114f9a1`
- Pages run: https://github.com/rbuilder80-sudo/carrgo-website/actions/runs/36149982963 — succeeded
- Live verification: current report, dated report, archive, tracker, JSON, CSV, regular sitemap, News sitemap and robots.txt returned HTTP 200 and matched the tested production files.

## Evidence outcome

- Published an operational-advisory roundup rather than a numerical ranking because no comparable primary waiting-time, queue or berth-utilisation measurements were verified.
- Reported Liverpool Notice 65 lock windows, amended Notice 57's extended South Gladstone restriction, Dublin Notice 49's planned capital dredging, Belfast notice availability and current Met Office marine weather context.
- Kept all unverified congestion metrics unknown and did not infer port-wide delay from local notices or weather forecasts.

## Discovery outcome

- Added a dated CSV evidence extract and linked it from the report and tracker.
- Added a separate Google News sitemap containing only the new edition, following the two-day eligibility window in Google's current guidance.
- Updated the regular sitemap, archive and robots.txt with truthful 25 September dates and links.
- Search Console submission and indexation verification were not attempted because no verified Search Console connection is available. Sitemap publication is not proof of indexing.

## Editorial distribution outcome

- No submission was sent. The connected mailbox was authenticated as a personal Gmail account, not `support@carrgo.co.uk`; no verified authorised send-as configuration was available. The mandatory sender restriction therefore blocked all outreach.
- Logistics Manager — official press-release route reverified at https://www.logisticsmanager.com/contact-us/; status: not submitted.
- The Loadstar — official editorial route rechecked at https://theloadstar.com/home-page/; status: not submitted.
- Port Technology International — public contact route rechecked at https://www.porttechnology.org/contact/; no unambiguous editorial submission route was verified; status: not submitted.
- No follow-up, fallback sender, test message or duplicate submission was used.

## Verification notes

- SEO guard and production build passed.
- Report HTML, JSON-LD, quote fields, CSV and XML validation passed.
- Sitewide lint still reports pre-existing React/UI errors outside this static report change.
- Live regression remains 12/14 because of the existing stale heartbeat and malformed health-feed status.

# Friday port report outcome — 2026-09-11

## Published edition

- Current report: https://www.carrgo.co.uk/resources/uk-port-congestion-report/
- Dated edition: https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-09-11/
- Tracker: https://www.carrgo.co.uk/resources/port-congestion-tracker/
- Dated JSON evidence ledger: https://www.carrgo.co.uk/data/port-evidence/2026-09-11.json
- Dated CSV evidence extract: https://www.carrgo.co.uk/data/port-evidence/2026-09-11.csv

## Evidence basis

- Peel Ports Notice 60/2026: https://www.peelports.com/media/ucihxukn/lntm-2026-060-temporary-closure-of-a-bridge.pdf
- Peel Ports Notice 57/2026: https://www.peelports.com/media/4r5p5yyi/lntm-2026-057-temporary-closure-of-south-gladstone-branch-dock-no-2.pdf
- Dublin Port notices index: https://www.dublinport.ie/information-centre/notice-to-mariners-2026/
- Met Office shipping forecast: https://weather.metoffice.gov.uk/specialist-forecasts/coast-and-sea/shipping-forecast

## Website changes

- Earlier report publication commit on main: ffcc38a097b2bf1d680d8404cd6fc1dcad627b56
- Earlier report publication commit on gh-pages: 2a3c3f611e1d56504abcbf8b55ccfd4ae8c557a2
- Structured data and evidence download commit on main: 5c1f22d396c7cd8a49504d7b0d428a4d6d40c850
- Structured data and evidence download commit on gh-pages: ad1d74f527a4899af05148e5ad04a1e4e2f68305

## Live verification

Checked live URLs returned HTTP 200. The report pages have self-referencing canonicals, indexable robots meta, NewsArticle JSON-LD, Dataset/DataDownload JSON-LD, the CSV extract link and the quote form. The tracker has Dataset/DataDownload JSON-LD and the quote form. robots.txt references https://www.carrgo.co.uk/sitemap.xml. sitemap.xml includes the current report, dated report and dated CSV evidence extract.

## Distribution status

No editorial outreach was sent. The authorised Carrgo sender was not verified in Gmail; the authenticated profile available to the automation was not support@carrgo.co.uk. A prior non-authorised-account send to one relevant outlet was found, so no retry was attempted.

Relevant public editorial/submission routes checked:

- Logistics Manager contact page: https://www.logisticsmanager.com/contact-us/
- The Loadstar contact page: https://www.loadstarhedgehold.co/media-kit-contact
- Port Technology International contact page: https://www.porttechnology.org/contact/

## Known blockers / follow-up

- Repository regression workflow remains failing on pre-existing sitewide checks, not introduced by this scoped metadata/download patch.
- Authenticated Search Console inspection/submission is not available.
- support@carrgo.co.uk send-as or mailbox verification is required before any future autonomous outreach can be sent.
- Legacy React port detail/comparison code still contains unverified numerical port data; it should be corrected in a separate scoped change.

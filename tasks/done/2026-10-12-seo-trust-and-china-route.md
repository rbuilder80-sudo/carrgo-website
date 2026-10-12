# Carrgo SEO trust and China–UK route update — 12 October 2026

## Evidence reviewed

- Ubersuggest UK organic data showed the China–UK route ranking outside page one for commercially relevant searches including `air freight china to uk`, `air freight from china to uk` and `shipping routes from china to uk`.
- Public search results still displayed the unsupported “quote in 2 hours” promise on Carrgo commercial pages.
- The production branch had reintroduced that promise after an earlier correction, while the default branch's build metadata was already partly corrected.
- The China–UK route contained unreferenced fixed price bands and an unreferenced annual trade-value claim. No current rate source or reproducible pricing method was present in the repository.

## Shipped change

1. Replaced the unsupported response-time promise in the base page metadata and `llms.txt` with shipment-specific quote wording.
2. Reworked the existing China–UK route's cost guidance around the information needed for a real quote: origin, destination, commodity, Incoterm, dimensions, weight, mode, customs scope and final delivery.
3. Removed unreferenced fixed price bands and the unreferenced trade-value statistic without changing the existing transit-time guidance.
4. Replaced unsupported comparison rows for reliability, carbon, insurance and frequency with booking checks and quote-input guidance.
5. Removed unsupported China-route superlatives and guarantees, including unsourced port rankings, guaranteed first-time clearance, “preferred” status, no-hidden-fee wording, real-time tracking and blanket customs/compliance claims.
6. Replaced the stale “rates and transit times verified” byline with a methodology note that distinguishes planning ranges from live carrier schedules and quotations.
7. Corrected the tracker link description: it records dated operational notices and leaves unavailable queue and waiting-time measurements unknown.
8. Added a regression guard covering `index.html`, `llms.txt`, the China route and the static generator so later builds fail if the unsupported two-hour promise (including the “business hours” variant), removed China price bands or specified unsupported China-route claims return.
9. Updated sitemap `lastmod` only for the homepage and China–UK route.

## Conversion path

The China–UK page continues to inherit the contextual quick-quote form with China and United Kingdom preselected. The form requests goods, approximate weight or volume, dimensions with an “I'm not sure” option, and contact details.

## Friday report distribution outcome

- Edition checked: <https://www.carrgo.co.uk/resources/uk-port-congestion-report/2026-10-09/>
- Focused public searches found the Carrgo report but no verified third-party editorial publication or attribution link.
- Status: published by Carrgo; external submission, acceptance, publication and linking remain unverified.
- No outreach or follow-up was sent. The authorised `support@carrgo.co.uk` mailbox or send-as identity is still not available through a verified connection.

## Earned-link opportunities researched — not contacted

### Logistics Manager

- Evidence: <https://www.logisticsmanager.com/contact-us/>
- Fit: UK logistics and supply-chain audience; the page provides a designated press-release newsdesk.
- Draft: “Carrgo's 9 October UK and Ireland port evidence review separates dated operational notices from unverified congestion metrics. The report records Liverpool lock closures, Belfast dredging controls and weather warnings while explicitly withholding port-wide queue or utilisation figures that primary sources do not provide. If useful for your ports or importer coverage, the canonical report and reusable evidence files are available from Carrgo; please attribute and link to the source if cited.”

### The Loadstar

- Evidence: <https://theloadstar.com/the-loadstar-news/>
- Fit: editorial coverage spans containerised ocean, overland and air-cargo supply chains. The separate company-notice route is paid, so it is not suitable for this no-paid-placement workflow.
- Draft: “Carrgo reviewed UK and Ireland port evidence published through 9 October and found several local operating constraints, but no comparable primary measurement supporting a numerical port-wide congestion ranking. The methodology and limitations are published with the dated evidence extract. This may be useful as a data-integrity angle on how shipper advisories distinguish local restrictions from measured congestion; please link to the canonical Carrgo report if used.”

### Port Technology International

- Evidence: <https://www.porttechnology.org/contact/>
- Fit: ports and terminal-operations audience; the public enquiry route is current, although it is not explicitly labelled as a free editorial-submission channel.
- Draft: “Carrgo's latest UK and Ireland port review compiles dated port notices and weather advisories into a reusable evidence ledger while leaving queue, waiting-time and utilisation fields unknown when primary measurements are unavailable. The approach may interest readers working on port-data transparency and operational decision support. The canonical report and evidence download can be supplied for editorial review, with attribution requested if used.”

## Next differentiated asset recommendation

Build a shipment-readiness checker for China–UK importers that turns origin, destination, Incoterm, commodity, dimensions, weight and preferred mode into a documentation and quote-input checklist. It should not calculate freight rates or transit forecasts; its utility is preventing incomplete quote requests and avoidable customs-data gaps using defensible HMRC guidance and Carrgo's existing form fields.

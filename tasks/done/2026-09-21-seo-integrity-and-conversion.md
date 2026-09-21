# SEO outcome — indexed report corrections and contextual quote forms (2026-09-21)

## Finding

Public search still surfaced the 2 September report with unsupported health scores, waiting times, vessel queues and berth-utilisation figures. The same synthetic snapshot remained live at the 26 August URL. Both URLs were indexable and included in the live sitemap.

The shared React layout also had only a floating quote link. Most service, route, industry and resource pages did not inherit the requested persistent quick form, despite the prior sitewide conversion rule.

## Shipped correction

- Replaced the 26 August and 2 September numerical snapshots with transparent correction notices, preserving both URLs.
- Added `noindex, follow`, canonicalised both correction records to the current report and removed them from the sitemap.
- Reorganised the report archive so evidence-led editions are separated from withdrawn correction records.
- Replaced the shared floating link with the existing desktop sticky/mobile expandable quick form across pages that do not already contain an equivalent form.
- Added route-specific wording and preselected route context, including China–UK.
- Added a build-time guard for correction indexability, sitemap exclusion and required quick-form fields.
- Corrected the regression check for the intentionally consolidated China–UK article URL.

## Distribution review

Public searches found the 18 September Carrgo report in search results but no verified third-party editorial publication or attribution link. No outreach was sent. Private reply and opt-out status remains unknown because `support@carrgo.co.uk` is not available as a verified connected mailbox.

# SEO outcome — port evidence integrity (2026-09-14)

## Finding

The live port comparison and 17 port-detail pages rendered synthetic values from `src/data/portData.ts` as current operational facts, including health scores, vessel queues, waiting times, berth utilisation and forecasts. Search also surfaced the separate public repository `rbuilder80-sudo/carrgo-uk-port-congestion-data` with the same unsupported claims. That repository is outside this task's verified website-repository scope and was not changed.

## Shipped website correction

- Replaced the comparison tool with an evidence-availability comparison for the existing 17-port coverage.
- Replaced the shared port-detail template with an explicit `unknown` measurement state and practical booking/collection checks.
- Added source-methodology links to the current tracker and Friday report.
- Added a page-matched desktop/mobile quick quote form for the comparison tool and every port detail page.
- Corrected static-generation titles, descriptions, headings and crawlable fallback content so later builds do not restore “live score” claims.

## Validation

- `npm run build`
- `python -m py_compile scripts/generate-static.py`
- Source assertions confirmed the changed pages do not reference synthetic score, queue, berth-utilisation, wait-time, forecast or history fields.
- Static generation completed for the comparison page and all 17 port pages.

## Follow-up boundary

The separate public congestion-data repository should be corrected or archived under a separately verified, explicitly authorised repository task. Until then, its search snippet can conflict with Carrgo's evidence-led methodology.

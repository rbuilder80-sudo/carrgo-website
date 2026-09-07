# Sticky quote form conversion update

Date: 2026-09-07

## Outcome

Published a persistent Carrgo quick quote form pattern across the site:

- Desktop: fixed right-side sticky quote sidebar.
- Mobile/tablet: sticky bottom quote entry using the same short enquiry fields.
- Page context: route, service, industry, port and port-delay pages keep matched quote wording and prefilled context where supported.
- New-page rule: `Layout.tsx` renders the shared quote component, and `tests/quick-quote-form.cjs` checks that new pages inherit sticky placement.
- Static fallback: `scripts/inject-static-quick-quote.py` injects matching sticky quote markup into generated static and legacy pages.

## Verification

- `node tests/quick-quote-form.cjs .` passed.
- `npm run build` passed.
- `node tests/port-evidence.cjs /workspace/scratch/fed73945713d/carrgo-published` passed after static injection.
- Local generated HTML check: 388 `index.html` pages include sticky desktop and mobile quote placement.
- Live browser checks: 85 canonical destination pages on `https://www.carrgo.co.uk/` passed with a visible fixed desktop quote sidebar and mobile sticky markup.

## Published commit

- `gh-pages`: `abe1745f8f25c214cb849745ee6f18381ac21a39`


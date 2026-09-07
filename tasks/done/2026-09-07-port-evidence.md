# Port evidence review: 7 September 2026

- Production uses the gh-pages branch. The default main branch is older than recent production SEO fixes; do not deploy main over it.
- Baseline source branch: codex/air-seo-consolidation (90e4f33555f33c845bac6dd9f45f30557b61b1f1). Its baseline build reproduced the active index-fjkfou0f.js and index-DsVqUBYV.css assets.
- This change is prepared locally for codex/port-evidence-2026-09-07, but that branch has NOT been created or pushed. GitHub create-tree returned HTTP 403 Resource not accessible by integration. Nothing has been committed or deployed. Its scripts/stage-port-evidence.py preserves the published tree and old cached assets.
- Durable observation: data/port-evidence/2026-09-07.json; latest.json is the current copy. Preserve dated records. Check this branch for evidence before assuming no history exists.
- 17 port records, not 18. All numeric metrics remain unknown. No comparable measured baseline exists.
- Primary Liverpool notices 43/2026 and 55/2026 were read. They specify local operating restrictions, not measured port-wide congestion. Confirm actual applicability with the operator.
- Felixstowe source access was blocked. DP World status pages exposed no dated measurements. Dublin's notice index was reviewed but quantitative congestion not verified. The other 12 ports were not individually checked against primary operational sources in this run; no normal-status assertion is made.
- Tracker's default rendered view now uses evidence records rather than simulated metrics. Search/no-script text matches that status. Existing reports retain original dates and figures with prominent warnings; unsupported Dataset and FAQ claims are removed from their structured data.
- Known residual issue: other port-detail, comparison and calculator views still consume the legacy hard-coded data. The tracker explicitly warns about this. Do not use those figures in Friday reports or call them verified observations.
- Validation before publication: TypeScript/Vite build passed; new evidence integrity test passed; existing air SEO, content integrity and crawl integrity tests passed. No visual browser QA performed.
- No DNS, hosting, access, tracking configuration, third-party services, contacts or unrelated SEO copy changed.

Future runs: preserve review dates separately from measurement times; append new dated evidence only after checking sources. Do not present unchanged or unverifiable figures as fresh data. Verify deployed HTML, active JavaScript and JSON before claiming publication.

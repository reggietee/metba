# metba.io

Website of the Metaverse Bar Association. See `PLAN.md` for the full plan, routes, data model and phase checklist.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run test         # unit tests (Vitest), including the copy-rules check
npm run build && npm run test:e2e   # accessibility and layout checks (Playwright + axe)
```

- `/styleguide` shows every token and component (not indexed).
- All data comes through `src/lib/data.ts`. In Phase 0 and 1 it returns mock data from `src/lib/mock/`.
- Copy that needs review is marked `[DRAFT]` in the source.

## Copy rules (enforced by `tests/banned-copy.test.ts`)

No em dashes. Never claim licensure verification, CPD accreditation, or legal advice. CPD wording comes only from `cpdStatement()` in `src/lib/format.ts`.

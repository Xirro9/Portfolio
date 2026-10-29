# Mahin Moon — Portfolio V2 foundation

A professional-first cybersecurity and engineering portfolio, with a separate creative space called **The Workshop**. Content snapshot: October 28, 2026. Phase 1 covers information architecture, verified/qualified case studies, accessible interactions, maintainability and GitHub Pages readiness. Claude’s Phase 2 visual redesign remains separate.

## Run locally

Node 24 recommended (see `.nvmrc`).

```sh
npm ci
npm run dev
# Open http://localhost:5173/Portfolio/
npm run check       # lint, unit/component/content tests, strict TypeScript, production build
npx playwright install chromium
npm run test:e2e    # production routes and interactions, desktop/mobile, axe checks
npm run preview    # inspect generated output at /Portfolio/
```

## Content and structure

- `src/content/projects.ts`: 15 canonical project records. Implemented features, plans, evidence and limitations stay separate.
- `src/content/site.ts`: identity, contact, navigation, experience, education, grouped skills, milestones and notes.
- `src/content/types.ts`: authoring models, including credential/publication collections awaiting evidence.
- `src/components/`: reusable cards, filters, case studies, timelines, navigation and content primitives.
- `src/routes.ts`: base-aware route definitions and metadata.
- `scripts/prerender.tsx`: 22 static pages, a 404 and sitemap from the same React/data model.
- `src/index.css`: neutral Phase 1 presentation and design token entry points.
- `src/structure.css`: neutral theme scopes, distinct hero compositions, media frames, and editorial layout hooks.
- `src/components/heroes/`: independent professional, Archive, and Workshop heroes (the Celestial Engine lives in the Workshop hero).
- `src/components/media/`: responsive images, intent-driven video previews, manual galleries, and architecture diagrams.

Routes: home, Work, Experience, Labs & notes, The Workshop, About and Contact, plus canonical case studies. Creative engineering spotlights link to Workshop records without duplicating data.

The structural-blueprint branch adds `observatory`, `engineering-archive`, and `technomancer-workshop` scopes to the shared application. See [media manifest](docs/MEDIA_MANIFEST.md) for authentic captures and the remaining asset backlog. No approved project video is supplied yet; media policy/control behavior is tested with test-only fixtures. Final illustration and elaborate animation remain Phase 2 work.

## Editing and publication

Read [inventory](docs/CONTENT_INVENTORY.md) and [verification ledger](docs/CONTENT_VERIFICATION.md) before changing claims. Source-documented does not mean independently rerun. Owner-reported prototypes are labeled. No credentials, private host details, employer evidence or third-party game assets belong here. Repository documentation is public too; never commit sensitive follow-up answers.

Edit canonical records, run checks and preview the build. Omit missing media rather than fabricating screenshots. No résumé file was supplied; the site offers contact by email instead of a broken download.

## GitHub Pages

Preserves `/Portfolio/` and the existing Actions deployment model. Each known route is a directory with `index.html`; no router rewrites are needed. Unknown URLs use generated `404.html`. Page-specific metadata is prerendered. Content is readable before hydration; JavaScript enables filters and mobile disclosure navigation. Main deployment validates first; branch/PR validation does not deploy.

Production publishing follows the owner’s approved merge into `main`. Branch validation never deploys.

The structural-blueprint request explicitly requires a separate committed branch without automatic merging or deployment. Its local results do not change the live site.

## Claude’s next phase

Start with [CLAUDE_VISUAL_HANDOFF.md](docs/CLAUDE_VISUAL_HANDOFF.md). Preserve professional hierarchy, honest statuses, source attribution, canonical routes and accessibility contracts. The final Arcane Tech identity is deferred.

See [architecture](docs/PORTFOLIO_ARCHITECTURE.md) and [change/validation record](docs/PORTFOLIO_CHANGELOG.md).

# Portfolio V2 — Phase 1 change and validation record

Date: October 28, 2026. Branch: `portfolio-v2-foundation`. Scope: professional content, static information architecture, accessibility and handoff. No push, merge or deployment performed. The final commit identifier is available in `git log -1`; it is reported with delivery rather than embedded in its own commit.

## Delivered

- Professional-first landing page with ControlGauge and AgentHQ as featured work; dedicated Work, Experience, Labs & notes, Workshop, About and Contact pages.
- Fifteen canonical project records and detail pages. Creative projects can appear as linked engineering spotlights without duplicating data.
- Source-qualified case studies, implementation/roadmap separation, public evidence links, sanitized component diagrams, honest progress labels, explicit team/tutorial/AI attribution, and limitations.
- Updated undergraduate completion (May 2026) and graduate-study dates (Fall 2026–expected May 2028). Descriptive education labels used while formal degree nomenclature remains unresolved.
- Concise current OCII experience and historical Cyber Fellows operations role, grouped competencies and four dated education/engineering milestones. Earlier leadership retained without invented rankings or event dates.
- Five Workshop records: Bug Hunters Guild, Pokémon Party Fighter, MTG Game Night, LifeDash, and one RealityCheck/TrustLens concept. No copyrighted game assets or fake product screenshots.
- Real AgentHQ DEMO/night screenshot with source, caption, explicit dimensions and media failure fallback.
- Typed data and reusable components replacing the single large JSX page; static prerendered HTML, page metadata, sitemap, local-base asset handling, and generated not-found document.
- Accessible mobile navigation, keyboard Escape/focus return, skip link, native expandable responsibilities, search/category/reset filtering and live results. Responsive neutral presentation; full Arcane Tech makeover deferred.
- Initials favicon replaces template identity. Existing Tailwind integration retained, with explicit link and list styling to account for its reset.
- Tests and validation workflows; Node 24 setup replaces the outdated deployment Node setting. Compatible lockfile updates address dependency audit findings.

## Main file changes

| Area | Files |
| --- | --- |
| Entry/routing | `src/App.tsx`, `src/main.tsx`, `src/routes.ts`, `index.html` |
| Canonical data | `src/content/types.ts`, `src/content/site.ts`, `src/content/projects.ts` |
| Components | `src/components/SiteLayout.tsx`, `Content.tsx`, `Projects.tsx`, `ProjectCaseStudy.tsx`, `Timelines.tsx` |
| Page composition | `src/pages/Pages.tsx` |
| Styles/assets | `src/index.css`, `public/favicon.svg`, `public/media/agenthq-night.png`, `public/media/README.md` |
| Build/tooling | `scripts/prerender.tsx`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `package.json`, `package-lock.json`, `.nvmrc`, `.gitignore` |
| Tests | `tests/setup.ts`, `tests/content.test.ts`, `tests/app.test.tsx`, `tests/e2e/portfolio.spec.ts` |
| CI | `.github/workflows/deploy.yml`, `.github/workflows/validate.yml` |
| Documentation | `README.md`, `docs/CONTENT_INVENTORY.md`, `CONTENT_VERIFICATION.md`, `PORTFOLIO_ARCHITECTURE.md`, `CLAUDE_VISUAL_HANDOFF.md`, this changelog |
| Retired | Old `src/App.jsx`, `src/main.jsx`, unused `src/App.css`, superseded `eslint.config.js` |

## Validation actually executed

- `npm run check`: ESLint passed; 34 unit/component/content tests passed; strict TypeScript passed; production Vite/prerender build passed.
- `npm run test:e2e`: **10 passed** across desktop Chromium and mobile Chromium emulating iPhone 13. The suite directly loads all 22 routes in each profile (44 route/axe scans), checks titles/descriptions/canonical URLs, viewport overflow and runtime errors. No axe WCAG A/AA/2.1 AA or best-practice violations were reported in those scanned initial route states.
- Browser interactions exercised: filtering/reset/empty results, mobile menu visibility and Escape focus return, case-study navigation and refresh, responsibility disclosure by keyboard, skip link, local screenshot loading, static content with JavaScript disabled, 404 document, favicon, robots and sitemap responses.
- Desktop/mobile screenshots captured for home, ControlGauge, and Workshop under ignored `test-results/`; visual review performed. Real AgentHQ screenshot independently inspected before reuse.
- `git diff --check` passed. Dependency audit after compatible updates reported zero vulnerabilities. Tests did not run or certify the source projects themselves.

Initial browser verification caught multiline meta-description replacement and Tailwind-reset link distinguishability. Both were fixed and the complete browser suite reran successfully. Initial missing Node types were resolved. A restricted-sandbox preview process stalled; the task-owned process was stopped and browser validation completed with local HTTP/browser access.

## Known limits and intentionally withheld material

- Formal degree titles, current role reconfirmation, individual authorship breakdowns and employer-specific accomplishments remain editorial follow-ups. No Security+ credential, engagement metric, internal method or nonpublic assessment evidence is published.
- Tulsa Tech Week, Chroma, CMMC Midwest support and workstation imaging omitted pending exact role/date/scope/disclosure confirmation.
- Several games and labs rely on explicitly labeled owner accounts. No public source or demo link was invented. RealityCheck/TrustLens remains one concept.
- Workbench hardware and benchmark figures withheld. Large configured context is not described as proven usable context. No infrastructure identifiers or connection details included.
- No résumé file available; email contact offered. LinkedIn URL retained from existing portfolio, not independently authenticated.
- Browser coverage is Chromium desktop plus mobile emulation, not physical-device, Firefox, Safari, screen-reader, or exhaustive WCAG certification. CI workflows are prepared but have not run remotely because this branch was not pushed.
- GitHub Pages production publication has not been exercised in this task. Static routes and base-aware output were verified locally. Project-level robots.txt cannot configure the origin’s root crawler policy.
- Final visual identity, custom art/fonts, animation and current README/share preview captures belong to Claude’s next phase. Old repository screenshots remain historical.

## Next phase

Read `CLAUDE_VISUAL_HANDOFF.md` for Arcane Tech art direction, CSS/component entry points and twelve functional contracts. Resolve content verification items only with evidence and permitted wording. Continue on a review branch; preserve static routing and tests. Deployment remains the owner’s decision.

## Publication follow-up

After Phase 1 delivery, the owner explicitly authorized pushing and merging this branch. The branch was pushed, and a pull request is used to verify remote checks before merging into main. The earlier no-push/no-deploy statements describe the initial Phase 1 delivery snapshot.

## Education emphasis follow-up

At the owner’s request, education moves immediately after current professional work on the homepage, with an introduction anchor link and larger, distinct graduate/undergraduate panels. Descriptive degree titles are separated from the Cybersecurity field; graduate study remains explicitly in progress. A configurable, one-time decorative underline sweep highlights both titles without moving or hiding text. Reduced-motion disables it. See `EDUCATION_PRESENTATION.md` for parameters. No exact formal degree title or completed master’s credential is inferred.

## Structural blueprint foundation

Branch: `portfolio-v2-structural-blueprint`. The owner explicitly requested a local committed result with no automatic merge or deployment. Existing live main remains unchanged by this phase.

- Added independent `ObservatoryHero`, `WorkshopHero`, and archive introduction components with separate foreground/scene DOM and meaningful static fallbacks.
- Composed Home in the requested professional-first order, Work as an engineering archive, and Workshop as a creative gallery and prototype space with a professional return transition.
- Added the three named scopes to the shared layout, neutral semantic theme tokens, and stable animation integration markers; no elaborate visual effects or final illustration implemented.
- Replaced text-only presentation with reusable media-ready cards, asymmetric editorial grids and feature rows. One canonical project record/detail path is preserved across all views.
- Added typed responsive covers, optional video/poster/captions, screenshot galleries, diagrams and static overviews; added a reviewed AgentHQ DEMO task-board capture and real resized variants.
- Added intent-based video source loading, desktop hover/focus policy, explicit touch/manual controls, reduced-motion/data-saver/slow-network handling, single-player coordination and visibility cleanup. No approved preview video is bundled; test-only mocked playback does not certify real codec/stream behavior.
- Preserved education styling and title animation, base-aware static routing, existing content verification boundaries, navigation and keyboard behavior.
- Rewrote `CLAUDE_VISUAL_HANDOFF.md`; added `MEDIA_MANIFEST.md`; refreshed architecture, inventory, verification and README documentation.

Validation: lint, strict TypeScript, 56 unit/component/content tests, production build (22 routes plus 404/sitemap), and 14 desktop/mobile Chromium tests passed during the structural implementation. The route suite includes 44 route/axe scans, gallery and no-JavaScript checks, education reduced motion, metadata, navigation and overflow checks. Final desktop/390px visual review and staged diff checks are recorded with delivery. Remote CI was not run for this local-only branch.

## Arcane Tech editorial refinement

Branch: `claude/arcane-editorial-refinement`, based on `claude/arcane-tech-visual-v2`. Local commit only; no push, merge or deploy.

- De-boxified the layout system: open sections with single-axis rules, a `--bleed` token for media that reaches the viewport edge, no corner brackets, and frames kept only on controls, real captures, diagram nodes and the education panels.
- Home: the celestial engine is staged as the centrepiece behind the headline, with the approach notes engraved at its corners and credentials as a ruled ledger; the introduction is an open editorial statement; disciplines and timelines became ledgers; education became an unboxed band; a full-bleed Workshop threshold with a static reactor seal replaced the boxed invitation.
- Work: an exhibition contents index; ControlGauge as a diagram-led exhibit with legible zoned SVG and no horizontal scroll; AgentHQ with both real DEMO captures layered and annotated; the Local AI workbench as a full-bleed exhibition whose plan lifts and lights on scroll; secondary work as an `EA-xx` editorial index.
- Workshop: a darker Sanctum palette, retired SOFT/WONK axes, a new layered arcane reactor hero, two individually composed artifact spreads, an artifact index with a preview plate, open artifact plates, and five new concept plates.
- Diagrams render an ordered node and relationship list for narrow screens and assistive technology.

Validation: see `VISUAL_ACCEPTANCE.md`.

## Portfolio V3: Cybernetic Editorial and the Technomancer Workshop

Branch: `claude/portfolio-v3-cybernetic-editorial`, based on `claude/arcane-editorial-refinement`. Local commit only; no push, merge or deploy.

- Professional scopes moved to a dark Cybernetic Editorial system: graphite surfaces, signal blue and cyan, silver, Manrope display type. Brass, amethyst, Fraunces and runes no longer appear on professional routes.
- New animated MM monogram (signal variant for professional pages, arcane variant for the Workshop) in the header, footer, hero, case-study watermark and favicon. The insignia was retired.
- Home: new typography-led professional hero with a signal field from the monogram; current experience and education now follow the hero directly, joined by one career signal rail; expertise; a combined labs/research/milestones section; a small Workshop doorway.
- The Celestial Engine moved from Home into the Workshop hero, recoloured with a rune engraving and cyan energy core, running inside the SVG reactor, which remains the static fallback.
- Diagrams gained travelling data packets and a local-first boundary for the AI workbench; planned work stays dashed and still.
- Retired: `ObservatoryHero`, `OrreryArt`, `ChapterTransition`, `Insignia`.

Validation: see `VISUAL_ACCEPTANCE.md`.


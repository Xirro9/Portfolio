# Claude visual handoff — Phase 2

## Start here

Phase 1 provides a working professional information foundation, not a final design. Read `CONTENT_INVENTORY.md`, `CONTENT_VERIFICATION.md`, and `PORTFOLIO_ARCHITECTURE.md`, then run `npm ci`, `npm run check`, and `npm run dev`. Inspect `/Portfolio/` and the production output using `npm run preview` after a build. Stay on a dedicated branch. Do not deploy or merge without the owner’s permission.

## Audience and hierarchy

Audience: technical hiring reviewers, cybersecurity peers, collaborators, and readers investigating actual engineering work. The home page establishes Mahin’s professional security identity, featured ControlGauge/AgentHQ work, current employment, disciplines, AI infrastructure, education and milestones before its subtle Workshop invitation. Contact and résumé-by-email follow.

Work is professional software/security/AI infrastructure; Labs is contained security practice and notes; The Workshop is creative games/experiments. AgentHQ belongs in Work despite its playful office. Bug Hunters and LifeDash can be engineering spotlights while retaining a single canonical Workshop record. Preserve the one-record/one-detail-page model.

## Creative direction: Arcane Tech

The owner wants futuristic engineering with restrained fantasy, arcane and celestial influences: dark, elegant, technically sophisticated, slightly mysterious, custom and handcrafted. Potential palette: midnight navy, deep slate, antique brass/gold, muted amethyst, warm ivory. These are preferences, not approved final tokens.

Avoid generic purple SaaS styling, indiscriminate glass cards, giant gradient blobs, fake terminals, random glyphs, illegible fantasy fonts, and excessive scroll motion. Do not let decoration outrank reading, accuracy or credibility. Phase 1 intentionally uses a plain dark editorial layout without a finalized fantasy theme.

## Files and visual entry points

`src/index.css` owns color, font, width and section-spacing custom properties. Main selectors: `.site-header`, `.page-heading`, `.project-card`, `.project-grid`, `.discipline-grid`, `.timeline`, `.architecture-flow`, `.case-study-layout`, `.case-study-media`, `.workshop-invitation`, `.contact-panel`. Component markup is in `src/components`; page composition is in `src/pages/Pages.tsx`. Shared copy is in `src/content`, never write duplicated project objects into new visual components.

`src/routes.ts` and `scripts/prerender.tsx` supply real static routes and page metadata. The app hydrates server-rendered content. Changes must render without browser-only globals during prerender. A JS animation should not determine whether factual content exists or is readable. No hidden-until-scroll default state.

## Available media and needed assets

- `public/media/agenthq-night.png`: a real 1280×720 application capture, visibly DEMO, with settings/night ambience. Keep caption and source. It demonstrates presentation, not live connectivity.
- AgentHQ public README links additional captures. Inspect each for identifiers or private telemetry before copying; do not substitute a generated product screenshot.
- ControlGauge has no approved product capture in this branch. Its semantic architecture flow is a safe illustration of components. Create a real sanitized capture only from the implemented desktop foundation; do not depict planned AI/assessment features as functional.
- Architecture flows for workbench and labs are sanitized conceptual component summaries, not actual network diagrams. They may be visually redesigned if labels and status boundaries survive.
- Older `.github/readme` screenshots and source `hero.png` are historical assets, not current-site screenshots. Original template SVGs are unused and not visual direction.
- No Pokémon/MTG card/game art is distributed. Rights and publication approval must be established before adding media or playable builds.
- Custom identity art, restrained background atmosphere, typography selection, original illustrations, and Workshop-specific visual treatment are still to be designed. Image slots are optional; do not add fake UI placeholders.

## Animation opportunities

Navigation transitions, restrained project hover/focus feedback, small status transitions and architecture-step emphasis can support the design. The Workshop may have a stronger imaginative character. Every animation must respect reduced motion, preserve keyboard use, and avoid content reveal dependencies. Avoid canvas/WebGL as a prerequisite for reading. Do not add heavy runtime packages merely for decoration.

## Functional contracts to preserve

1. `/Portfolio/` base and all canonical generated routes, directory index output, direct loads/refreshes, generated 404, sitemap and route-specific metadata.
2. One canonical project record and page. Related links and filtered spotlights reference that record.
3. Status distinctions: implemented vs planned, source-reported results vs portfolio-tested results, live Hermes vs experimental OpenCode, prototype vs concept vs historical work.
4. Source/attribution disclosures. Preserve team/tutorial/AI assistance credits and avoid inventing Mahin’s individual responsibility breakdown.
5. Professional-first homepage and navigation; Workshop content does not displace credentials.
6. Typed content validity, no unsafe external link schemes, no invented repository or demo links.
7. One H1 per page, sequential headings, semantic landmarks, skip link, visible focus, native keyboard disclosures, explicit filter labels/live result count, responsive reading and 44px interaction controls.
8. Mobile menu expanded/controls state, hidden collapsed links, Escape focus return, selection closing and link availability. Use ordinary links, not ARIA menuitem semantics.
9. Local screenshot dimensions/alt/caption, lazy lower-page media, graceful media failure and no confidential assets.
10. Static build must remain readable and navigable without JavaScript. Keep effects SSR-safe and hydration deterministic.
11. Existing test contracts. Run lint, strict TypeScript, unit/component tests, production build and desktop/mobile browser + axe checks after functional changes.
12. No production push or deployment without explicit permission.

## Unfinished design tasks

Choose final typefaces with readable fallbacks; define final tokens; refine editorial rhythm and project hierarchy; design bespoke arcane identity; consider distinctive Workshop composition; redesign semantic diagrams; capture current portfolio preview images after the visual pass. Per-page OG text exists; a new rights-cleared share image is optional future work. Performance budget: avoid regressions from the Phase 1 static-content baseline and do not block reading on media/animation loading.

## Content tasks remain separate

Exact formal degree names, employer-specific metrics and methodology disclosures, some personal contribution attribution, event dates, creative source links and asset rights are not settled by visual redesign. See the checklist. Do not fill these gaps with invented copy. No Security+ credential should appear as earned without confirmation.

# Portfolio architecture

## Deployment and routes

React 19 + TypeScript + Vite + the existing Tailwind 4 integration. No CMS, backend, router dependency, telemetry, or contact-form service. Production is prerendered static HTML, enhanced by React hydration for filters, menu, and media error state. Navigation uses ordinary anchors. Full page transitions are intentional: direct loads, native browser history, focus reset and no router-fallback tricks.

`src/routes.ts` defines route metadata and `/Portfolio/` link handling. `src/content/site.ts` defines navigation and deployment identity. `vite.config.js` retains `base: '/Portfolio/'`. If hosting changes, update these base settings together and rerun tests.

Routes: `/`, `/work/`, `/experience/`, `/labs/`, `/workshop/`, `/about/`, `/contact/`. Every project gets exactly one `/{home}/{slug}/` page. Home is one of work, labs or workshop. There are currently 15 projects and 22 published routes. There is no parallel `/work/bug-hunters-guild/` copy: professional spotlights link directly into The Workshop.

`npm run build` runs strict TypeScript, Vite, then `scripts/prerender.tsx`. The script renders the same App component used by the browser into each directory’s `index.html`, writes route-specific title/description/canonical/Open Graph tags, a static sitemap and a `404.html` with noindex. GitHub Pages serves generated directories directly and the generated 404 for unknown routes. The document’s asset references are all base-prefixed. No server rewrite is required. Trailing slash canonical URLs are used; GitHub Pages handles directory redirects.

The development server can render arbitrary routes from the client entry; the production output must be tested after a build. Vite preview is a development convenience, not an exact GitHub Pages HTTP-status emulator. The actual deployment serves missing routes with HTTP 404. `404.html` and invalid slug rendering are tested separately.

Sitemap is generated from canonical records, not hand-maintained. A project-site `robots.txt` is emitted, but crawlers normally read the origin-root `/robots.txt`; the portfolio cannot control that file from a project Pages deployment. Route HTML and sitemap are the primary discovery mechanisms.

## Data flow

`content/types.ts` → typed records in `content/site.ts` and `content/projects.ts` → reusable components and pages → App route selection → prerendered HTML and hydrated browser UI.

Project records carry status, verification basis, canonical home, summary, problem, role/attribution, architecture, implemented behavior, challenges, safeguards, results, limitations, plans, lessons, evidence, optional media, and related record IDs. Results are not benchmark fields. Plans cannot silently become implemented features. Category and tags allow multiple views without duplicate records. TypeScript and content tests validate shape, relations, routes, links and publication boundaries.

Experience, education, skills, milestones, notes, contact, certifications and publications have separate models. Credential/publication collections are deliberately empty until earned evidence exists; there are no empty pages. Approximate historical dates stay text where precision is unknown. “Present” is explicitly anchored to the content snapshot in the footer.

## Components

| Module                 | Responsibility                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `SiteLayout.tsx`       | Header, central navigation, menu state/escape-focus behavior, skip link, main and footer          |
| `Content.tsx`          | Heading primitives, bullet lists, safe external links, contact panel, grouped disciplines         |
| `Projects.tsx`         | Status, canonical cards/grid, native search/select/reset filter, live result count                |
| `ProjectCaseStudy.tsx` | Shared evidence-led detail sections, sanitized architecture flow, media fallback, related records |
| `Timelines.tsx`        | Employment disclosures, education, milestones and historical activities                           |
| `pages/Pages.tsx`      | Page composition only; project/experience facts live in content records                           |
| `App.tsx`              | Normalized route selection and not-found rendering                                                |

## Interaction and accessibility

Semantic landmarks; one H1 per page; sequential headings; native details/summary for responsibility disclosures; labeled search/select; text status labels; live filter count; real anchors for navigation; no positive tabindex or simulated terminal. Focus indicators and a skip link are preserved. Mobile navigation uses a button with expanded/controls state, hides collapsed links, closes on selection, and returns focus to its trigger when Escape is pressed inside the menu. This is an inline disclosure, not a modal or ARIA application menu; no focus trap.

No motion is needed for Phase 1. A reduced-motion override guards future additions. Images have explicit dimensions, descriptive alt and a visible source caption; lower-page screenshot loads lazily and fails gracefully. External links navigate in the same tab, preserving user control; unsafe schemes are rejected. No network dependency is required to read local screenshot or page content.

## Publication boundary

Only safe public content records are imported into the browser bundle. `docs/` is not a Vite public directory. Documentation is nevertheless visible in repository history; sensitive verification answers belong outside Git. `.private/` is ignored as a guard, not a storage recommendation. No raw employer assessments, infrastructure configurations, inventory outputs or player connection artifacts are copied.

## Updating and validation

1. Check source and disclosure safety. Update the sanitized ledger before expanding claims.
2. Edit the canonical content record; add/adjust public evidence and actual progress status.
3. Use a local, rights-cleared image under `public/media/` with source attribution and correct dimensions, or leave media absent.
4. Run `npm run check`, then `npm run test:e2e` after production build. New project routes and sitemap entries are generated automatically.
5. Review on a branch. Push/merge/deploy require the owner’s explicit permission; this task made a local commit only.

CI validation runs on PRs and branch pushes. Production workflow retains main-only automatic publishing and its manual dispatch. Deployment uses Node 24, which satisfies the installed Vite toolchain; the old Node 20 setting was too old for the existing Vite major.

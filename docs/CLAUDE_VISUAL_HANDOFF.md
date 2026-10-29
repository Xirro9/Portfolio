# Claude visual handoff — Portfolio V2 structural foundation

## Start here

This branch implements the owner's final structural blueprint. It is a functional static portfolio foundation, not the finished Arcane Tech design. **Do not merge or deploy this branch automatically.** The owner explicitly requested a separate local branch and a committed result for this phase.

Read this file, `PORTFOLIO_ARCHITECTURE.md`, `MEDIA_MANIFEST.md`, and `CONTENT_VERIFICATION.md`. Use Node 24, then run:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
npm run dev
```

Open `/Portfolio/`. For production behavior, run `npm run build` and `npm run preview`, then inspect `/Portfolio/`, `/Portfolio/work/`, `/Portfolio/workshop/`, one technical case study and one creative notebook. The dev server alone does not verify prerendering or the deployment base.

## Three identities, one application

| Scope                   | Routes                                       | Intended atmosphere                                                   | Implementation                                             |
| ----------------------- | -------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| `observatory`           | Home, Experience, About, Contact             | Home: roughly 85% professional / 15% restrained arcane                | Professional introduction, credibility, work and education |
| `engineering-archive`   | Work, Labs and their canonical detail routes | Work: roughly 95% professional / 5% arcane                            | Evidence-led project showcases and technical depth         |
| `technomancer-workshop` | Workshop and its canonical detail routes     | Expressive creative engineering, clearly connected to the same person | Independent hero, creative gallery and prototype notebooks |

`themeForPath` in `src/routes.ts` assigns the scope. `SiteLayout` wraps the shared header, main and footer in `.portfolio-shell[data-theme]`. No duplicated applications, navigation systems or project databases. These scopes currently use the same deliberately neutral color values; the distinction is structural. Choose the final palette and art later.

Work is cybersecurity/software/AI infrastructure. Labs is contained security practice and notes. Workshop is games and creative experiments. AgentHQ stays professional despite its pixel-art interface. Creative engineering spotlights link to one canonical Workshop record/page.

## Page composition contracts

### Home — professional (scope id `observatory`)

V3 note: `ObservatoryHero` was replaced by `src/components/heroes/ProfessionalHero.tsx` (animated monogram and signal field; no scene), and the Celestial Engine moved to `WorkshopHero`. Home now runs hero, experience, education, projects, expertise, labs/milestones, Workshop doorway, contact. The original Phase 1 contract follows for history. `src/components/heroes/ObservatoryHero.tsx` was the professional hero, with separate `.observatory-foreground` and `.observatory-visual` layers. It has a real headline, concise description, Work CTA, and Experience CTA. The visual layer contains a `[data-scene="celestial-engine"]` integration point and a meaningful static Requirements → Systems → Evidence overview.

The sequence in `pages/Pages.tsx` is:

1. Professional hero.
2. Compact introduction and credentials, including an Education anchor.
3. Featured ControlGauge and AgentHQ media rows.
4. Engineering disciplines.
5. Current professional experience preview.
6. Education and selected milestones.
7. Technical writing/research only if the publication collection contains real content.
8. Subtle Workshop invitation.
9. Contact and shared footer.

There are no invented counts, fake live signals, or hidden-until-scroll text. Education retains its owner-requested highlighted panels and independent, one-shot title underline sweep. Controls remain in `educationAnimation`; see `EDUCATION_PRESENTATION.md`.

### Work — The Engineering Archive

`ArchiveHero.tsx` introduces the professional archive. Sections: featured media rows; categorized/filterable canonical collection; a technical case-study index; technically relevant creative spotlights; selected labs/foundational work with a route to the full Labs collection; existing engineering notes; contact CTA.

`FeaturedProjectShowcase` renders one exhibit per project (`data-exhibit`: `diagram`, `media`, `arch`, `table`, or a generic `spread`) with a fixed DOM order of heading, visual, specification, actions; CSS grid places them differently. `ProjectGrid` renders professional work as an editorial index (`ProjectCard` rows) and creative work as open artifact plates; the creative `ProjectExplorer` uses `ArcaneIndex`. Keep DOM order and focus order aligned if changing the composition. Do not turn the final pattern back into plain text-only cards.

### Workshop — The Technomancer's Sanctum

`src/components/heroes/WorkshopHero.tsx` is independent markup and composition, not the professional hero with a string swap. It includes its own creative introduction, a scene area `[data-scene="arcane-workbench"]`, static Imagine / Build / Play & refine content, a gallery CTA, and professional return links.

The page has a playful introduction, selected Bug Hunters Guild and MTG Game Night showcases, a filterable artifact index (`ArcaneIndex`), smaller prototypes/concepts, and a return-to-Work/Home transition. There are no empty creative-notes sections. Magical circuitry, spell circles, original pixel art, project portals and small Easter eggs can be designed in Phase 2; they are not implemented as token placeholder effects here.

### Canonical case studies

`ProjectCaseStudy` shares the same records and editorial fields, with `technical` or `creative` treatment. Technical pages prioritize problem, role, architecture, implementation, safeguards and evidence. Creative notebooks place available media earlier and use creative-intent/current-prototype labels, while preserving role, limitations and evidence. `layout` is overridable without copying project data. All 15 canonical detail routes remain unchanged.

## Theme and CSS entry points

- `src/index.css`: shared resets, typography, core UI, education and existing accessibility rules.
- `src/structure.css`: scope values, neutral hero/layout composition, media frames, editorial showcases, Workshop cards and future integration selectors.
- `--theme-background`, `--theme-surface`, `--theme-text`, `--theme-muted`, `--theme-accent`, `--theme-border`, `--theme-effect-accent`, `--theme-focus`: semantic colors, aliased to existing `--color-*` consumers.
- `--theme-font-body`, `--theme-font-display`, `--theme-type-display`, `--theme-type-section`, `--theme-type-subheading`, `--theme-type-body`, `--theme-type-caption`: font and hierarchy overrides.
- `--theme-space-section`, `--theme-space-grid`, `--theme-space-page-inline`: rhythm and density hooks.
- `--theme-motion-short`, `--theme-motion-base`, `--theme-motion-easing`, plus `--motion-enabled`: future motion settings. Honor reduced motion; do not use these as permission to hide factual content.

Override tokens under a named scope instead of forking components or global application state. Existing education blue/brass colors are an earlier owner-approved accent; they can be tuned through the education selectors without removing its progress distinction.

## Project media model and components

`Project.media` is now a typed `ProjectMediaSet`: required cover when present; optional preview, screenshot array and diagram. `MediaImage` includes local path, descriptive alt, caption, dimensions, optional source URL, responsive source widths/sizes and optional light/dark source variants. Variants are supported but not currently needed. `MediaVideo` includes a local path/type, poster record, dimensions, descriptive caption/text and optional caption-track/source reference. All production media paths are relative to `public/`; `mediaUrl` applies `/Portfolio/`.

| Component                 | Contract                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `ProjectMedia`            | Dimensioned responsive image, optional color-scheme source, lazy loading by default, visible caption/source, graceful error state |
| `ProjectPreview`          | Static cover by default; optional source-on-intent video, native controls and explicit play/pause                                 |
| `FeaturedProjectShowcase` | Media-led professional/creative editorial row with canonical actions                                                              |
| `ProjectGallery`          | Manual screenshot selection with pressed state, matching caption, live count and no-JavaScript original-image links               |
| `ArchitectureDiagram`     | Real diagram image if supplied, otherwise a semantic component flow with stable connector/step hooks                              |
| `CaseStudyMedia`          | Chooses cover, preview and/or gallery from the canonical record                                                                   |
| `WorkshopProjectCard`     | Open artifact plate (bare artwork, then the record), retaining status and verification labels                                     |
| `ArcaneIndex`             | Workshop index; hover/focus selects a decorative preview plate; every entry keeps its own text and canonical link                |
| `StaticProjectOverview`   | Clearly labeled typographic overview when no approved product capture exists; never a screenshot or invented demo                 |

Missing assets are recorded in `MEDIA_MANIFEST.md`. Do not fill gaps with fabricated product interfaces. No actual approved preview video is supplied in this branch. The runtime and policy tests cover preview behavior; decoding or streaming a real project clip has not been demonstrated by this task. Capture actual working software before adding a clip. Use short, optimized, muted clips; provide captions/transcript when relevant audio is retained.

### Preview behavior to preserve

On fine-pointer desktop with hover support, no reduced-motion preference and no known constrained network, hover or focus may start a preview. On touch/coarse-pointer devices, reduced motion, Save-Data, slow-2g or 2g, only explicit play starts it. If a browser lacks connection information, available motion/pointer signals are used; there is no claim of detecting every slow network.

No video `src` or poster is attached before intent; `preload="none"` and explicit width/height are set. The static cover is a normal lazy image. Only one preview can play at a time; offscreen/unmounted media and hidden tabs pause. Playback errors retain the cover. Policy changes stop automatic playback. Manual user-initiated playback remains possible under reduced motion. Preserve both the native controls and the explicit play/pause control. No sources are fabricated merely to populate the media model.

## Animation integration points

Stable `data-motion-slot` hooks exist for `route-content`, `hero-foreground`, `hero-heading`, `celestial-engine`, `archive-introduction`, `workshop-title`, `workshop-heading`, `workshop-illustration`, `featured-project`, `expanding-imagery`, `project-card`, `workshop-portal`, `project-imagery`, `project-static-visual`, `project-preview`, `case-study-media` and `architecture-lines`. Heading spans expose `data-motion-part="heading-line"`; diagram items expose `data-architecture-step` and optional `.architecture-connector` elements.

These are integration points, not a required animation library. Use CSS or a small controller outside factual content components. The empty scene mount is decorative and separate from the static fallback. If a future canvas/WebGL scene loads successfully, its controller may progressively replace the visual fallback while retaining a meaningful text alternative. A failure must leave the fallback visible. Keep scene interactions keyboard accessible; decorative overlays currently do not intercept pointer input.

Prepare restrained entrance sequences, expanding imagery, masks, diagram-line effects or document transitions without moving content into animation-only rendering. Do not add scroll hijacking, full-screen loading gates, automatic carousels or simulated telemetry. Persistent future motion needs pause controls. Do not let font/image loading or animation initialization block reading.

## Mobile and accessibility contracts

At 900px, heroes become deliberate stacked compositions; professional process steps become a compact row, then a readable list at 600px. Workshop stages stack their step labels and descriptions, and transitions become tap-friendly links. Feature rows become a single DOM-ordered column. Workshop gallery becomes one column on phones. Screenshot frames preserve full UI captures (`object-fit: contain`) rather than cropping essential evidence.

Keep one H1, sequential headings, shared semantic landmarks, descriptive page metadata, visible focus, skip link, 44px interaction controls, normal link semantics, labeled filters/live result count, keyboard disclosures and mobile-menu Escape/focus behavior. No hover-only essential information. Gallery selection is not a modal or ARIA tab system. Content, hero fallbacks and navigation work without JavaScript. Reduced-motion leaves everything readable and static.

## Evidence and boundaries

The real media in this branch is AgentHQ's DEMO/night office capture and DEMO task-board capture, with 640/960/1280px choices and source attribution. Neither demonstrates live connectivity. No employer screenshots, local hostnames, assessment results, player QR links, Pokémon assets or MTG card art are included. Older repository preview screenshots remain historical, not current product art.

Formal education naming, some personal contribution attribution, detailed employer accomplishments, event facts and creative-source availability remain unresolved in `CONTENT_VERIFICATION.md`. Do not solve missing evidence through visual design. Do not claim Security+ earned or ControlGauge assessments/local AI implemented.

## Art direction still belongs to Phase 2

Arcane Tech: futuristic engineering with restrained magical/celestial atmosphere, dark elegance, readable type and handcrafted identity. Potential palette: midnight navy, deep slate, antique brass/gold, muted amethyst, warm ivory. These are preferences, not final values.

Avoid generic purple SaaS panels, endless glass, giant gradient blobs, fake terminals, random glyphs, illegible fantasy typography and excessive scroll effects. Home and Work establish credibility; the Workshop can express playfulness without becoming an enterprise dashboard. Preserve common navigation, footer and identity.

Begin by setting scope tokens and typography, then design the professional and creative heroes independently, then refine media-led rows/gallery and technical diagrams. Capture fresh portfolio/share previews only after the visual pass. Validate with `npm run check` and `npm run test:e2e`, and inspect desktop plus 390px layouts. Do not change `/Portfolio/`, canonical routes, status/evidence distinctions or publication boundaries to accommodate an effect.

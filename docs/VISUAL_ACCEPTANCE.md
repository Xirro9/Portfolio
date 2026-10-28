# Visual acceptance — first Arcane Tech pass

Method: a production build (`vite build` plus prerender) served by `vite preview` at `/Portfolio/`. Screenshots were taken with headless Chromium (SwiftShader WebGL), after the scroll-triggered effects had run.

## Inspected

| Width  | Pages / states                                                                                                             |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| 1440   | Home hero (WebGL live), Home full scroll, Home scrolled to the ControlGauge exhibit, Work full, Workshop hero and featured gallery, AgentHQ technical case study, MTG creative notebook, Home with reduced motion (static SVG orrery) |
| 1024   | Home hero                                                                                                                  |
| 768    | Workshop hero                                                                                                              |
| 390    | Home hero, Workshop hero, Work, Bug Hunters Guild notebook                                                                 |

No horizontal overflow and no page errors were recorded on any capture.

## Refinement pass 1 (issues observed → fixed)

1. The ControlGauge and Workbench diagram nodes collapsed to the top row. GSAP `from({ y })` overwrote the SVG translate, so it now uses a relative `y: "+=18"`.
2. The expanding-imagery clip cut into the provenance captions. The clip now applies to the visual frame only.
3. The copy band on project illustrations hid labels (for example NEXT FIT). The copy now sits below the illustration.
4. The hero headline wrapped to five lines. The column ratio and type scale were rebalanced to three lines.
5. The SVG numerals duplicated the WebGL disc numerals in live mode. They now hide when the scene is live.
6. CSS `transition: transform` fought the GSAP reveals on buttons and portals. Transitions now apply only on hover, and the tweens use `clearProps`.

## Refinement pass 2

1. At 390px the heroes stayed two-column, because `arcane.css` overrode the structural breakpoint. Both heroes now stack under 900px.
2. Creative notebooks and media-less technical case studies opened without a visual. They now open with the project illustration.
3. The featured copy evidence links sat tight under the CTA. Spacing increased.

## Validation

- `npm run check`: lint (0 errors, 3 fast-refresh warnings), 56/56 unit tests and the build all pass.
- `npm run test:e2e`: 14/14 pass (desktop and mobile), including axe WCAG 2.1 AA on every route, no-JS hero fallbacks, mobile menu Escape and focus return, gallery controls, and the education motion and reduced-motion checks.

## Remaining gaps

- WebGL was verified only on SwiftShader. It has not been tested on a real GPU, Safari, or low-power phones.
- The lazy Celestial Engine chunk is ~981 kB raw / ~266 kB gzip, home only and after first paint. Trimming drei is a possible follow-up.
- Not screenshot-inspected: Experience page, Labs, About, Contact, 404, and the open mobile menu. These are covered only by the e2e and axe runs.
- There is no real ControlGauge capture and no project video. Those remain capture-backlog items, so nothing was simulated.
- Rive was not used (see `MOTION_AND_MEDIA.md`).

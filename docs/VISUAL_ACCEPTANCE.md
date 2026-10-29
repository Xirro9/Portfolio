# Visual acceptance

## Portfolio V3 pass

Method: production build plus prerender, served by `vite preview` at `/Portfolio/`, inspected in headless Chromium (SwiftShader WebGL) as scrolled viewports.

### Inspected

| Width | Pages / states |
| ----- | -------------- |
| 1440  | Home (all sections), Work (all sections), Experience, About, AgentHQ and memory-allocator case studies, Workshop hero (WebGL live) and featured artifacts, Workshop with reduced motion (SVG reactor fallback) |
| 1024  | Home |
| 768   | Home |
| 390   | Home (hero through education), Work (exhibits and diagram index), Labs, Workshop hero, Home with the menu open |

No horizontal overflow or page errors on any capture.

### Corrections made

1. The hero monogram rendered as fragments: `vector-effect: non-scaling-stroke` broke the normalised dash animation inside the scaled field. Removed for the field.
2. The hero headline broke into four lines at 1440px; the copy column widened and the type scale came down to two lines.
3. The Workshop kicker mark rendered at full column width (its sizing rule went with the retired insignia); restored.
4. Exhibit numerals on professional exhibits removed (kept in the Workshop).
5. A React lint error: the Celestial Engine mutated a memoised material passed to a hook; the opacity now updates through the mesh.
6. At 390px the hero mark crowded the kicker; more top padding.
7. Professional cover art still used brass and violet accents; moved to the signal palette.
8. The Bug Hunters Guild title overlapped its lantern; the overlap was removed.

### Validation

- `npm run check`: lint (0 errors, 2 pre-existing fast-refresh warnings), 56/56 unit tests, typecheck and build pass.
- `npm run test:e2e`: 14/14 pass (desktop and mobile), including axe WCAG 2.1 AA on every route and the no-JavaScript hero checks. Tests were updated for the new structure: Home must not contain the celestial scene, Workshop must, and the Home hero must render its heading without JavaScript.

### Remaining gaps

- WebGL verified only on SwiftShader. The Celestial Engine chunk (~981 kB raw / ~266 kB gzip) now loads only on the Workshop page.
- No real ControlGauge capture or project video exists; nothing was simulated.
- Motion was judged from screenshots, not recordings.

## Editorial refinement pass (history)

Method: production build plus prerender, served by `vite preview` at `/Portfolio/`, inspected in headless Chromium (SwiftShader WebGL). Captures were taken as scrolled viewports, so scroll-scrubbed effects were judged in their in-view state rather than their pre-scroll state.

### Inspected

| Width | Pages / states |
| ----- | -------------- |
| 1440  | Home (all sections), Work (all sections), Workshop (all sections), ControlGauge technical case study, MTG creative notebook, Experience, Labs, About, 404, Home and Workshop with reduced motion |
| 1024  | Home hero and exhibits, Workshop hero |
| 768   | Home hero, Work exhibits and diagram index, Workshop hero |
| 390   | Home, Work, Workshop (full scroll), Bug Hunters Guild notebook, Contact with the menu open |

No horizontal overflow or page errors on any capture after the fixes below.

### Corrections made across the passes

1. Splicing the stylesheet dropped the hero kicker and line-mask rules; the kicker insignia rendered at full column width. Restored.
2. The AgentHQ task-board capture was positioned with a transform and spilled into the next section. It now has its own grid row with a negative top margin, so layout accounts for it.
3. The Home Workshop seal and its copy landed in different grid rows (auto-placement). Both are pinned to row 1.
4. Hero annotations collided with the headline and the CTA at 1024px. Between 901px and 1200px the annotations now sit below the instrument as a three-column row.
5. The ControlGauge planned node was narrower than its title, and its dashed edge crossed the text. The node was widened and the edge enters below the text.
6. A GSAP loop paired six gimbal ellipses with three values (`ry: undefined` console errors). It now animates per gimbal.
7. On phones the layered AgentHQ capture covered the first caption; it now follows it.
8. Index links wrapped their arrow onto a separate line; the arrow is joined with a non-breaking space and the column widened.
9. The Bug Hunters Guild lanterns sat behind the overlapping title; the overlap was reduced.
10. The Workshop "THE" label became 7px on phones; it has a 0.72rem floor.

### Validation

- `npm run check`: lint (0 errors, 3 pre-existing fast-refresh warnings), 56/56 unit tests, typecheck and build all pass.
- `npm run test:e2e`: 14/14 pass (desktop and mobile), including axe WCAG 2.1 AA on every route, no-JavaScript hero fallbacks, gallery controls, filters, mobile menu Escape and focus return, and education motion/reduced-motion.

### Remaining gaps

- WebGL and SVG motion were verified only on SwiftShader, not a real GPU, Safari or low-power phones.
- The Celestial Engine chunk is unchanged (~981 kB raw / ~266 kB gzip, Home only, after first paint).
- There is still no real ControlGauge capture and no project video; the exhibits use the diagram and the existing AgentHQ captures.
- The Workshop reactor's entrance and idle loops were checked as screenshots, not as recorded video.

## First Arcane Tech pass (history)

Method: a production build (`vite build` plus prerender) served by `vite preview` at `/Portfolio/`. Screenshots were taken with headless Chromium (SwiftShader WebGL), after the scroll-triggered effects had run.

### Inspected

| Width  | Pages / states                                                                                                             |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| 1440   | Home hero (WebGL live), Home full scroll, Home scrolled to the ControlGauge exhibit, Work full, Workshop hero and featured gallery, AgentHQ technical case study, MTG creative notebook, Home with reduced motion (static SVG orrery) |
| 1024   | Home hero                                                                                                                  |
| 768    | Workshop hero                                                                                                              |
| 390    | Home hero, Workshop hero, Work, Bug Hunters Guild notebook                                                                 |

No horizontal overflow and no page errors were recorded on any capture.

### Refinement pass 1 (issues observed → fixed)

1. The ControlGauge and Workbench diagram nodes collapsed to the top row. GSAP `from({ y })` overwrote the SVG translate, so it now uses a relative `y: "+=18"`.
2. The expanding-imagery clip cut into the provenance captions. The clip now applies to the visual frame only.
3. The copy band on project illustrations hid labels (for example NEXT FIT). The copy now sits below the illustration.
4. The hero headline wrapped to five lines. The column ratio and type scale were rebalanced to three lines.
5. The SVG numerals duplicated the WebGL disc numerals in live mode. They now hide when the scene is live.
6. CSS `transition: transform` fought the GSAP reveals on buttons and portals. Transitions now apply only on hover, and the tweens use `clearProps`.

### Refinement pass 2

1. At 390px the heroes stayed two-column, because `arcane.css` overrode the structural breakpoint. Both heroes now stack under 900px.
2. Creative notebooks and media-less technical case studies opened without a visual. They now open with the project illustration.
3. The featured copy evidence links sat tight under the CTA. Spacing increased.

### Validation

- `npm run check`: lint (0 errors, 3 fast-refresh warnings), 56/56 unit tests and the build all pass.
- `npm run test:e2e`: 14/14 pass (desktop and mobile), including axe WCAG 2.1 AA on every route, no-JS hero fallbacks, mobile menu Escape and focus return, gallery controls, and the education motion and reduced-motion checks.

### Remaining gaps

- WebGL was verified only on SwiftShader. It has not been tested on a real GPU, Safari, or low-power phones.
- The lazy Celestial Engine chunk is ~981 kB raw / ~266 kB gzip, home only and after first paint. Trimming drei is a possible follow-up.
- Not screenshot-inspected: Experience page, Labs, About, Contact, 404, and the open mobile menu. These are covered only by the e2e and axe runs.
- There is no real ControlGauge capture and no project video. Those remain capture-backlog items, so nothing was simulated.
- Rive was not used (see `MOTION_AND_MEDIA.md`).

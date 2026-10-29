# Motion and media

## Dependencies added

| Package                                              | Version         | Use                                                                    |
| ---------------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| `gsap`, `@gsap/react`                                 | 3.15.0 / 2.1.2  | ScrollTrigger choreography, Workshop timelines, scene entrance drive   |
| `three`, `@react-three/fiber`, `@react-three/drei`    | 0.186.1 / 9.8.2 / 10.7.9 | Celestial Engine in the Workshop (React 19 compatible; fiber peer `<19.4`)  |
| `@fontsource-variable/fraunces`, `…/manrope`, `@fontsource/ibm-plex-mono` | 5.3.0 | Self-hosted OFL fonts                          |

Not used: **Rive**. Exporting `.riv` needs an authenticated editor, so the Workshop scene is original SVG with GSAP, as the brief's fallback allows. Paper Shaders and Blender were optional and not needed: CSS and SVG covered the effects.

## Scenes

**Professional identity** (`visual/Monogram.tsx`, `heroes/ProfessionalHero.tsx`, `visual/SignalRail.tsx`; CSS + GSAP)
- Monogram entrance in CSS: traces draw, pads and via resolve, one sheen passes; then static. The header mark repeats the sheen on hover.
- Hero signal field: lines draw once (staggered), three carry a rare pulse (8 s cycle, one visible at a time), depth-weighted pointer drift, and a slight scroll parallax.
- Career rail: geometry is measured from the rendered experience and education sections (`ResizeObserver`), drawn by scroll progress (`scrub`), with nodes popping in once.

**Celestial Engine** (`visual/CelestialEngine.tsx`, lazy chunk, Workshop only)
- Moved from the professional homepage into the Workshop hero, where it runs inside the reactor's housing (`.celestial-mount`).
- Procedural R3F instrument: a canvas-texture disc engraved with two bands of the original rune alphabet, a bezel with 120 instanced ticks, four armillary rings, a three-arm orrery, an icosahedral core with an edge shell, two counter-rotating energy rings, and two meshing gears.
- Lighting: drei `Environment` from `Lightformer`s only (no HDR download), warm key, violet fill, cyan core light.
- Entrance, scroll tilt, pointer parallax, `PerformanceMonitor` DPR drop and `frameloop="never"` offscreen are unchanged.
- Safeguards: mounted only when `useSceneSupport("webgl")` passes (no reduced motion, no Save-Data, >2 cores/GB, WebGL available). An error boundary reverts to the SVG.
- Fallback: the full SVG reactor below. While the canvas is live, the reactor's inner layers (`.te-inner`: sigil, gimbals, cage, crystal) fade out and its outer plate, segmented ring and gear remain as the housing.

**Technomancer Engine** (`visual/TechnomancerEngine.tsx`, SVG + GSAP): the reactor housing, and the complete static fallback
- An arcane reactor in layers: atmosphere and light shafts, an engraved outer plate with a rune band, a six-segment blackened ring with brass rivets, inlaid runes and a 72-tooth gear, an octagram with emerald circuitry routed along it, three armillary gimbals, a containment cage with six clamps, a fractured crystal core, and floating fragments. Gradients separate metal, brass and crystal; only the nucleus and arcs use a blur filter.
- The markup is the stable, assembled state, so no-JS and reduced-motion readers see the complete machine.
- Entrance (about 4 s): dormant (energy dimmed), ring segments rotate into alignment, sigils and circuits draw, pulses converge on the core, the core ignites and one shock ring stabilises it.
- Idle: slow opposing rotations (64 to 320 s per layer), gimbals breathing through ellipse depth, a halo pulse, occasional circuit pulses (4 to 9 s apart) and rare short arcs (7 to 13 s apart). Loops pause offscreen.
- Interaction: depth-weighted pointer parallax. The easter egg is a real `<button>` over the core ("Channel the arcane core"): each press fires an arc; the third realigns the ring, fires the circuits and announces a polite live message.

## Scroll choreography (`motion/useSiteMotion.ts`)

There is one `useGSAP` controller in `SiteLayout`, scoped to the shell and bound to the existing `data-motion-slot` hooks under `gsap.matchMedia`. It does nothing with reduced motion or without `matchMedia`/JS.

| Hook                                   | Effect                                                     |
| -------------------------------------- | ---------------------------------------------------------- |
| `.section-heading`, `.page-heading`    | Brass rule draws (`--rule` CSS variable)                   |
| `chapter-transition`                   | Orbital arcs straighten into grid lines (scrub)            |
| `hero-foreground`, `.signal-field`     | Hero copy drifts up, the signal field drifts down as the hero leaves |
| `signal-rail`                          | Career rail draws with scroll (`SignalRail.tsx`)           |
| `expanding-imagery`                    | Frame (not caption) opens from an inset clip (scrub)       |
| `artifact-portal`                      | Workshop artwork opens as a widening circle (scrub)        |
| `featured-project`                     | Heading, specs and actions rise; AgentHQ annotations pop; the second capture drifts against the first |
| `architecture-lines`                   | Zones appear, wires draw, nodes settle (scrub). In the Local AI exhibit the plan lifts from a tilted bench (`rotateX`) and nodes light in sequence |
| `project-card` / `arcane-entry`        | Index rows rise                                            |
| `workshop-portal`                      | Artifact plates rise at staggered depths                   |
| `.timeline`                            | Progress line fills (`--progress`); entries slide          |

Text is only ever transformed, never hidden behind opacity. Hero headings use CSS line-mask entrances, which `index.css` disables under reduced motion. Cross-document view transitions (`@view-transition`) give route continuity.

## Media added

There is no new photographic or video evidence. All new visuals are original, authored assets:

- `public/favicon.svg`: the static signal monogram.
- Inline SVG components: the monogram, the hero signal field, the career rail, the Workshop reactor, 15 project cover illustrations (`ProjectArtwork`, `WorkshopArtwork`), and three sanitized system diagrams (`SystemDiagram`).

See `MEDIA_MANIFEST.md` for provenance.

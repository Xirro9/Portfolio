# Motion and media

## Dependencies added

| Package                                              | Version         | Use                                                                    |
| ---------------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| `gsap`, `@gsap/react`                                 | 3.15.0 / 2.1.2  | ScrollTrigger choreography, Workshop timelines, scene entrance drive   |
| `three`, `@react-three/fiber`, `@react-three/drei`    | 0.186.1 / 9.8.2 / 10.7.9 | Celestial Engine (React 19 compatible; fiber peer `<19.4`)  |
| `@fontsource-variable/fraunces`, `…/manrope`, `@fontsource/ibm-plex-mono` | 5.3.0 | Self-hosted OFL fonts                          |

Not used: **Rive**. Exporting `.riv` needs an authenticated editor, so the Workshop scene is original SVG with GSAP, as the brief's fallback allows. Paper Shaders and Blender were optional and not needed: CSS and SVG covered the effects.

## Scenes

**Celestial Engine** (`visual/CelestialEngine.tsx`, lazy chunk, home only)
- Procedural R3F instrument: a canvas-texture engraved disc (degree ticks, numerals, inscription), a brass bezel with 120 instanced ticks, four armillary rings, a three-arm orrery with orbit loops, an amethyst icosahedral core with an edge shell, and two extruded meshing gears.
- Lighting: drei `Environment` built only from `Lightformer`s (no HDR download), so the metals get reflections. The environment rotates slowly for changing highlights.
- Entrance: a GSAP-driven `intro` value staggers the disc fade, bezel scale and ring/orrery assembly. Rotation speed starts high and settles into idle.
- Scroll: a ScrollTrigger on the hero feeds `scroll` (tilts the instrument toward plan view, separates the rings in depth, recedes the disc). Pointer parallax is lerped.
- Safeguards: mounted only when `useSceneSupport("webgl")` passes (no reduced motion, no Save-Data, >2 cores/GB, WebGL available). DPR is `[1, 1.75]` and drei `PerformanceMonitor` drops it to 1. `frameloop="never"` while offscreen. An error boundary returns to the SVG. The canvas sits in an `aria-hidden`, `pointer-events: none` mount.
- Fallback: `OrreryArt.tsx` (SSR SVG). The engraving layer stays as the frame in live mode, and the mechanism layer cross-fades out.

**Technomancer Engine** (`visual/TechnomancerEngine.tsx`, SVG + GSAP; replaced the earlier Arcane Workbench)
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
| `hero-foreground`, `.orrery-art`       | Parallax drift and rotation as the hero leaves             |
| `expanding-imagery`                    | Frame (not caption) opens from an inset clip (scrub)       |
| `artifact-portal`                      | Workshop artwork opens as a widening circle (scrub)        |
| `featured-project`                     | Heading, specs and actions rise; AgentHQ annotations pop; the second capture drifts against the first |
| `architecture-lines`                   | Zones appear, wires draw, nodes settle (scrub). In the Local AI exhibit the plan lifts from a tilted bench (`rotateX`) and nodes light in sequence |
| `project-card` / `arcane-entry`        | Index rows rise                                            |
| `workshop-portal`                      | Artifact plates rise at staggered depths                   |
| `.invitation-seal`                     | The Home Workshop seal scales with scroll; a CSS `rotate` turns it slowly |
| `.timeline`                            | Progress line fills (`--progress`); entries slide          |

Text is only ever transformed, never hidden behind opacity. Hero headings use CSS line-mask entrances, which `index.css` disables under reduced motion. Cross-document view transitions (`@view-transition`) give route continuity.

## Media added

There is no new photographic or video evidence. All new visuals are original, authored assets:

- `public/favicon.svg`: the insignia.
- Inline SVG components: the orrery, the workbench, 15 project cover illustrations (`ProjectArtwork`), and three sanitized system diagrams (`SystemDiagram`: ControlGauge, AgentHQ, Local AI workbench).

See `MEDIA_MANIFEST.md` for provenance.

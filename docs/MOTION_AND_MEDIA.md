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

**Arcane Workbench** (`visual/ArcaneWorkbench.tsx`, SVG + GSAP)
- Includes a crystal processor with an etched core, rune-band and sigil rings, rune-circuit traces with travelling pulses, two holographic spellbook panels, copper pylons with coils, a console, and gentle arcs (no flashing).
- Entrance: circuits draw, nodes pop, the crystal ignites, runes assemble from random rotations and the sigil draws. Idle loops pause offscreen.
- Interaction: layered pointer parallax and a cursor glyph. The easter egg is a real `<button>` over the crystal ("Channel the arcane core"): three presses trigger a burst plus a polite live message.

## Scroll choreography (`motion/useSiteMotion.ts`)

There is one `useGSAP` controller in `SiteLayout`, scoped to the shell and bound to the existing `data-motion-slot` hooks under `gsap.matchMedia`. It does nothing with reduced motion or without `matchMedia`/JS.

| Hook                                   | Effect                                                     |
| -------------------------------------- | ---------------------------------------------------------- |
| `.section-heading`, `.page-heading`    | Brass rule draws (`--rule` CSS variable)                   |
| `chapter-transition`                   | Orbital arcs straighten into grid lines (scrub)            |
| `hero-foreground`, `.orrery-art`       | Parallax drift and rotation as the hero leaves             |
| `expanding-imagery`                    | Frame (not caption) opens from an inset clip (scrub)       |
| `featured-project`                     | Copy rises; AgentHQ annotations pop                        |
| `architecture-lines`                   | Diagram wires draw, nodes settle, flow steps slide (scrub) |
| `project-card` / `workshop-portal`     | Plaques rise / portals tilt in                             |
| `.timeline`                            | Progress line fills (`--progress`); entries slide          |

Text is only ever transformed, never hidden behind opacity. Hero headings use CSS line-mask entrances, which `index.css` disables under reduced motion. Cross-document view transitions (`@view-transition`) give route continuity.

## Media added

There is no new photographic or video evidence. All new visuals are original, authored assets:

- `public/favicon.svg`: the insignia.
- Inline SVG components: the orrery, the workbench, 15 project cover illustrations (`ProjectArtwork`), and three sanitized system diagrams (`SystemDiagram`: ControlGauge, AgentHQ, Local AI workbench).

See `MEDIA_MANIFEST.md` for provenance.

# Art direction — Portfolio V3

Two experiences, one person. Professional pages communicate competence first and personality second (**Cybernetic Editorial**). The Workshop communicates imagination first, with engineering underneath (**the Technomancer's Sanctum**). All tokens live in `src/arcane.css`, scoped by `.portfolio-shell[data-theme]`. The scope names (`observatory`, `engineering-archive`, `technomancer-workshop`) are kept as stable identifiers; `observatory` no longer implies astronomical imagery.

## Scopes

| Scope                   | Routes                                     | Identity |
| ----------------------- | ------------------------------------------ | -------- |
| `observatory`           | Home, Experience, About, Contact, 404      | Cybernetic Editorial. Typography-led hero with the animated monogram as the source of a sparse signal-line field; career signal rail |
| `engineering-archive`   | Work, Labs and their case studies          | Cybernetic Editorial with a faint 6rem drafting grid; one composition per flagship exhibit; zoned diagrams with travelling data packets |
| `technomancer-workshop` | Workshop and its project notebooks         | Technomancer's Sanctum: the Celestial Engine inside an arcane reactor, artifact spreads, an artifact index with a preview plate |

Dark mode only. Roughly 75% professional restraint and 25% cyber character on professional routes. No purple, gold ornament, runes or magical gradients there; the only arcane note is the small Workshop doorway on Home.

## Colour

| Token            | Professional (`observatory`, `engineering-archive`) | Workshop |
| ---------------- | --------------------------------------------------- | -------- |
| Background       | `#090d14`                                           | `#07060d` |
| Surface          | `#111927`                                           | `#110e1c` |
| Text             | `#f0f3f6`                                           | `#ece8f6` |
| Muted            | `#9caabd`                                           | `#aaa3c0` |
| Border           | `#2d3a4b`                                           | `#2a2340` |
| Signal           | `--signal` `#6ba9d6`, `--signal-bright` `#8ec5ea`   | aged brass `#c9a46a` (the same token names) |
| Highlight        | `--signal-alt` `#73d6e6`                            | ultraviolet `#8a5cff` |
| Warm neutral     | `--silver` `#c9d1db`                                | `#d8d2e6` |
| Workshop accents | —                                                   | cyan `#4fe3f0`, emerald `#2fd69b`, magenta `#d04bd8`, copper `#b8733a` |

Lines use `--line` / `--line-strong` (blue-grey on professional pages, brass in the Workshop). Status dots: active = sage, prototype = signal, experimental and concept = an outlined ring. Education keeps the owner-approved current / completed distinction: pale blue (in progress, outlined dot) and silver (completed, filled dot).

## Typography

- Professional display and body: **Manrope** (variable, OFL), headings at weight 500 with tight negative tracking. Technical labels: **IBM Plex Mono** 400/500.
- Workshop display: **Fraunces** (variable, OFL) at light weights, `SOFT 0, WONK 0`, with italic Fraunces for statements. The Workshop sets `--theme-font-display` back to Fraunces, so the two experiences differ in voice as well as colour.

## Signature mark

`src/components/visual/Monogram.tsx`: two nested M traces, like parallel signal lines on a board, ending in four contact pads, with a via at the inner vertex. The name is always real text beside it.

- `signal` variant (professional): silver outer trace, blue inner trace, cyan via. Used in the header, footer, hero and as a case-study watermark (`.case-mark`).
- `arcane` variant (Workshop): the same traces in brass and glowing cyan inside a rune ring. Used in the Workshop header, Workshop kicker, Workshop notebooks and the Home doorway.
- Entrance (`animated`, hero only, CSS): the outer then inner trace draws, the pads and via resolve, then one sheen passes along both traces. About 2.5 s, then static. Header mark repeats the sheen on hover only.
- `public/favicon.svg` is the static signal mark.
- Xirro9 appears as the secondary handle in the hero kicker and footer.

## Signal geometry (professional)

- Hero field: curves leave the monogram's pads and run off the page edges, with a few nodes and a masked dot grid. Lines draw once; three carry a rare travelling pulse (every 8 s, one at a time). Light pointer parallax by depth.
- Career rail (`SignalRail.tsx`, `CareerPath`): one measured line runs down the margin past each role, then turns into the horizontal academic timeline with a node at each degree (filled = completed, ring = in progress). On narrow screens, where degrees stack, the line keeps running down. It draws with reading progress.
- Diagrams: sparse packets travel implemented and experimental wires; planned wires stay dashed and still.
- Never: matrix rain, padlocks, shields, HUDs, fake terminals, glitching.

## Composition

- Borders are structural. Frames remain on controls, real screenshots, diagram nodes and education panels; sections and exhibits are open, separated by single-axis rules.
- Professional Home order: hero, current experience, education, selected projects, technical expertise, labs/research/milestones, Workshop doorway, contact.
- Work: diagram-led ControlGauge, AgentHQ with both real DEMO captures layered, a full-bleed Local AI workbench, an `EA-xx` editorial index. No decorative exhibit numerals on professional exhibits.
- Home and Work share three exhibit compositions: ControlGauge diagram-led with a specification margin; AgentHQ panoramic with the task-board capture layered over its lower edge; the Local AI workbench as a full-bleed chapter (also closing the project chapter on Home). Expertise uses a sticky heading beside a ledger; contact is a closing statement.
- Case studies open with one large visual (real media, else the system diagram, else the illustration), then a typographic lede (problem as a statement, role as a margin note), then paired sections (challenges / safeguards, limitations / planned).
- Field notes are set as a journal article: one ~41rem reading measure, a byline, the before/after question on one signal line, the compact brief as an expandable reference with a copy button, numbered figures that break out to wide or full width, a pull quote, and the failure ledger as a real table.
- Workshop: artifact spreads (arch, table), artifact index whose preview follows the entry being read, open plates. Concept plates (`WorkshopArtwork.tsx`) dissolve into the page through a radial mask.
- Project covers are original illustrations of each system's *idea*, always captioned "Original illustration · not a product capture".

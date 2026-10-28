# Art direction — Arcane Tech

Professional pages: technology that looks almost magical. Workshop: magic that behaves like technology. All tokens live in `src/arcane.css`, scoped by `.portfolio-shell[data-theme]`.

## Scopes

| Scope                   | Balance                  | Composition                                                                                           |
| ----------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `observatory`           | ~85% technical / 15% arcane | Headline staged against the celestial instrument, which bleeds to the viewport edge; approach notes engraved at the plate's corners; credentials as a ruled ledger |
| `engineering-archive`   | ~95% technical / 5% arcane  | Faint 6rem drafting grid, exhibition contents index, one composition per flagship exhibit, `EA-xx` editorial index rows, sanitized zoned diagrams |
| `technomancer-workshop` | ~30% technical / 70% fantasy | The Technomancer's Sanctum: near-black indigo, a layered arcane reactor, artifact spreads, an artifact index with a preview plate |

## Colour

| Token            | Observatory / Archive | Workshop                              |
| ---------------- | --------------------- | ------------------------------------- |
| Background       | `#080d19` / `#090e18` | `#07060d`                             |
| Surface          | `#101a2d` / `#0f1726` | `#110e1c`                             |
| Text             | `#ece6d9` (ivory)     | `#ece8f6`                             |
| Muted            | `#aab1c0`             | `#aaa3c0`                             |
| Accent           | Brass `#c4a77b` / `#e2c99c` | Aged brass `#c9a46a`, electric cyan `#4fe3f0`, emerald `#2fd69b`, ultraviolet `#8a5cff`, selective magenta `#d04bd8`, copper `#b8733a` |
| Restrained light | Amethyst `#8b80c9` / `#b3a9ee` | —                              |

Status dots: active = sage, prototype = brass, experimental = amethyst. Education keeps its owner-approved blue (current) / brass (completed) distinction.

## Typography

- Display: **Fraunces** (variable, OFL, self-hosted via Fontsource). All scopes use `SOFT 0, WONK 0`. The Workshop gets its weight from scale instead: a 300-weight display face up to 9rem, a tracked mono "THE" and italic Fraunces for its statements. The earlier soft, wonky axis read as childlike and was retired.
- Body: **Manrope** (variable, OFL).
- Technical: **IBM Plex Mono** 400/500 (OFL) for eyebrows, captions, status, tags and diagram labels.

## Insignia

`src/components/visual/Insignia.tsx`: a calibrated 48-tick ring, an eight-point star, an inclined orbit with one planet, and a crescent core (Moon). The `observatory` variant is a brass instrument. The `workshop` variant uses the same geometry in aged brass, "awakened" with eight emerald rune nodes and a luminous cyan core. It is used in the header, footer, hero kickers and favicon. The same eight-point geometry is the octagram of the Workshop reactor and of the Home page's Workshop seal.

## Motifs and rules

- Fine engraved linework, calibrated ticks, and thin brass rules that draw under headings.
- Borders are structural. Frames remain on controls, embedded real captures, diagram nodes and the education panels; sections, exhibits, illustrations and metadata are open, separated by single-axis rules. No corner brackets on images.
- Original rune alphabet (`runes.ts`): eight circuit-like glyphs, decorative only, never a real script.
- Project covers are original illustrations of each system's *idea*. They are always captioned "Original illustration · not a product capture". Workshop plates (`WorkshopArtwork.tsx`) are dark concept art that dissolves into the page through a radial mask.
- Compositions vary by content: diagram-led (ControlGauge), layered real captures (AgentHQ), full-bleed system exhibition (Local AI workbench), open editorial statements, ruled ledgers and indexes, and Workshop artifact spreads (arch, table) and plates.
- Square corners, hairlines and plaques instead of rounded glass cards. No gradient text and no generic particle fields.
- Quiet sections (disciplines, education, contact) sit between cinematic sequences.

# Art direction — Arcane Tech

Professional pages: technology that looks almost magical. Workshop: magic that behaves like technology. All tokens live in `src/arcane.css`, scoped by `.portfolio-shell[data-theme]`.

## Scopes

| Scope                   | Balance                  | Composition                                                                                           |
| ----------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `observatory`           | ~85% technical / 15% arcane | Editorial headline left, engraved celestial instrument right, credentials visible above the fold     |
| `engineering-archive`   | ~95% technical / 5% arcane  | Faint 6rem drafting grid, numbered exhibits, `EA-xx` catalogue plaques, sanitized system diagrams    |
| `technomancer-workshop` | ~30% technical / 70% fantasy | Dotted lab-bench texture, arcane workbench scene, tilted exhibit frames, accent-per-project portals |

## Colour

| Token            | Observatory / Archive | Workshop                              |
| ---------------- | --------------------- | ------------------------------------- |
| Background       | `#080d19` / `#090e18` | `#0c0a22`                             |
| Surface          | `#101a2d` / `#0f1726` | `#17123a`                             |
| Text             | `#ece6d9` (ivory)     | `#f3efff`                             |
| Muted            | `#aab1c0`             | `#c3bbdf`                             |
| Accent           | Brass `#c4a77b` / `#e2c99c` | Cyan `#5be7f0`, violet `#a57bff`, mint `#6ef2b8`, copper `#e9a15b`, coral `#ff7a6b` |
| Restrained light | Amethyst `#8b80c9` / `#b3a9ee` | —                              |

Status dots: active = sage, prototype = brass, experimental = amethyst. Education keeps its owner-approved blue (current) / brass (completed) distinction.

## Typography

- Display: **Fraunces** (variable, OFL, self-hosted via Fontsource). Professional scopes use `SOFT 0, WONK 0`; the Workshop switches the same face to `SOFT 100, WONK 1`, so one file gives two personalities.
- Body: **Manrope** (variable, OFL).
- Technical: **IBM Plex Mono** 400/500 (OFL) for eyebrows, captions, status, tags and diagram labels.

## Insignia

`src/components/visual/Insignia.tsx`: a calibrated 48-tick ring, an eight-point star, an inclined orbit with one planet, and a crescent core (Moon). The `observatory` variant is a brass instrument. The `workshop` variant uses the same geometry, "awakened" with eight rune nodes and a luminous cyan-violet core. It is used in the header, footer, hero kickers and favicon. The same star geometry is the inner sigil of the Workshop scene.

## Motifs and rules

- Fine engraved linework, calibrated ticks, corner registration brackets, and thin brass rules that draw under headings.
- Original rune alphabet (`runes.ts`): eight circuit-like glyphs, decorative only, never a real script.
- Project covers are original illustrations of each system's *idea*. They are always captioned "Original illustration · not a product capture".
- Square corners, hairlines and plaques instead of rounded glass cards. No gradient text and no generic particle fields.
- Quiet sections (disciplines, education, contact) sit between cinematic sequences.

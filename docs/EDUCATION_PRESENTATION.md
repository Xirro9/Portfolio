# Education presentation

Education now appears immediately after current professional experience on the homepage. An “Education highlights” link in the introduction jumps directly to `#education`. The homepage and Experience page share `EducationSection.tsx`, using the canonical education records.

Degree titles use descriptive “Master’s studies” and “Bachelor’s degree” labels, with Cybersecurity on a separate line. Exact formal award naming remains an editorial verification item; the master’s program is clearly marked in progress.

The two highlighted panels use blue for current graduate study and brass for completed undergraduate study. A decorative light sweep beneath each title plays once when its own panel first enters the viewport, so the second title still animates when reached on a phone. Content is always fully visible, including without JavaScript or IntersectionObserver. There are no looping effects, layout shifts, hover-only information, or extra animation dependencies. Reduced-motion disables the sweep entirely.

## Parameters

Edit `educationAnimation` in `src/content/site.ts`, or pass an `animation` prop to `EducationSection`:

```tsx
<EducationSection
  animation={{
    enabled: true,
    durationMs: 1600,
    staggerMs: 160,
    glowOpacity: 0.7,
  }}
/>
```

- `enabled`: turn decorative motion on/off.
- `durationMs`: sweep duration; constrained to 300–2400 ms.
- `staggerMs`: delay between titles; constrained to 0–400 ms.
- `glowOpacity`: intensity; constrained to 0–1.

CSS entry points: `.education-section`, `.education-card`, `--education-accent`, `.education-title-track`, and `education-title-sweep` in `src/index.css`. Reuse these in the later visual redesign while preserving static readability and reduced-motion behavior.

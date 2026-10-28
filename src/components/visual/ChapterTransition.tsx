/** Orbital arcs straighten into the archive grid between hero and content. */
export function ChapterTransition() {
  return (
    <div className="chapter-transition" aria-hidden="true" data-motion-slot="chapter-transition">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none" focusable="false">
        {[0, 1, 2, 3].map((index) => (
          <path
            key={`arc${index}`}
            className="chapter-arc"
            pathLength={1}
            data-motion-part="chapter-line"
            d={`M${120 + index * 40} 0 C${260 + index * 40} ${110 + index * 18} ${560} ${120 + index * 22} ${1200 - index * 80} ${150 + index * 18}`}
          />
        ))}
        {Array.from({ length: 13 }, (_, index) => (
          <path
            key={`grid${index}`}
            className="chapter-grid"
            pathLength={1}
            data-motion-part="chapter-line"
            d={`M${index * 100} 120 V220`}
          />
        ))}
        <path className="chapter-grid" pathLength={1} data-motion-part="chapter-line" d="M0 219 H1200" />
        <circle className="chapter-node" cx="560" cy="133" r="5" />
      </svg>
    </div>
  );
}

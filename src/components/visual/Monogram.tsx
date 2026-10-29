import { useId } from "react";
import { runes } from "./runes";

/**
 * The Mahin Moon signature: two nested M traces, like a pair of parallel
 * signal lines on a board, terminating in contact pads. The professional
 * variant is a quiet signal mark; the arcane variant wraps the same traces
 * in a rune ring for the Workshop. Decorative: the name is always real text.
 */
export const monogramTraces = {
  outer: "M10 52 V14 L32 36 L54 14 V52",
  inner: "M19 52 V30 L32 43 L45 30 V52",
};
const pads = [10, 19, 45, 54];

export function Monogram({
  className = "",
  variant = "signal",
  animated = false,
}: {
  className?: string;
  variant?: "signal" | "arcane";
  animated?: boolean;
}) {
  const id = useId().replace(/[^\w-]/g, "");
  return (
    <svg
      className={`monogram monogram-${variant}${animated ? " monogram-animated" : ""} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`mm-sheen-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {variant === "arcane" && (
        <g className="mm-ring">
          <circle cx="32" cy="32" r="30" />
          <circle className="mm-ring-inner" cx="32" cy="32" r="26.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
            const angle = ((index * 45 - 90) * Math.PI) / 180;
            return (
              <path
                key={index}
                d={runes[index]}
                transform={`translate(${(32 + Math.cos(angle) * 28.2).toFixed(2)} ${(32 + Math.sin(angle) * 28.2).toFixed(2)}) scale(0.22)`}
              />
            );
          })}
        </g>
      )}
      <path className="mm-trace mm-outer" pathLength={1} d={monogramTraces.outer} />
      <path className="mm-trace mm-inner" pathLength={1} d={monogramTraces.inner} />
      <circle className="mm-via" cx="32" cy="36" r="2.2" />
      {pads.map((x) => (
        <circle key={x} className="mm-pad" cx={x} cy="52" r="3.1" />
      ))}
      <g className="mm-sheen" stroke={`url(#mm-sheen-${id})`}>
        <path pathLength={1} d={monogramTraces.outer} />
        <path pathLength={1} d={monogramTraces.inner} />
      </g>
    </svg>
  );
}

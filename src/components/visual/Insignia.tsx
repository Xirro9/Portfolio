import { useId } from "react";

/**
 * The shared mark: a calibrated ring, an eight-point star and a crescent core.
 * Observatory draws it as a precise instrument; the Workshop variant is the
 * same geometry "awakened" with rune nodes and a luminous core.
 */
const ticks = Array.from({ length: 48 }, (_, index) => index);
const runeAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const polar = (radius: number, degrees: number) => {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return [50 + radius * Math.cos(angle), 50 + radius * Math.sin(angle)];
};
export const crescentPath = "M50 38 A12 12 0 0 0 50 62 A15 15 0 0 1 50 38 Z";

export function Insignia({
  variant = "observatory",
  className,
}: {
  variant?: "observatory" | "workshop";
  className?: string;
}) {
  const awakened = variant === "workshop";
  const core = `insignia-core-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg
      className={`insignia insignia-${variant}${className ? ` ${className}` : ""}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {awakened && (
        <defs>
          <radialGradient id={core} cx="45%" cy="50%" r="60%">
            <stop offset="0" stopColor="#f1ecff" />
            <stop offset="0.45" stopColor="#5be7f0" />
            <stop offset="1" stopColor="#a57bff" />
          </radialGradient>
        </defs>
      )}
      <circle className="insignia-ring" cx="50" cy="50" r="46" />
      <g className="insignia-ticks">
        {ticks.map((tick) => {
          const [x1, y1] = polar(46, tick * 7.5);
          const [x2, y2] = polar(tick % 4 ? 43.5 : 41, tick * 7.5);
          return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <circle className="insignia-ring insignia-inner" cx="50" cy="50" r="36" />
      <path
        className="insignia-star"
        d="M50 20 L71.2 71.2 L20 50 L71.2 28.8 L50 80 L28.8 28.8 L80 50 L28.8 71.2 Z"
      />
      <ellipse
        className="insignia-orbit"
        cx="50"
        cy="50"
        rx="31"
        ry="10"
        transform="rotate(-24 50 50)"
      />
      <circle className="insignia-planet" cx="78" cy="38" r="2.6" />
      <path
        className="insignia-crescent"
        d={crescentPath}
        fill={awakened ? `url(#${core})` : undefined}
      />
      {awakened &&
        runeAngles.map((angle) => {
          const [x, y] = polar(36, angle);
          return (
            <g key={angle} className="insignia-rune" transform={`translate(${x} ${y})`}>
              <circle r="3.4" />
              <path d={angle % 90 ? "M-1.6 -1.6 L1.6 1.6 M-1.6 1.6 L0 0" : "M0 -2 V2 M-1.6 -0.6 H1.6"} />
            </g>
          );
        })}
    </svg>
  );
}

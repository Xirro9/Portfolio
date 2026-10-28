import { useId } from "react";

/** Original engraved orrery. It is the static scene and the WebGL frame. */
const C = 400;
const point = (radius: number, degrees: number, cx = C, cy = C) => {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const;
};
const fixed = (value: number) => value.toFixed(1);
export function gearPath(
  cx: number,
  cy: number,
  teeth: number,
  outer: number,
  root: number,
) {
  const step = 360 / teeth;
  const parts: string[] = [];
  for (let tooth = 0; tooth < teeth; tooth++) {
    const base = tooth * step;
    const corners = [
      point(root, base, cx, cy),
      point(outer, base + step * 0.18, cx, cy),
      point(outer, base + step * 0.48, cx, cy),
      point(root, base + step * 0.66, cx, cy),
    ];
    corners.forEach(([x, y], index) =>
      parts.push(`${tooth === 0 && index === 0 ? "M" : "L"}${fixed(x)} ${fixed(y)}`),
    );
  }
  return `${parts.join(" ")} Z`;
}
const degreeTicks = Array.from({ length: 180 }, (_, index) => index * 2);
const numerals = ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"];
const constellation = [
  [612, 168],
  [648, 214],
  [700, 206],
  [728, 254],
];

export function OrreryArt() {
  const id = useId().replace(/[^\w-]/g, "");
  const brass = `orrery-brass-${id}`;
  const glow = `orrery-glow-${id}`;
  return (
    <svg
      className="orrery-art"
      viewBox="0 0 800 800"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={brass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0dcb4" />
          <stop offset="0.45" stopColor="#c4a77b" />
          <stop offset="1" stopColor="#6f5737" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#c9c0ff" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#8b80c9" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b80c9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="orrery-engraving">
        <circle className="orrery-hairline" cx={C} cy={C} r="388" />
        <circle className="orrery-line" data-motion-part="orrery-line" cx={C} cy={C} r="372" />
        <circle className="orrery-hairline" cx={C} cy={C} r="336" />
        <g className="orrery-rotor orrery-rotor-slow">
          {degreeTicks.map((degree) => {
            const major = degree % 30 === 0;
            const [x1, y1] = point(372, degree);
            const [x2, y2] = point(major ? 346 : degree % 10 ? 364 : 356, degree);
            return (
              <line
                key={degree}
                className={major ? "orrery-tick-major" : "orrery-tick"}
                x1={fixed(x1)}
                y1={fixed(y1)}
                x2={fixed(x2)}
                y2={fixed(y2)}
              />
            );
          })}
          {numerals.map((label, index) => {
            const [x, y] = point(322, index * 30);
            return (
              <text
                key={label}
                className="orrery-numeral"
                x={fixed(x)}
                y={fixed(y)}
                transform={`rotate(${index * 30} ${fixed(x)} ${fixed(y)})`}
              >
                {label}
              </text>
            );
          })}
        </g>
        <path className="orrery-hairline" d="M400 0 V800 M0 400 H800" />
        <path
          className="orrery-hairline orrery-dashed"
          d="M117 117 L683 683 M683 117 L117 683"
        />
        <polyline
          className="orrery-constellation"
          points={constellation.map((pair) => pair.join(",")).join(" ")}
        />
        {constellation.map(([x, y]) => (
          <circle key={x} className="orrery-star" cx={x} cy={y} r="3" />
        ))}
      </g>
      <g className="orrery-mechanism">
        <circle cx={C} cy={C} r="210" fill={`url(#${glow})`} />
        <g className="orrery-rotor orrery-rotor-reverse">
          <circle
            className="orrery-band"
            cx={C}
            cy={C}
            r="292"
            stroke={`url(#${brass})`}
          />
          <circle className="orrery-hairline" cx={C} cy={C} r="276" />
          {Array.from({ length: 12 }, (_, index) => {
            const [x, y] = point(284, index * 30 + 15);
            return <circle key={index} className="orrery-rivet" cx={fixed(x)} cy={fixed(y)} r="4" />;
          })}
        </g>
        <ellipse
          className="orrery-ring"
          data-motion-part="orrery-line"
          cx={C}
          cy={C}
          rx="262"
          ry="86"
          stroke={`url(#${brass})`}
          transform="rotate(-18 400 400)"
        />
        <ellipse
          className="orrery-ring"
          data-motion-part="orrery-line"
          cx={C}
          cy={C}
          rx="92"
          ry="262"
          stroke={`url(#${brass})`}
          transform="rotate(14 400 400)"
        />
        <ellipse
          className="orrery-path"
          data-motion-part="orrery-line"
          cx={C}
          cy={C}
          rx="210"
          ry="68"
          transform="rotate(-18 400 400)"
        />
        <ellipse
          className="orrery-path"
          cx={C}
          cy={C}
          rx="150"
          ry="49"
          transform="rotate(-18 400 400)"
        />
        <g className="orrery-rotor orrery-rotor-mid">
          <line className="orrery-arm" x1={C} y1={C} x2="610" y2="400" />
          <circle className="orrery-planet" cx="610" cy="400" r="13" />
          <circle className="orrery-hairline" cx="610" cy="400" r="24" />
        </g>
        <g className="orrery-rotor orrery-rotor-fast">
          <line className="orrery-arm" x1={C} y1={C} x2="400" y2="250" />
          <circle className="orrery-planet orrery-planet-amethyst" cx="400" cy="250" r="9" />
        </g>
        <path
          className="orrery-gear"
          d={gearPath(612, 612, 24, 92, 82)}
          stroke={`url(#${brass})`}
        />
        <circle className="orrery-hairline" cx="612" cy="612" r="56" />
        <path
          className="orrery-gear"
          d={gearPath(505, 690, 14, 52, 44)}
          stroke={`url(#${brass})`}
        />
        <circle className="orrery-hairline" cx={C} cy={C} r="58" />
        <path
          className="orrery-core"
          transform="translate(400 400) scale(3.2) translate(-50 -50)"
          d="M50 38 A12 12 0 0 0 50 62 A15 15 0 0 1 50 38 Z"
        />
      </g>
    </svg>
  );
}

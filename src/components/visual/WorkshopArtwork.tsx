import type { ReactNode } from "react";
import { runes } from "./runes";

/**
 * Original Workshop illustrations, drawn as dark technical concept plates.
 * Each one depicts the idea of a project, never a product screen, and uses no
 * third-party characters, card art or game assets. All share a 480 × 300 view.
 */
const polar = (cx: number, cy: number, rx: number, ry: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  return [cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)] as const;
};
const f = (value: number) => Number(value.toFixed(1));

function guildHall(id: string) {
  const vanish = [240, 150];
  const floor = [-220, -80, 60, 180, 300, 420, 560, 700].map((x) => {
    const t = (212 - vanish[1]) / (300 - vanish[1]);
    return `M${f(vanish[0] + (x - vanish[0]) * t)} 212 L${x} 300`;
  });
  const motes = [
    [150, 140], [332, 120], [206, 176], [290, 188], [96, 150], [392, 160], [258, 40],
  ];
  return (
    <>
      <defs>
        <radialGradient id={`${id}-lamp`}>
          <stop offset="0" stopColor="#ffe0a3" stopOpacity="0.95" />
          <stop offset="0.22" stopColor="#e0a85a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#e0a85a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-window`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2fd69b" stopOpacity="0.4" />
          <stop offset="0.55" stopColor="#1b5b78" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0b0913" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2fd69b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2fd69b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="pa-stone">
        {[34, 66, 414, 446].map((x) => (
          <path key={x} d={`M${x} 0 V212`} />
        ))}
        {floor.map((d) => (
          <path key={d} d={d} />
        ))}
        {[212, 224, 241, 266].map((y) => (
          <path key={y} d={`M0 ${y} H480`} />
        ))}
      </g>
      <path
        d="M168 212 V100 C168 58 204 30 240 18 C276 30 312 58 312 100 V212 Z"
        fill={`url(#${id}-window)`}
      />
      <g className="pa-brass">
        <path d="M168 212 V100 C168 58 204 30 240 18 C276 30 312 58 312 100 V212" />
        <path className="pa-hair" d="M176 212 V102 C176 64 208 40 240 28 C272 40 304 64 304 102 V212" />
        <path d="M184 212 V114 C184 96 196 84 212 78 C226 84 236 96 236 114 V212" />
        <path d="M244 212 V114 C244 96 254 84 268 78 C284 84 296 96 296 114 V212" />
        <circle cx="240" cy="58" r="15" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const [x, y] = polar(240, 58, 9, 9, angle);
          return <circle key={angle} className="pa-hair" cx={f(x)} cy={f(y)} r="4.5" />;
        })}
        {[112, 344].map((x) => (
          <g key={x}>
            <rect x={x + 6} y="36" width="18" height="170" />
            <path d={`M${x} 36 H${x + 30} M${x + 2} 30 H${x + 28} M${x} 206 H${x + 30} M${x + 2} 212 H${x + 28}`} />
            <path className="pa-hair" d={`M${x + 15} 48 V196`} />
          </g>
        ))}
      </g>
      <ellipse cx="240" cy="256" rx="150" ry="34" fill={`url(#${id}-floor)`} />
      <g className="pa-sigil">
        <ellipse cx="240" cy="256" rx="122" ry="25" />
        <ellipse className="pa-dashed" cx="240" cy="256" rx="94" ry="19" />
        <ellipse cx="240" cy="256" rx="58" ry="11.5" />
        {Array.from({ length: 16 }, (_, index) => {
          const [x1, y1] = polar(240, 256, 122, 25, index * 22.5);
          const [x2, y2] = polar(240, 256, 108, 22, index * 22.5);
          return <path key={index} d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`} />;
        })}
      </g>
      <text className="pa-glyph" x="240" y="246" textAnchor="middle">
        {"{ }"}
      </text>
      {[74, 406].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <circle cy="76" r="54" fill={`url(#${id}-lamp)`} />
          <path className="pa-chain" d="M0 0 V52" />
          <path className="pa-brass" d="M-12 56 H12 L17 66 L12 98 H-12 L-17 66 Z M-8 56 L0 48 L8 56 M-12 98 L0 106 L12 98" />
          <ellipse cx="0" cy="78" rx="5" ry="9" className="pa-flame" />
        </g>
      ))}
      {motes.map(([x, y]) => (
        <circle key={`${x}${y}`} className="pa-mote" cx={x} cy={y} r="1.4" />
      ))}
    </>
  );
}

function clash(id: string) {
  const star = Array.from({ length: 28 }, (_, index) => {
    const radius = index % 2 ? 14 : [58, 34, 72, 40, 50, 30, 66, 38, 46, 28, 62, 36, 54, 32][index / 2];
    const [x, y] = polar(240, 148, radius, radius * 0.86, index * (360 / 28) - 90);
    return `${f(x)},${f(y)}`;
  }).join(" ");
  const speed = Array.from({ length: 16 }, (_, index) => {
    const x = -40 + index * 34;
    const y = 40 + ((index * 53) % 230);
    return `M${x} ${y} l${110 + (index % 4) * 30} ${-(40 + (index % 3) * 12)}`;
  });
  const shards = [
    [318, 92, 20, "#ff4d6a"], [168, 196, -30, "#4fe3f0"], [342, 196, 60, "#b27cff"],
    [140, 104, 110, "#ff4d6a"], [292, 222, 150, "#ffd2da"], [196, 62, -70, "#4fe3f0"],
  ] as const;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ff4d6a" stopOpacity="0" />
          <stop offset="0.8" stopColor="#ff4d6a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff2f4" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b3cff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#4fe3f0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f2feff" />
        </linearGradient>
        <radialGradient id={`${id}-impact`}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.14" stopColor="#ffd6dc" stopOpacity="0.9" />
          <stop offset="0.42" stopColor="#ff4d6a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff4d6a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="pa-speed">
        {speed.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d="M-30 300 L232 156 L246 166 L-30 316 Z" fill={`url(#${id}-a)`} />
      <path d="M510 -10 L250 136 L236 126 L510 -26 Z" fill={`url(#${id}-b)`} />
      <g className="pa-shock" transform="rotate(-20 240 148)">
        {[44, 84, 132, 188].map((rx, index) => (
          <ellipse
            key={rx}
            cx="240"
            cy="148"
            rx={rx}
            ry={rx * 0.32}
            style={{ opacity: 0.85 - index * 0.18 }}
            className={index === 2 ? "pa-dashed" : undefined}
          />
        ))}
      </g>
      <circle cx="240" cy="148" r="96" fill={`url(#${id}-impact)`} />
      <polygon className="pa-burst" points={star} />
      <circle cx="240" cy="148" r="9" fill="#ffffff" />
      {shards.map(([x, y, angle, color]) => (
        <path
          key={`${x}${y}`}
          d="M0 -9 L4 0 L0 12 L-3 0 Z"
          fill={color}
          transform={`translate(${x} ${y}) rotate(${angle})`}
        />
      ))}
      <g className="pa-ground">
        <path className="pa-ground-edge" d="M24 262 H456" />
        <path d="M24 262 L0 300 M456 262 L480 300 M100 262 L84 300 M180 262 L174 300 M300 262 L306 300 M380 262 L396 300" />
      </g>
    </>
  );
}

function enchantedTable(id: string) {
  const cx = 240;
  const cy = 196;
  const seats = [198, 252, 306, 18, 90].map((angle) => polar(cx, cy, 214, 76, angle));
  const star = [0, 2, 4, 1, 3, 0]
    .map((k) => polar(cx, cy, 140, 44, -90 + k * 72))
    .map(([x, y], index) => `${index ? "L" : "M"}${f(x)} ${f(y)}`)
    .join(" ");
  return (
    <>
      <defs>
        <radialGradient id={`${id}-felt`}>
          <stop offset="0" stopColor="#2fd69b" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#0f4a3a" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f4a3a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-orb`}>
          <stop offset="0" stopColor="#f0fff9" />
          <stop offset="0.35" stopColor="#2fd69b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#2fd69b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2fd69b" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2fd69b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="pa-stone" d="M120 228 L150 300 M360 228 L330 300 M240 258 V300" />
      <ellipse cx={cx} cy={cy} rx="196" ry="66" className="pa-table-shadow" />
      <ellipse cx={cx} cy={cy} rx="190" ry="62" fill={`url(#${id}-felt)`} />
      <g className="pa-brass">
        <ellipse cx={cx} cy={cy} rx="190" ry="62" />
        <ellipse className="pa-hair" cx={cx} cy={cy} rx="176" ry="55" />
      </g>
      <g className="pa-sigil">
        <ellipse className="pa-dashed" cx={cx} cy={cy} rx="140" ry="44" />
        <path d={star} />
        <ellipse cx={cx} cy={cy} rx="60" ry="19" />
      </g>
      <g className="pa-circuit">
        {seats.map(([x, y], index) => {
          const [kx, ky] = polar(cx, cy, 96, 30, [198, 252, 306, 18, 90][index]);
          return (
            <g key={index}>
              <path d={`M${f(x)} ${f(y)} L${f(kx)} ${f(ky)} L${cx} ${cy - 10}`} />
              <circle className="pa-node" cx={f(kx)} cy={f(ky)} r="3" />
            </g>
          );
        })}
      </g>
      <rect x="230" y="40" width="20" height="148" fill={`url(#${id}-beam)`} />
      <circle cx={cx} cy={cy - 12} r="22" fill={`url(#${id}-orb)`} />
      <circle className="pa-brass pa-dashed" cx={cx} cy={cy - 12} r="28" />
      {seats.map(([x, y], index) => (
        <g key={index} transform={`translate(${f(x)} ${f(y)})`} className="pa-seat">
          <rect x="-9" y="-15" width="18" height="30" rx="3" />
          <path d="M-4 -6 H4 M-4 0 H2" />
        </g>
      ))}
      <ellipse className="pa-orbit" cx="240" cy="96" rx="86" ry="18" />
      {[-16, 0, 16].map((angle, index) => (
        <g key={angle} transform={`rotate(${angle} 240 150)`} className="pa-card">
          <rect x="223" y={52 - (index === 1 ? 10 : 0)} width="34" height="50" rx="2" />
          <rect className="pa-card-inner" x="228" y={57 - (index === 1 ? 10 : 0)} width="24" height="40" />
          <path d={runes[[1, 7, 4][index]]} transform={`translate(240 ${77 - (index === 1 ? 10 : 0)})`} />
        </g>
      ))}
    </>
  );
}

function dayAstrolabe(id: string) {
  const cx = 240;
  const cy = 156;
  const arc = (r: number, from: number, to: number) => {
    const [x1, y1] = polar(cx, cy, r, r, from);
    const [x2, y2] = polar(cx, cy, r, r, to);
    return `M${f(x1)} ${f(y1)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`;
  };
  const [sx, sy] = polar(cx, cy, 134, 134, -40);
  const [mx, my] = polar(cx, cy, 134, 134, 140);
  return (
    <>
      <defs>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor="#ffe0a3" />
          <stop offset="0.3" stopColor="#e0a85a" stopOpacity="0.6" />
          <stop offset="1" stopColor="#e0a85a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className="pa-stone" d="M30 156 H450 M240 10 V300" />
      <g className="pa-brass">
        <circle cx={cx} cy={cy} r="120" />
        <circle className="pa-hair" cx={cx} cy={cy} r="134" />
        {Array.from({ length: 48 }, (_, index) => {
          const [x1, y1] = polar(cx, cy, 120, 120, index * 7.5);
          const [x2, y2] = polar(cx, cy, index % 4 ? 113 : 104, index % 4 ? 113 : 104, index * 7.5);
          return <path key={index} d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`} />;
        })}
      </g>
      <g className="pa-track">
        {[92, 76, 60].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <path className="pa-progress" d={arc(92, -90, 130)} stroke="#4fe3f0" />
      <path className="pa-progress" d={arc(76, -90, 40)} stroke="#2fd69b" />
      <path className="pa-progress" d={arc(60, -90, 200)} stroke="#b27cff" />
      <circle cx={f(sx)} cy={f(sy)} r="26" fill={`url(#${id}-sun)`} />
      <circle cx={f(sx)} cy={f(sy)} r="6" fill="#ffe0a3" />
      <path
        className="pa-moon"
        d={`M${f(mx)} ${f(my - 9)} A9 9 0 1 0 ${f(mx)} ${f(my + 9)} A7 7 0 1 1 ${f(mx)} ${f(my - 9)} Z`}
      />
      <path className="pa-brass" d="M240 132 L245 151 L264 156 L245 161 L240 180 L235 161 L216 156 L235 151 Z" />
    </>
  );
}

function scryingLens(id: string) {
  const lines = [
    [62, 150], [80, 126], [96, 168], [70, 104], [84, 192], [104, 140], [66, 214],
  ] as const;
  return (
    <>
      <defs>
        <radialGradient id={`${id}-iris`}>
          <stop offset="0" stopColor="#f3e9ff" />
          <stop offset="0.3" stopColor="#d04bd8" stopOpacity="0.85" />
          <stop offset="0.7" stopColor="#5b2fd0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#5b2fd0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glass`}>
          <stop offset="0" stopColor="#b27cff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#b27cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="pa-source">
        {lines.map(([length, y], index) => (
          <g key={y}>
            <path d={`M20 ${y} h${length} C${length + 70} ${y} 160 150 198 150`} />
            {index % 3 === 1 ? (
              <path className="pa-flag" d={`M${18 + length / 2} ${y - 5} l10 10`} />
            ) : (
              <circle className="pa-verified" cx={20 + length} cy={y} r="2.4" />
            )}
          </g>
        ))}
      </g>
      <path
        d="M190 150 C240 74 360 74 410 150 C360 226 240 226 190 150 Z"
        fill={`url(#${id}-glass)`}
      />
      <g className="pa-brass">
        <path d="M190 150 C240 74 360 74 410 150 C360 226 240 226 190 150 Z" />
        <path className="pa-hair" d="M178 150 C232 62 368 62 422 150 C368 238 232 238 178 150 Z" />
        {Array.from({ length: 36 }, (_, index) => {
          const [x1, y1] = polar(300, 150, 62, 62, index * 10);
          const [x2, y2] = polar(300, 150, index % 3 ? 57 : 52, index % 3 ? 57 : 52, index * 10);
          return <path key={index} d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`} />;
        })}
      </g>
      <circle cx="300" cy="150" r="46" fill={`url(#${id}-iris)`} />
      <circle className="pa-sigil pa-dashed" cx="300" cy="150" r="36" />
      <circle cx="300" cy="150" r="9" fill="#0b0913" />
      <circle cx="292" cy="142" r="3" fill="#ffffff" />
      <g className="pa-seal" transform="translate(394 214)">
        <circle r="15" />
        <path d="M-7 0 L-2 5 L8 -6" />
      </g>
      <text className="pa-label" x="452" y="34" textAnchor="end">
        CONCEPT
      </text>
    </>
  );
}

export const creativeMotifs: Record<string, (id: string) => ReactNode> = {
  "bug-hunters-guild": guildHall,
  "pokemon-party-fighter": clash,
  "mtg-game-night": enchantedTable,
  lifedash: dayAstrolabe,
  realitycheck: scryingLens,
};

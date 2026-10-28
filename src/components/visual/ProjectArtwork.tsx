import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../../content/types";
import { runes } from "./runes";

/**
 * Original cover illustrations. They depict ideas and structure, never a
 * product interface, and are always captioned as illustrations.
 */
const accents: Record<string, string> = {
  controlgauge: "#d9bd8a",
  agenthq: "#b3a9ee",
  "local-ai-workbench": "#a79cf0",
  "purple-team-lab": "#c7a2e6",
  "wazuh-siem": "#8fc6d8",
  "network-security-lab": "#9fc4a8",
  "security-scripting": "#d9bd8a",
  "memory-allocator": "#c9b48c",
  "cli-text-editor": "#a9c7a0",
  "docker-wordpress": "#8fb3e0",
  "bug-hunters-guild": "#ffc46b",
  "pokemon-party-fighter": "#ff7a6b",
  "mtg-game-night": "#6ef2b8",
  lifedash: "#5be7f0",
  realitycheck: "#c6a7ff",
};
const arcTicks = (cx: number, cy: number, r: number, from: number, to: number, count: number, long = 6) =>
  Array.from({ length: count + 1 }, (_, index) => {
    const angle = ((from + ((to - from) * index) / count) * Math.PI) / 180;
    const inner = r - (index % 5 ? long : long * 2);
    return (
      <line
        key={index}
        x1={cx + Math.cos(angle) * r}
        y1={cy + Math.sin(angle) * r}
        x2={cx + Math.cos(angle) * inner}
        y2={cy + Math.sin(angle) * inner}
      />
    );
  });
const label = (x: number, y: number, text: string, anchor: "start" | "middle" = "middle") => (
  <text className="pa-label" x={x} y={y} textAnchor={anchor}>
    {text}
  </text>
);

const motifs: Record<string, () => ReactNode> = {
  controlgauge: () => (
    <>
      <path className="pa-line" d="M140 222 A100 100 0 1 1 340 222" />
      <g className="pa-ticks">{arcTicks(240, 222, 100, 135, 405, 30)}</g>
      <path className="pa-accent pa-thick" d="M240 222 L300 150" />
      <circle className="pa-fill" cx="240" cy="222" r="9" />
      {["INTERFACE", "SUPERVISOR", "SERVICE"].map((text, index) => (
        <g key={text} transform={`translate(${36 + index * 0} ${46 + index * 30})`}>
          <rect className="pa-box" width="96" height="22" />
          {label(48, 15, text)}
        </g>
      ))}
      <path className="pa-line pa-dashed" d="M132 57 H160 M132 87 H160 M132 117 H160" />
    </>
  ),
  "local-ai-workbench": () => (
    <>
      {[
        [56, "SERVE"],
        [150, "API"],
        [244, "ORCHESTRATE"],
        [338, "AGENTS"],
        [426, "OBSERVE"],
      ].map(([x, text], index) => (
        <g key={text}>
          <circle className={index === 2 ? "pa-fill" : "pa-box"} cx={x as number} cy="150" r={index === 2 ? 22 : 15} />
          {label(x as number, 196, text as string)}
        </g>
      ))}
      <path className="pa-accent" d="M71 150 H135 M165 150 H222 M266 150 L323 110 M266 150 H323 M266 150 L323 190 M353 150 H411" />
      {[110, 190].map((y) => (
        <circle key={y} className="pa-box" cx="338" cy={y} r="11" />
      ))}
      <path className="pa-line pa-dashed" d="M30 92 H450 M30 220 H450" />
    </>
  ),
  "purple-team-lab": () => (
    <>
      {[60, 190, 320].map((x, index) => (
        <g key={x}>
          <rect className="pa-box" x={x} y="70" width="100" height="160" />
          {label(x + 50, 254, ["SEGMENT A", "SEGMENT B", "TELEMETRY"][index])}
        </g>
      ))}
      <path className="pa-accent pa-thick" d="M168 70 V230 M298 70 V230" />
      <path className="pa-line" d="M86 120 C150 100 220 180 250 140 S360 110 400 150" />
      <path className="pa-accent pa-dashed" d="M90 190 C160 210 250 120 380 190" />
      {[86, 250, 400].map((x, index) => (
        <circle key={x} className="pa-fill" cx={x} cy={[120, 140, 150][index]} r="5" />
      ))}
    </>
  ),
  "wazuh-siem": () => (
    <>
      {[70, 110, 150, 190, 230].map((y, index) => (
        <path
          key={y}
          className="pa-line"
          d={`M30 ${y} C120 ${y} 170 ${150 + (index - 2) * 8} 238 150`}
        />
      ))}
      <circle className="pa-fill" cx="250" cy="150" r="20" />
      <circle className="pa-box" cx="250" cy="150" r="34" />
      <path className="pa-accent pa-thick" d="M290 150 h20 l10 -36 l14 70 l12 -50 l10 16 h40 l10 -24 l12 24 h32" />
      {label(250, 214, "CENTRAL COLLECTION")}
    </>
  ),
  "network-security-lab": () => (
    <>
      <rect className="pa-box pa-dashed" x="40" y="60" width="180" height="180" />
      <rect className="pa-box pa-dashed" x="260" y="60" width="180" height="180" />
      {label(130, 262, "INTERNAL")}
      {label(350, 262, "EXTERNAL")}
      {[
        [90, 110],
        [160, 170],
        [100, 200],
        [330, 120],
        [380, 190],
      ].map(([x, y]) => (
        <rect key={`${x}${y}`} className="pa-fill" x={x - 8} y={y - 8} width="16" height="16" />
      ))}
      <path className="pa-line" d="M90 110 L160 170 L100 200 M330 120 L380 190" />
      <path className="pa-accent pa-thick" d="M380 190 C320 220 260 150 160 170" />
      <circle className="pa-accent" cx="240" cy="168" r="10" />
    </>
  ),
  "security-scripting": () => (
    <>
      <text className="pa-brace" x="40" y="214">{"{"}</text>
      <text className="pa-brace" x="190" y="214">{"}"}</text>
      {[96, 122, 148, 174].map((y, index) => (
        <path key={y} className="pa-line" d={`M84 ${y} h${[70, 50, 84, 40][index]}`} />
      ))}
      <path className="pa-line" d="M250 200 H450" />
      {[270, 300, 330, 360, 390, 420].map((x, index) => (
        <path key={x} className={index === 4 ? "pa-accent pa-thick" : "pa-line"} d={`M${x} 200 v-${[30, 46, 24, 52, 96, 34][index]}`} />
      ))}
      <circle className="pa-accent" cx="390" cy="92" r="12" />
      {label(350, 230, "LOGIN REVIEW")}
    </>
  ),
  "memory-allocator": () => (
    <>
      {[
        [40, 70, true],
        [120, 50, false],
        [180, 90, true],
        [280, 40, false],
        [330, 110, true],
      ].map(([x, width, free]) => (
        <g key={x as number}>
          <rect className={free ? "pa-box pa-dashed" : "pa-fill"} x={x as number} y="120" width={(width as number) - 6} height="60" />
          <rect className="pa-accent" x={x as number} y="120" width="10" height="60" />
        </g>
      ))}
      <path className="pa-accent" d="M75 116 C75 70 215 70 215 116 M215 116 C215 60 385 60 385 116" />
      <path className="pa-line pa-thick" d="M400 230 V196 l-8 10 M400 196 l8 10" />
      {label(400, 254, "NEXT FIT")}
      {label(40, 214, "SBRK HEAP →", "start")}
    </>
  ),
  "cli-text-editor": () => (
    <>
      <rect className="pa-box" x="60" y="50" width="360" height="200" />
      {[84, 108, 132, 156, 180].map((y, index) => (
        <g key={y}>
          <text className="pa-label" x="78" y={y + 4}>~</text>
          <path className="pa-line" d={`M100 ${y} h${[180, 120, 230, 90, 150][index]}`} />
        </g>
      ))}
      <rect className="pa-fill" x="252" y="150" width="12" height="18" />
      <rect className="pa-accent" x="60" y="222" width="360" height="28" />
      {label(240, 241, "INCREMENTAL SEARCH")}
    </>
  ),
  "docker-wordpress": () => (
    <>
      {["WORDPRESS", "MYSQL", "PHPMYADMIN"].map((text, index) => (
        <g key={text} transform={`translate(${70 + index * 120} ${90 + (index % 2) * 30})`}>
          <rect className="pa-box" width="100" height="70" />
          <path className="pa-line" d="M0 18 H100 M0 36 H100 M0 54 H100" />
          {label(50, 92, text)}
        </g>
      ))}
      <path className="pa-accent" d="M170 125 H190 M290 140 H310" />
      <ellipse className="pa-fill" cx="240" cy="250" rx="46" ry="10" />
      <path className="pa-line" d="M194 250 V230 M286 250 V230" />
      <ellipse className="pa-box" cx="240" cy="230" rx="46" ry="10" />
    </>
  ),
  "bug-hunters-guild": () => (
    <>
      <path className="pa-box" d="M110 260 V140 A130 130 0 0 1 370 140 V260" />
      <path className="pa-line" d="M140 260 V150 A100 100 0 0 1 340 150 V260" />
      <circle className="pa-glow" cx="240" cy="150" r="58" />
      <path className="pa-accent" d="M240 70 V100 M222 100 H258 L250 160 H230 Z" />
      <circle className="pa-fill" cx="240" cy="132" r="10" />
      <text className="pa-brace" x="172" y="226">{"{"}</text>
      <text className="pa-brace" x="284" y="226">{"}"}</text>
      <ellipse className="pa-line" cx="240" cy="212" rx="16" ry="12" />
      <path className="pa-line" d="M228 204 l-12 -8 M252 204 l12 -8 M226 216 h-14 M254 216 h14 M240 200 V224" />
    </>
  ),
  "pokemon-party-fighter": () => (
    <>
      {Array.from({ length: 14 }, (_, index) => (
        <path key={index} className="pa-line" d={`M${30 + index * 8} ${60 + index * 14} H${160 + (index % 3) * 30}`} />
      ))}
      <path className="pa-glow" d="M300 60 L318 116 L374 96 L336 140 L392 170 L330 172 L344 230 L300 186 L262 232 L268 172 L210 168 L262 140 L228 96 L282 116 Z" />
      <circle className="pa-fill" cx="230" cy="150" r="24" />
      <circle className="pa-box" cx="364" cy="140" r="20" />
      <path className="pa-accent pa-thick" d="M60 250 H420" />
      <path className="pa-line" d="M120 250 V270 M360 250 V270" />
    </>
  ),
  "mtg-game-night": () => (
    <>
      <ellipse className="pa-box" cx="240" cy="150" rx="170" ry="70" />
      <ellipse className="pa-glow" cx="240" cy="150" rx="110" ry="40" />
      {[-24, -8, 8, 24].map((angle) => (
        <rect
          key={angle}
          className="pa-fill"
          x="226"
          y="114"
          width="28"
          height="40"
          transform={`rotate(${angle} 240 190)`}
        />
      ))}
      {[
        [60, 70],
        [420, 70],
        [60, 230],
        [420, 230],
      ].map(([x, y]) => (
        <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
          <rect className="pa-box" x="-13" y="-22" width="26" height="44" rx="4" />
          <path className="pa-accent" d="M-6 -4 h12 M-6 4 h8" />
        </g>
      ))}
      <path className="pa-line pa-dashed" d="M73 74 L150 120 M407 74 L330 120 M73 226 L150 180 M407 226 L330 180" />
    </>
  ),
  lifedash: () => (
    <>
      <path className="pa-line" d="M60 200 A180 180 0 0 1 420 200" />
      <circle className="pa-glow" cx="150" cy="96" r="22" />
      <path className="pa-fill" d="M348 82 A22 22 0 1 0 348 126 A17 17 0 1 1 348 82 Z" />
      {[0, 1, 2].map((index) => (
        <rect key={index} className="pa-box" x={90 + index * 106} y="186" width="90" height="70" />
      ))}
      <path className="pa-accent" d="M104 236 l14 -14 l12 8 l20 -20 M210 230 h60 M316 206 v36 h50" />
    </>
  ),
  realitycheck: () => (
    <>
      {[80, 104, 128, 152, 176, 200].map((y, index) => (
        <path key={y} className="pa-line" d={`M60 ${y} h${[220, 190, 240, 160, 210, 120][index]}`} />
      ))}
      <circle className="pa-glow" cx="300" cy="140" r="60" />
      <circle className="pa-box pa-thick" cx="300" cy="140" r="60" />
      <path className="pa-accent pa-thick" d="M344 184 L410 250" />
      <path className="pa-accent" d="M276 140 l16 16 l30 -34" />
      {label(300, 46, "CONCEPT")}
    </>
  ),
};
motifs.agenthq = () => (
  <>
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3].map((column) => (
        <rect
          key={`${row}${column}`}
          className={(row + column) % 3 ? "pa-box" : "pa-fill"}
          x={70 + column * 90}
          y={60 + row * 64}
          width="56"
          height="34"
        />
      )),
    )}
    <path className="pa-accent pa-dashed" d="M98 94 V124 H278 V158 M368 94 V222" />
  </>
);

export function ProjectArtwork({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const creative = project.home === "workshop";
  const draw = motifs[project.slug];
  return (
    <figure
      className={`project-media project-media-fallback project-artwork${creative ? " project-artwork-creative" : ""}`}
      data-media-kind="static-overview"
      style={{ "--art-accent": accents[project.slug] ?? "#c4a77b" } as CSSProperties}
    >
      <div className="project-overview-art" data-motion-slot="project-static-visual">
        <svg className="project-artwork-svg" viewBox="0 0 480 300" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
          <g className="pa-grid">
            {creative
              ? runes.map((rune, index) => (
                  <path key={rune} d={rune} transform={`translate(${30 + index * 60} ${index % 2 ? 24 : 278}) scale(0.9)`} />
                ))
              : [60, 120, 180, 240].map((y) => <path key={y} d={`M0 ${y} H480`} />)}
          </g>
          <path className="pa-registration" d="M12 24 V12 H24 M456 12 H468 V24 M468 276 V288 H456 M24 288 H12 V276" />
          {draw ? draw() : null}
        </svg>
        <div className="project-overview-copy">
          <p className="eyebrow">
            {creative ? "Creative project" : "Engineering overview"}
          </p>
          {!compact && <p className="project-overview-title">{project.title}</p>}
          <ul>
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption>
        Original illustration · not a product capture.
      </figcaption>
    </figure>
  );
}

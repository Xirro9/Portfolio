/**
 * Original, sanitized architecture illustrations for the three flagship
 * systems. Status chips repeat the canonical record; planned work is dashed.
 */
interface DiagramNode {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string[];
  chip?: string;
  tone?: "planned" | "experimental" | "core";
}
interface DiagramEdge {
  d: string;
  label?: [string, number, number];
  tone?: "planned" | "experimental";
}
interface Diagram {
  title: string;
  boundary?: string;
  note: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const diagrams: Record<string, Diagram> = {
  controlgauge: {
    title: "ControlGauge desktop foundation",
    boundary: "ANALYST WORKSTATION · LOCAL-FIRST BOUNDARY",
    note: "Implemented foundation in solid lines. Compliance workflows and local AI are planned, not implemented.",
    nodes: [
      { x: 60, y: 70, w: 250, h: 96, title: "React + TypeScript", sub: ["Desktop interface"], chip: "IMPLEMENTED" },
      { x: 60, y: 268, w: 250, h: 112, title: "Tauri v2 · Rust", sub: ["Supervisor: owns credentials", "and service lifecycle"], chip: "IMPLEMENTED", tone: "core" },
      { x: 570, y: 268, w: 250, h: 112, title: "Python · FastAPI", sub: ["Authenticated local service"], chip: "IMPLEMENTED" },
      { x: 570, y: 70, w: 250, h: 96, title: "Health & identity", sub: ["Service verification"], chip: "IMPLEMENTED" },
      { x: 330, y: 396, w: 220, h: 70, title: "Compliance workflows", sub: ["Evidence mapping · local AI"], chip: "PLANNED", tone: "planned" },
    ],
    edges: [
      { d: "M185 166 V268", label: ["commands", 196, 222] },
      { d: "M310 300 H570", label: ["spawns · supervises", 440, 290] },
      { d: "M310 348 H570", label: ["authenticated requests", 440, 338] },
      { d: "M695 268 V166", label: ["exposes", 706, 222] },
      { d: "M570 140 C460 140 380 170 300 268", label: ["verifies identity", 470, 128] },
      { d: "M695 380 V431 H550", tone: "planned" },
    ],
  },
  agenthq: {
    title: "AgentHQ telemetry pipeline",
    note: "Single-user, loopback-only. Events are sanitized before storage; DEMO, LIVE and REPLAY sources stay labeled.",
    nodes: [
      { x: 40, y: 60, w: 220, h: 84, title: "Hermes JSONL", sub: ["Documented live integration"], chip: "LIVE" },
      { x: 40, y: 200, w: 220, h: 84, title: "OpenCode adapter", sub: ["Live events unverified"], chip: "EXPERIMENTAL", tone: "experimental" },
      { x: 40, y: 340, w: 220, h: 84, title: "Demo fixture", sub: ["Labeled sample events"], chip: "DEMO" },
      { x: 330, y: 150, w: 200, h: 104, title: "Fastify ingest", sub: ["Validate · sanitize", "· redact"], tone: "core" },
      { x: 330, y: 320, w: 200, h: 104, title: "SQLite", sub: ["Event history", "and derived state"], chip: "REPLAY" },
      { x: 620, y: 80, w: 220, h: 84, title: "React panels", sub: ["Feed · task board · replay"] },
      { x: 620, y: 300, w: 220, h: 84, title: "Phaser office", sub: ["Spatial agent view"] },
    ],
    edges: [
      { d: "M260 102 C300 102 290 180 330 186" },
      { d: "M260 242 C292 242 296 214 330 210", tone: "experimental" },
      { d: "M260 382 C300 382 296 246 330 236" },
      { d: "M430 254 V320", label: ["persist", 442, 292] },
      { d: "M530 352 C584 352 566 122 620 122", label: ["HTTP + WebSocket", 590, 230] },
      { d: "M530 392 C580 392 570 342 620 342" },
    ],
  },
  "local-ai-workbench": {
    title: "Local AI workbench, sanitized",
    note: "Owner-reported environment. No hostnames, endpoints, hardware identifiers or benchmark values.",
    nodes: [
      { x: 30, y: 196, w: 170, h: 100, title: "Model serving", sub: ["llama.cpp", "local GPU"] },
      { x: 240, y: 196, w: 170, h: 100, title: "Inference API", sub: ["OpenAI-compatible"] },
      { x: 450, y: 196, w: 150, h: 100, title: "Hermes", sub: ["Orchestration"], tone: "core" },
      { x: 650, y: 52, w: 200, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { x: 650, y: 206, w: 200, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { x: 650, y: 360, w: 200, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { x: 240, y: 372, w: 250, h: 84, title: "AgentHQ", sub: ["Observes supported telemetry"], chip: "OBSERVE" },
    ],
    edges: [
      { d: "M200 246 H240" },
      { d: "M410 246 H450" },
      { d: "M600 230 C630 230 620 92 650 92" },
      { d: "M600 246 H650" },
      { d: "M600 262 C630 262 620 400 650 400" },
      { d: "M650 418 C580 418 560 414 490 414", label: ["telemetry", 570, 404], tone: "experimental" },
      { d: "M525 296 V340 C525 360 510 372 490 380" },
    ],
  },
};

export const hasSystemDiagram = (slug: string) => slug in diagrams;

export function SystemDiagram({ slug }: { slug: string }) {
  const diagram = diagrams[slug];
  if (!diagram) return null;
  return (
    <figure
      className="system-diagram"
      data-diagram={slug}
      data-motion-slot="architecture-lines"
    >
      <div
        className="system-diagram-scroll"
        role="region"
        aria-label={`${diagram.title} illustration`}
        tabIndex={0}
      >
        <svg viewBox="0 0 880 500" aria-hidden="true" focusable="false">
          <g className="sd-grid">
            {Array.from({ length: 11 }, (_, index) => (
              <path key={`v${index}`} d={`M${index * 88} 0 V500`} />
            ))}
            {Array.from({ length: 6 }, (_, index) => (
              <path key={`h${index}`} d={`M0 ${index * 100} H880`} />
            ))}
          </g>
          {diagram.boundary && (
            <>
              <rect className="sd-boundary" x="20" y="20" width="840" height="460" />
              <text className="sd-edge-label" x="36" y="42">
                {diagram.boundary}
              </text>
            </>
          )}
          {diagram.edges.map((edge) => (
            <g key={edge.d} className={`sd-edge${edge.tone ? ` sd-${edge.tone}` : ""}`}>
              <path className="sd-wire" pathLength={1} d={edge.d} data-motion-part="diagram-path" />
              {edge.label && (
                <text className="sd-edge-label" x={edge.label[1]} y={edge.label[2]} textAnchor="middle">
                  {edge.label[0]}
                </text>
              )}
            </g>
          ))}
          {diagram.nodes.map((node, index) => (
            <g
              key={`${node.title}-${index}`}
              className={`sd-node${node.tone ? ` sd-${node.tone}` : ""}`}
              transform={`translate(${node.x} ${node.y})`}
              data-motion-part="diagram-node"
            >
              <rect width={node.w} height={node.h} />
              <path className="sd-corner" d={`M0 12 V0 H12 M${node.w - 12} ${node.h} H${node.w} V${node.h - 12}`} />
              <text className="sd-title" x="18" y="34">
                {node.title}
              </text>
              {node.sub.map((line, row) => (
                <text key={line} className="sd-sub" x="18" y={58 + row * 20}>
                  {line}
                </text>
              ))}
              {node.chip && (
                <g transform={`translate(${node.w - 14} -11)`}>
                  <rect className="sd-chip" x={-node.chip.length * 8.4 - 14} width={node.chip.length * 8.4 + 14} height="22" />
                  <text className="sd-chip-label" x={-7} y="15" textAnchor="end">
                    {node.chip}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption>
        Original architecture illustration · {diagram.note}
      </figcaption>
    </figure>
  );
}

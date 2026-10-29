/**
 * Original, sanitized architecture illustrations for the three flagship
 * systems. Status chips repeat the canonical record; planned work is dashed.
 * The SVG is decorative; the same nodes and relationships are rendered as an
 * ordered list, which is the readable portrait layout on narrow screens.
 */
type Tone = "planned" | "experimental" | "core";
interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string[];
  chip?: string;
  tone?: Tone;
}
interface DiagramEdge {
  from: string;
  to: string;
  d: string;
  label?: [string, number, number];
  tone?: "planned" | "experimental";
}
interface DiagramZone {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Lets an edge target the zone as a whole; `name` is its readable label. */
  id?: string;
  name?: string;
}
interface Diagram {
  title: string;
  size: [number, number];
  boundary?: string;
  note: string;
  legend: (keyof typeof legendLabels)[];
  zones: DiagramZone[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const diagrams: Record<string, Diagram> = {
  controlgauge: {
    title: "ControlGauge desktop foundation",
    size: [1000, 520],
    boundary: "ANALYST WORKSTATION · LOCAL-FIRST BOUNDARY",
    note: "Implemented foundation in solid lines. Compliance workflows and local AI are planned, not implemented.",
    legend: ["implemented", "planned"],
    zones: [
      { x: 50, y: 64, w: 330, h: 362, label: "DESKTOP SHELL" },
      { x: 620, y: 64, w: 330, h: 362, label: "LOCAL SERVICE" },
    ],
    nodes: [
      { id: "ui", x: 80, y: 104, w: 270, h: 96, title: "React + TypeScript", sub: ["Desktop interface"], chip: "IMPLEMENTED" },
      { id: "tauri", x: 80, y: 290, w: 270, h: 112, title: "Tauri v2 · Rust", sub: ["Supervisor: owns credentials", "and service lifecycle"], chip: "IMPLEMENTED", tone: "core" },
      { id: "service", x: 650, y: 290, w: 270, h: 112, title: "Python · FastAPI", sub: ["Authenticated local service"], chip: "IMPLEMENTED" },
      { id: "health", x: 650, y: 104, w: 270, h: 96, title: "Health & identity", sub: ["Service verification"], chip: "IMPLEMENTED" },
      { id: "workflows", x: 362, y: 404, w: 276, h: 80, title: "Compliance workflows", sub: ["Evidence mapping · local AI"], chip: "PLANNED", tone: "planned" },
    ],
    edges: [
      { from: "ui", to: "tauri", d: "M215 200 V290", label: ["commands", 262, 250] },
      { from: "tauri", to: "service", d: "M350 324 H650", label: ["spawns · supervises", 500, 313] },
      { from: "tauri", to: "service", d: "M350 370 H650", label: ["authenticated requests", 500, 359] },
      { from: "service", to: "health", d: "M785 290 V200", label: ["exposes", 828, 250] },
      { from: "tauri", to: "health", d: "M650 152 C540 152 440 196 350 300", label: ["verifies identity", 520, 140] },
      { from: "service", to: "workflows", d: "M785 402 V470 H638", tone: "planned" },
    ],
  },
  agenthq: {
    title: "AgentHQ telemetry pipeline",
    size: [880, 500],
    note: "Single-user, loopback-only. Events are sanitized before storage; DEMO, LIVE and REPLAY sources stay labeled.",
    legend: ["implemented", "experimental"],
    zones: [
      { x: 24, y: 30, w: 252, h: 420, label: "SOURCES" },
      { x: 314, y: 120, w: 232, h: 330, label: "LOCAL SERVER" },
      { x: 604, y: 50, w: 252, h: 360, label: "INTERFACE" },
    ],
    nodes: [
      { id: "hermes", x: 40, y: 60, w: 220, h: 84, title: "Hermes JSONL", sub: ["Documented live integration"], chip: "LIVE" },
      { id: "opencode", x: 40, y: 200, w: 220, h: 84, title: "OpenCode adapter", sub: ["Live events unverified"], chip: "EXPERIMENTAL", tone: "experimental" },
      { id: "demo", x: 40, y: 340, w: 220, h: 84, title: "Demo fixture", sub: ["Labeled sample events"], chip: "DEMO" },
      { id: "ingest", x: 330, y: 150, w: 200, h: 104, title: "Fastify ingest", sub: ["Validate · sanitize", "· redact"], tone: "core" },
      { id: "store", x: 330, y: 320, w: 200, h: 104, title: "SQLite", sub: ["Event history", "and derived state"], chip: "REPLAY" },
      { id: "panels", x: 620, y: 80, w: 220, h: 84, title: "React panels", sub: ["Feed · task board · replay"] },
      { id: "office", x: 620, y: 300, w: 220, h: 84, title: "Phaser office", sub: ["Spatial agent view"] },
    ],
    edges: [
      { from: "hermes", to: "ingest", d: "M260 102 C300 102 290 180 330 186" },
      { from: "opencode", to: "ingest", d: "M260 242 C292 242 296 214 330 210", tone: "experimental" },
      { from: "demo", to: "ingest", d: "M260 382 C300 382 296 246 330 236" },
      { from: "ingest", to: "store", d: "M430 254 V320", label: ["persist", 466, 292] },
      { from: "store", to: "panels", d: "M530 352 C584 352 566 122 620 122", label: ["HTTP + WebSocket", 590, 230] },
      { from: "store", to: "office", d: "M530 392 C580 392 570 342 620 342" },
    ],
  },
  "local-ai-workbench": {
    title: "Local AI workbench, sanitized",
    size: [1000, 560],
    boundary: "LOCAL-FIRST ENVIRONMENT · OWNER-REPORTED",
    note: "Owner-reported environment. No hostnames, endpoints, hardware identifiers or benchmark values.",
    legend: ["implemented", "experimental"],
    zones: [
      { x: 30, y: 150, w: 400, h: 190, label: "SERVING" },
      { x: 460, y: 150, w: 200, h: 190, label: "ORCHESTRATION" },
      { x: 690, y: 22, w: 286, h: 446, label: "SPECIALIST TOOLS" },
      { x: 290, y: 396, w: 370, h: 140, label: "OBSERVABILITY" },
    ],
    nodes: [
      { id: "serve", x: 56, y: 202, w: 170, h: 100, title: "Model serving", sub: ["llama.cpp", "local GPU"] },
      { id: "api", x: 244, y: 202, w: 166, h: 100, title: "Inference API", sub: ["OpenAI-compatible"] },
      { id: "hermes", x: 480, y: 202, w: 160, h: 100, title: "Hermes", sub: ["Orchestration"], tone: "core" },
      { id: "oc1", x: 716, y: 64, w: 236, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { id: "oc2", x: 716, y: 206, w: 236, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { id: "oc3", x: 716, y: 348, w: 236, h: 80, title: "OpenCode specialist", sub: ["Delegated role"] },
      { id: "agenthq", x: 320, y: 440, w: 300, h: 76, title: "AgentHQ", sub: ["Observes supported telemetry"], chip: "OBSERVE" },
    ],
    edges: [
      { from: "serve", to: "api", d: "M226 252 H244" },
      { from: "api", to: "hermes", d: "M410 252 H480" },
      { from: "hermes", to: "oc1", d: "M640 236 C680 236 676 104 716 104" },
      { from: "hermes", to: "oc2", d: "M640 252 H716" },
      { from: "hermes", to: "oc3", d: "M640 268 C680 268 676 388 716 388" },
      { from: "hermes", to: "agenthq", d: "M560 302 V440", label: ["events", 594, 376] },
      { from: "oc3", to: "agenthq", d: "M716 408 C670 408 664 478 620 478", label: ["telemetry", 676, 462], tone: "experimental" },
    ],
  },
  "agent-harness": {
    title: "Local agent harness, sanitized",
    size: [1000, 600],
    note: "Reported configuration from the multi-GPU test environment. Roles share one inference slot and run in turn; premium models are reachable only on explicit approval. No addresses or machine details.",
    legend: ["reported", "gated"],
    zones: [
      { x: 24, y: 40, w: 256, h: 330, label: "ORCHESTRATION" },
      { x: 314, y: 40, w: 272, h: 170, label: "EXECUTION" },
      { id: "roles", name: "Specialist roles", x: 620, y: 30, w: 360, h: 300, label: "SPECIALIST ROLES" },
      { x: 314, y: 400, w: 666, h: 170, label: "INFERENCE · PRIVATE NETWORK" },
    ],
    nodes: [
      { id: "hermes", x: 44, y: 80, w: 220, h: 96, title: "Hermes", sub: ["Manager: memory,", "policy, routing"], tone: "core" },
      { id: "tools", x: 44, y: 250, w: 220, h: 96, title: "Evidence tools", sub: ["Playwright · Semgrep", "Gitleaks · Trivy"] },
      { id: "premium", x: 44, y: 460, w: 220, h: 84, title: "Premium model", sub: ["Hosted, opt-in"], chip: "GATED", tone: "planned" },
      { id: "opencode", x: 334, y: 80, w: 210, h: 96, title: "OpenCode", sub: ["Repo tools, edits,", "commands, tests"] },
      { id: "architect", x: 640, y: 66, w: 158, h: 68, title: "Architect", sub: [], chip: "READ" },
      { id: "security", x: 812, y: 66, w: 158, h: 68, title: "Security", sub: [], chip: "READ" },
      { id: "implementation", x: 640, y: 160, w: 158, h: 68, title: "Implement", sub: [], chip: "EDIT" },
      { id: "frontend", x: 812, y: 160, w: 158, h: 68, title: "Frontend", sub: [], chip: "EDIT" },
      { id: "tester", x: 640, y: 254, w: 158, h: 68, title: "Tester", sub: [], chip: "EDIT" },
      { id: "debugger", x: 812, y: 254, w: 158, h: 68, title: "Debugger", sub: [], chip: "EDIT" },
      { id: "api", x: 334, y: 444, w: 232, h: 92, title: "Inference API", sub: ["OpenAI-compatible"] },
      { id: "server", x: 620, y: 444, w: 160, h: 92, title: "llama.cpp", sub: ["Docker · CUDA"], chip: "1 SLOT" },
      { id: "model", x: 806, y: 444, w: 158, h: 92, title: "GLM-5.3", sub: ["Flash · Q4"] },
    ],
    edges: [
      { from: "hermes", to: "opencode", d: "M264 128 H334", label: ["brief", 299, 116] },
      { from: "opencode", to: "roles", d: "M544 128 H620", label: ["dispatch", 582, 116] },
      { from: "opencode", to: "tools", d: "M334 150 C300 150 300 298 264 298" },
      { from: "opencode", to: "api", d: "M439 176 V444", label: ["requests", 481, 310] },
      { from: "roles", to: "api", d: "M720 330 C720 390 520 380 520 444", label: ["queued, one at a time", 838, 372] },
      { from: "api", to: "server", d: "M566 490 H620" },
      { from: "server", to: "model", d: "M780 490 H806" },
      { from: "hermes", to: "premium", d: "M44 150 H30 V500 H44", label: ["on approval", 154, 440], tone: "planned" },
    ],
  },
};

const legendLabels = {
  implemented: "Implemented",
  planned: "Planned",
  experimental: "Experimental",
  reported: "Reported working",
  gated: "Approval-gated",
};

export const hasSystemDiagram = (slug: string) => slug in diagrams;

export function SystemDiagram({ slug }: { slug: string }) {
  const diagram = diagrams[slug];
  if (!diagram) return null;
  const [width, height] = diagram.size;
  const name = (id: string) =>
    diagram.nodes.find((node) => node.id === id)?.title ??
    diagram.zones.find((zone) => zone.id === id)?.name ??
    id;
  return (
    <figure
      className="system-diagram"
      data-diagram={slug}
      data-motion-slot="architecture-lines"
    >
      <div className="system-diagram-stage">
        <ul className="sd-legend" aria-label="Diagram legend">
          {diagram.legend.map((item) => (
            <li key={item} className={`sd-legend-${item}`}>
              {legendLabels[item]}
            </li>
          ))}
        </ul>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
          focusable="false"
        >
          <g className="sd-grid">
            {Array.from({ length: Math.ceil(width / 50) + 1 }, (_, index) => (
              <path key={`v${index}`} d={`M${index * 50} 0 V${height}`} />
            ))}
            {Array.from({ length: Math.ceil(height / 50) + 1 }, (_, index) => (
              <path key={`h${index}`} d={`M0 ${index * 50} H${width}`} />
            ))}
          </g>
          {diagram.boundary && (
            <>
              <rect
                className="sd-boundary"
                x="20"
                y="20"
                width={width - 40}
                height={height - 40}
              />
              <text className="sd-zone-label" x="40" y="44">
                {diagram.boundary}
              </text>
            </>
          )}
          {diagram.zones.map((zone) => (
            <g
              key={zone.label}
              className="sd-zone"
              data-motion-part="diagram-zone"
            >
              <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} />
              <path
                className="sd-zone-rule"
                d={`M${zone.x} ${zone.y} H${zone.x + 28}`}
              />
              <text className="sd-zone-label" x={zone.x + 36} y={zone.y + 4}>
                {zone.label}
              </text>
            </g>
          ))}
          {diagram.edges.map((edge, index) => (
            <g
              key={edge.d}
              className={`sd-edge${edge.tone ? ` sd-${edge.tone}` : ""}`}
            >
              <path
                className="sd-wire"
                pathLength={1}
                d={edge.d}
                data-motion-part="diagram-path"
              />
              {edge.tone !== "planned" && (
                // A sparse packet travelling the wire: data flow, not decoration.
                <path
                  className="sd-flow"
                  pathLength={1}
                  d={edge.d}
                  style={{ animationDelay: `${(index * 1.3) % 7}s` }}
                />
              )}
              {edge.label && (
                <text
                  className="sd-edge-label"
                  x={edge.label[1]}
                  y={edge.label[2]}
                  textAnchor="middle"
                >
                  {edge.label[0]}
                </text>
              )}
            </g>
          ))}
          {diagram.nodes.map((node) => (
            <g
              key={node.id}
              className={`sd-node${node.tone ? ` sd-${node.tone}` : ""}`}
              transform={`translate(${node.x} ${node.y})`}
              data-motion-part="diagram-node"
            >
              <rect className="sd-plinth" x="7" y="7" width={node.w} height={node.h} />
              <rect className="sd-plate" width={node.w} height={node.h} />
              <path
                className="sd-corner"
                d={`M0 12 V0 H12 M${node.w - 12} ${node.h} H${node.w} V${node.h - 12}`}
              />
              <text className="sd-title" x="18" y="36">
                {node.title}
              </text>
              {node.sub.map((line, row) => (
                <text key={line} className="sd-sub" x="18" y={60 + row * 20}>
                  {line}
                </text>
              ))}
              {node.chip && (
                <g transform={`translate(${node.w - 14} -12)`}>
                  <rect
                    className="sd-chip"
                    x={-node.chip.length * 8.6 - 16}
                    width={node.chip.length * 8.6 + 16}
                    height="24"
                  />
                  <text className="sd-chip-label" x={-8} y="16.5" textAnchor="end">
                    {node.chip}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="sd-index" role="group" aria-label={diagram.title}>
        <ol className="sd-index-nodes">
          {diagram.nodes.map((node) => (
            <li
              key={node.id}
              className={node.tone ? `sd-index-${node.tone}` : undefined}
            >
              <strong>{node.title}</strong>
              <span>{node.sub.join(" ")}</span>
              {node.chip && <em>{node.chip.toLowerCase()}</em>}
            </li>
          ))}
        </ol>
        <ul className="sd-index-edges" aria-label="Relationships">
          {diagram.edges.map((edge) => (
            <li key={edge.d} className={edge.tone ? `sd-index-${edge.tone}` : undefined}>
              {name(edge.from)} <span aria-hidden="true">→</span>
              <span className="visually-hidden">to</span> {name(edge.to)}
              {edge.label ? `: ${edge.label[0]}` : ""}
              {edge.tone ? ` (${edge.tone})` : ""}
            </li>
          ))}
        </ul>
      </div>
      <figcaption>
        Original architecture illustration · {diagram.note}
      </figcaption>
    </figure>
  );
}

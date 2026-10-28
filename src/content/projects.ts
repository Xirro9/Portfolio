import type { Project } from "./types";

const gh = (repo: string) => `https://github.com/${repo}`;
const cg = gh("MoonPhase-LLC/ControlGauge");
const hq = gh("Xirro9/AgentHQ");
const role =
  "Personal project developed with AI coding assistance. This case study describes the system and its documented behavior; it does not claim sole manual authorship of the implementation.";

export const projects: Project[] = [
  {
    slug: "controlgauge",
    title: "ControlGauge",
    home: "work",
    category: "security",
    tags: ["Tauri v2", "React", "TypeScript", "Rust", "Python", "FastAPI"],
    status: "active",
    featured: true,
    verification: "repository-documented",
    statusDetail:
      "Desktop foundation implemented; compliance workflows and local AI are planned.",
    summary:
      "A local-first compliance application with an authenticated desktop/service foundation. Previously EvidenceGraph.",
    problem:
      "Analysts need to connect heterogeneous evidence to security requirements without surrendering sensitive artifacts to cloud AI. ControlGauge is being built for that workflow, beginning with NIST SP 800-53 Rev 5.",
    role,
    architecture: [
      "React + TypeScript desktop interface",
      "Tauri / Rust supervisor owns credentials and service lifecycle",
      "Authenticated Python / FastAPI local service",
      "Health and service-identity verification",
    ],
    implemented: [
      "Tauri v2 shell and basic desktop layout with service health display.",
      "Session-token authentication and challenge-based service identity checks performed in Rust; frontend code does not receive the credential.",
      "Rust service supervision and authenticated health flow.",
      "Frontend, Python service, and Rust test infrastructure; GitHub Actions CI.",
      "Windows installer spike bundles the Python service. Packaging documentation records a successful manual clean-machine test.",
    ],
    challenges: [
      "Establishing that a local endpoint is the service the application actually launched.",
      "Shipping a supervised Python process inside a Windows desktop installation without requiring a development toolchain.",
    ],
    safeguards: [
      "Credentials remain behind the Rust boundary.",
      "The planned evidence pipeline treats documents and model output as untrusted data.",
      "Human review is a product requirement for future compliance suggestions, not an implemented assessment feature.",
    ],
    results: [
      "A documented desktop-to-service foundation and packaged Windows proof of concept. These are repository-reported results; the installer was not retested during this portfolio update.",
    ],
    limitations: [
      "No evidence ingestion, persistent evidence database, local inference, AI mapping, or working assessment workflow.",
      "Installer spike is unsigned and is not a production distribution release. Sprint 1 exit validation remains pending in the inspected README.",
    ],
    planned: [
      "Evidence ingestion and parsing.",
      "Local inference, embeddings, and retrieval.",
      "Traceable candidate evidence/control mappings with analyst review.",
      "Persistent records and full assessment workflow. Additional frameworks remain outside V0.1 scope.",
    ],
    lessons: [
      "A local-first security boundary must work before sensitive evidence enters the system.",
      "Packaging is a separate validation problem from running a development build.",
    ],
    evidence: [
      { label: "Project status and architecture", url: cg },
      {
        label: "Windows packaging and recorded validation",
        url: `${cg}/blob/main/docs/PACKAGING.md`,
      },
      {
        label: "Authenticated health endpoint",
        url: `${cg}/blob/main/service/src/controlgauge_service/routes/health.py`,
      },
    ],
    repositoryUrl: cg,
    related: ["agenthq", "local-ai-workbench"],
  },
  {
    slug: "agenthq",
    title: "AgentHQ",
    home: "work",
    category: "ai-infrastructure",
    tags: [
      "TypeScript",
      "React 19",
      "Phaser 3",
      "Fastify",
      "SQLite",
      "WebSocket",
    ],
    status: "active",
    featured: true,
    verification: "repository-documented",
    statusDetail:
      "Hermes integration documented live; OpenCode telemetry is experimental.",
    summary:
      "A pixel-art office backed by a local telemetry system: inspect coding-agent activity, tasks, and replayable events.",
    problem:
      "A wall of logs makes it difficult to understand the activity of a coding-agent team. AgentHQ gives observed events a spatial interface while preserving their source and status.",
    role,
    architecture: [
      "Hermes JSONL adapter / experimental OpenCode adapter / labeled demo fixture",
      "Fastify validates, sanitizes, and redacts events",
      "SQLite event history and derived workstation state",
      "HTTP + WebSocket → React panels and Phaser office",
    ],
    implemented: [
      "Live Hermes telemetry ingestion documented in the integration audit.",
      "Interactive agent workstations, activity feed, task board, and replay timeline.",
      "Shared event contracts, SQLite storage, and WebSocket updates.",
      "Server-side event sanitization and session pseudonymization.",
      "Day/night ambience and cosmetic cats Pixel and Biscuit.",
    ],
    challenges: [
      "Separating live observations, demo fixtures, stale sources, and replay.",
      "Normalizing agent activity without forwarding raw private tool payloads.",
      "Making an expressive visualization useful for inspection.",
    ],
    safeguards: [
      "Read-only adapters observe activity without controlling the agent runtime.",
      "Events are sanitized before storage or streaming.",
      "No authentication layer: intended for a single-user, loopback-only environment.",
    ],
    results: [
      "Repository evidence demonstrates Hermes-connected office views and replay tools. Existing test documentation records verification; this portfolio update did not rerun AgentHQ’s test suite.",
    ],
    limitations: [
      "OpenCode live event support is unverified and remains experimental.",
      "Not suitable for exposing as an unauthenticated network service.",
      "Event-store retention and telemetry-integrity hardening remain documented follow-up work.",
    ],
    planned: [
      "Further visual and audio polish.",
      "Packaging and additional hardening.",
      "Validate OpenCode integration against a real event stream.",
    ],
    lessons: [
      "Source provenance is part of the interface contract.",
      "Privacy controls belong at event ingestion, before persistence and rendering.",
    ],
    evidence: [
      { label: "Repository and real screenshot tour", url: hq },
      {
        label: "Integration evidence and limitations",
        url: `${hq}/blob/main/docs/INTEGRATION_AUDIT.md`,
      },
      { label: "Test matrix", url: `${hq}/blob/main/docs/TEST_MATRIX.md` },
      {
        label: "Event sanitizer implementation",
        url: `${hq}/blob/main/src/server/redact.ts`,
      },
    ],
    repositoryUrl: hq,
    related: ["local-ai-workbench", "controlgauge"],
    media: {
      path: "media/agenthq-night.png",
      alt: "AgentHQ pixel-art office with agent desks in night lighting and activity controls.",
      caption:
        "Real application capture in DEMO mode from AgentHQ’s public evidence set, e2e-04-night.png. Demonstrates night ambience and settings, not a live telemetry connection.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "local-ai-workbench",
    title: "Local AI workbench",
    home: "work",
    category: "ai-infrastructure",
    tags: ["Ubuntu", "Docker", "llama.cpp", "Hermes", "OpenCode"],
    status: "experimental",
    verification: "owner-reported",
    statusDetail:
      "Active local experimentation; no performance benchmarks published.",
    summary:
      "Model serving, specialized coding agents, and observability explored as one local-first development environment.",
    problem:
      "How can local models support specialized development workflows while maintaining visibility, privacy, and resource control?",
    role: "Local environment configuration and agent-workflow experimentation, as reported in my October 2026 project brief. AgentHQ’s public integration audit corroborates the Hermes/local-provider environment; broader infrastructure claims remain owner-reported.",
    architecture: [
      "Local model-serving layer (llama.cpp)",
      "Hermes orchestration",
      "OpenCode specialists and tool delegation",
      "AgentHQ observes supported telemetry",
    ],
    implemented: [
      "Owner-reported local serving through an OpenAI-compatible interface.",
      "Hermes and OpenCode workflow configuration and specialist role experimentation.",
      "Public AgentHQ documentation corroborates a local llama.cpp provider and Hermes integration.",
    ],
    challenges: [
      "Controlling inference resources across specialist workflows.",
      "Separating configured context limits from validated workload behavior.",
      "Defining reviewer permissions and external-model escalation rules.",
    ],
    safeguards: [
      "Architecture shown here is deliberately sanitized: no machine identifiers, endpoint addresses, or connection instructions.",
      "Read-only reviewer boundaries and local-first routing are workflow goals reported by the owner; not a security certification.",
    ],
    results: [
      "An evolving local development environment, with public observability evidence available through AgentHQ. No throughput, model-quality, or maximum-usable-context result is claimed.",
    ],
    limitations: [
      "Hardware specifications and repeatable performance evidence are not published here.",
      "vLLM and CUDA configuration remain experimentation rather than a proven production stack.",
    ],
    planned: [
      "Repeatable evaluation workloads and resource measurements.",
      "Further validation of delegation boundaries and adapter behavior.",
    ],
    lessons: [
      "Resource limits must inform orchestration policy.",
      "A configured context window is not a benchmark.",
    ],
    evidence: [
      {
        label: "Public environment corroboration (AgentHQ)",
        url: `${hq}/blob/main/docs/INTEGRATION_AUDIT.md`,
      },
    ],
    related: ["agenthq", "controlgauge"],
  },
  {
    slug: "purple-team-lab",
    title: "Purple teaming lab",
    home: "labs",
    category: "security",
    tags: ["Proxmox", "OPNsense", "Suricata", "Wazuh", "Linux"],
    status: "experimental",
    verification: "owner-reported",
    statusDetail:
      "Hands-on lab; detection effectiveness has not been benchmarked.",
    summary:
      "A contained environment for segmentation, defensive telemetry, and controlled adversarial validation.",
    problem:
      "Security requirements become easier to assess when network boundaries and system behavior can be observed directly.",
    role: "Personal lab configuration and experimentation, described in my portfolio brief and earlier portfolio.",
    architecture: [
      "Virtualized hosts",
      "Segmented networks and firewall boundaries",
      "Security telemetry and monitoring",
      "Controlled validation workflows",
    ],
    implemented: [
      "Owner-reported lab work with Proxmox, OPNsense, Suricata, Wazuh, and Linux services.",
      "Earlier portfolio describes routed segments, service exposure review, and contained adversary simulation.",
    ],
    challenges: [
      "Relating network policy to observed connectivity and telemetry.",
    ],
    safeguards: [
      "Controlled lab scope only; no target addresses or identifying diagrams are published.",
    ],
    results: [
      "Hands-on experience in segmentation and defensive visibility; no successful detection or compromise outcomes are claimed.",
    ],
    limitations: [
      "No public detection-validation dataset or lab report is available.",
    ],
    planned: [
      "Publish a sanitized topology and repeatable validation notes when approved.",
    ],
    lessons: [
      "Visible telemetry and a stated test scope are prerequisites for evaluating a defensive control.",
    ],
    evidence: [],
    related: ["wazuh-siem", "network-security-lab"],
  },
  {
    slug: "wazuh-siem",
    title: "Wazuh SIEM deployment",
    home: "labs",
    category: "security",
    tags: ["Wazuh", "Logging", "Authentication monitoring"],
    status: "historical",
    verification: "owner-reported",
    statusDetail: "Earlier hands-on lab retained from the original portfolio.",
    summary:
      "Centralized log collection and security-event visibility across lab systems.",
    problem:
      "Distributed logs make it difficult to follow authentication and system activity.",
    role: "Personal lab deployment, described in the original portfolio.",
    architecture: [
      "Endpoints and Linux services",
      "Central Wazuh collection",
      "Event review and alert workflows",
    ],
    implemented: [
      "Configured centralized logging and explored authentication-event monitoring and alerting.",
    ],
    challenges: ["Connecting useful source events with monitoring workflows."],
    safeguards: ["Public summary excludes endpoint identities and raw logs."],
    results: ["Practical experience with log aggregation and event review."],
    limitations: ["No detection-rate or operational coverage claims."],
    planned: [],
    lessons: [
      "Monitoring depends on the quality and scope of the collected events.",
    ],
    evidence: [],
    related: ["purple-team-lab", "security-scripting"],
  },
  {
    slug: "network-security-lab",
    title: "Segmented network & exposure validation",
    home: "labs",
    category: "security",
    tags: ["Networking", "Service configuration", "Exposure testing"],
    status: "historical",
    verification: "owner-reported",
    statusDetail: "Authorized lab observations; no broader compromise claimed.",
    summary:
      "Routed service deployment and contained testing of access boundaries.",
    problem:
      "A service can be reachable in ways its configuration or intended network policy does not anticipate.",
    role: "Hands-on lab configuration and authorized service checks, as reported in my brief.",
    architecture: [
      "Contained network segments",
      "Web and file services",
      "Internal and external accessibility checks",
    ],
    implemented: [
      "Configured services and routing in a contained environment.",
      "Reported lab finding: an exposed Elasticsearch service returned an unauthenticated HTTP response.",
    ],
    challenges: [
      "Distinguishing reachability from evidence of a deeper security impact.",
    ],
    safeguards: [
      "No lab addresses, customer details, or identifying infrastructure are included.",
    ],
    results: [
      "Confirmed unauthenticated HTTP response in an authorized lab, as owner-reported.",
    ],
    limitations: [
      "No credential compromise, execution, persistence, or domain compromise was demonstrated.",
    ],
    planned: [],
    lessons: ["A finding should stop at the impact the evidence supports."],
    evidence: [],
    related: ["purple-team-lab"],
  },
  {
    slug: "security-scripting",
    title: "Incident response scripting",
    home: "labs",
    category: "security",
    tags: ["Python", "Windows inventory", "Authentication monitoring"],
    status: "historical",
    verification: "repository-documented",
    statusDetail: "March 2025 coursework; team project and personal fork.",
    summary:
      "A small team toolkit for asset inventory and suspicious-login detection.",
    problem:
      "Incident preparation and detection require repeatable collection and review of system evidence.",
    role: "Team member on a University of Tulsa CYB-4863 project. This repository is my fork; individual script ownership is not established by the README.",
    architecture: [
      "Windows inventory collection",
      "Structured JSON output",
      "Login monitoring and controlled simulation",
    ],
    implemented: [
      "Repository documents inventory of active users, installed software, missing patches, and USB history.",
      "Suspicious-login monitoring and a controlled brute-force simulation script.",
      "Team methodology and reflections in the project report.",
    ],
    challenges: [
      "Collecting system information consistently and validating detection behavior.",
    ],
    safeguards: [
      "No raw inventory, login evidence, usernames, or screenshots copied into this portfolio.",
    ],
    results: [
      "Documented educational toolkit, not a production incident-response platform.",
    ],
    limitations: [
      "Tests and scripts were not rerun for this portfolio update.",
    ],
    planned: [],
    lessons: [
      "Automation needs an explicit collection scope and test evidence.",
    ],
    evidence: [
      {
        label: "Team attribution and repository",
        url: gh("Xirro9/CYB-4863-Scripting-Project"),
      },
    ],
    repositoryUrl: gh("Xirro9/CYB-4863-Scripting-Project"),
    related: ["wazuh-siem"],
  },
  {
    slug: "memory-allocator",
    title: "Custom memory allocator",
    home: "work",
    category: "foundational",
    tags: ["C", "POSIX", "Memory management"],
    status: "historical",
    verification: "repository-documented",
    statusDetail:
      "Coursework implementation with documented correctness limitations.",
    summary:
      "A C heap allocator built on sbrk with a free list and next-fit search.",
    problem:
      "Understand the mechanics and tradeoffs behind allocation, splitting, and reuse.",
    role: "The repository attributes src/alloc.c to my implementation; the course supplied the skeleton and test driver.",
    architecture: [
      "sbrk heap growth",
      "Block headers and free list",
      "malloc / calloc / realloc / free style API",
    ],
    implemented: [
      "Allocation, zero-initialization, reallocation, and free operations.",
      "Next-fit search, splitting, and coalescing helpers.",
    ],
    challenges: ["Tracking free space correctly across allocation and reuse."],
    safeguards: [
      "Educational code only; not presented as a hardened allocator.",
    ],
    results: [
      "Systems-programming practice grounded in an inspectable C implementation.",
    ],
    limitations: [
      "Split remainders are not relinked; coalescing is not performed on free.",
      "No thread safety or invalid-free validation. No efficiency benchmark is claimed.",
    ],
    planned: [
      "Potential improvements: relink split blocks and validate frees.",
    ],
    lessons: [
      "An allocator’s advertised API does not establish its correctness.",
    ],
    evidence: [
      {
        label: "Implementation, course attribution, and limitations",
        url: gh("Xirro9/MemoryAllocator"),
      },
    ],
    repositoryUrl: gh("Xirro9/MemoryAllocator"),
    related: ["cli-text-editor"],
  },
  {
    slug: "cli-text-editor",
    title: "CLI text editor",
    home: "work",
    category: "foundational",
    tags: ["C", "POSIX", "Terminal I/O"],
    status: "historical",
    verification: "repository-documented",
    statusDetail:
      "Tutorial implementation complete through incremental search.",
    summary:
      "A terminal editor built through the Build Your Own Text Editor tutorial based on kilo.",
    problem:
      "Learn how raw terminal input, screen rendering, editing, and file persistence fit together.",
    role: "Tutorial-guided implementation; credits belong to Jeremy Ruten’s tutorial and Salvatore Sanfilippo’s kilo, as documented in the repository.",
    architecture: [
      "Raw terminal input",
      "In-memory rows and screen refresh",
      "File open/save and incremental search",
    ],
    implemented: [
      "Navigation, editing, open/save, incremental search, status bar, and unsaved-change quit guard.",
    ],
    challenges: [
      "Decoding input and keeping cursor and viewport state consistent.",
    ],
    safeguards: [
      "Original tutorial and BSD license attribution retained in the linked repository.",
    ],
    results: ["A practical terminal I/O learning project."],
    limitations: [
      "Syntax highlighting is not implemented. No fresh POSIX build was run during this portfolio update.",
    ],
    planned: [],
    lessons: [
      "Small interactive tools make operating-system interfaces concrete.",
    ],
    evidence: [
      {
        label: "Tutorial credits and feature scope",
        url: gh("Xirro9/textEditor"),
      },
    ],
    repositoryUrl: gh("Xirro9/textEditor"),
    related: ["memory-allocator"],
  },
  {
    slug: "docker-wordpress",
    title: "Docker WordPress lab",
    home: "labs",
    category: "foundational",
    tags: ["Docker Compose", "WordPress", "MySQL", "phpMyAdmin"],
    status: "historical",
    verification: "repository-documented",
    statusDetail: "2023 learning lab; not a production deployment recipe.",
    summary:
      "A documented three-container web stack built while learning Docker on Windows and WSL.",
    problem:
      "Understand service composition and persistence through a working web application.",
    role: "Personal learning project following a published setup guide, credited in the repository.",
    architecture: [
      "WordPress application",
      "MySQL database",
      "phpMyAdmin administration",
    ],
    implemented: [
      "Compose stack and step-by-step deployment notes with a real running-site capture in the source repository.",
    ],
    challenges: ["Connecting containerized application and database services."],
    safeguards: [
      "Historical example configuration is not copied into the portfolio.",
    ],
    results: ["Hands-on container deployment experience."],
    limitations: [
      "Source uses example credentials and end-of-life MySQL 5.7; it should not be reused as a production baseline.",
    ],
    planned: [],
    lessons: [
      "A working lab and a secure deployment baseline are different validation stages.",
    ],
    evidence: [
      {
        label: "Lab documentation and caveats",
        url: gh("Xirro9/DockerWPprojMahin"),
      },
    ],
    repositoryUrl: gh("Xirro9/DockerWPprojMahin"),
    related: ["network-security-lab"],
  },
  {
    slug: "bug-hunters-guild",
    title: "Bug Hunters Guild",
    home: "workshop",
    category: "creative",
    professionalSpotlight: true,
    tags: ["TypeScript", "Vite", "Phaser 3", "CodeMirror 6", "Pyodide"],
    status: "prototype",
    verification: "owner-reported",
    statusDetail:
      "Owner-reported first-quest prototype; source and runtime not independently inspected.",
    summary:
      "A programming adventure where players learn coding through quests in a fantasy guild.",
    problem:
      "Connect a code edit to a visible consequence in a small, understandable simulation.",
    role: "Personal creative project; feature scope below is owner-reported. Detailed implementation attribution remains to be documented.",
    architecture: [
      "Guildhall and quest interface",
      "CodeMirror editor",
      "Python worker execution",
      "Separated simulation and validation",
    ],
    implemented: [
      "Reported playable guildhall and first quest, “The Lantern That Forgot to Glow.”",
      "Reported Python worker execution, watchdog, loop protection, and editor-line highlighting.",
    ],
    challenges: [
      "Keeping code execution responsive and connecting validation to feedback.",
    ],
    safeguards: [
      "Worker/watchdog design is reported, not an independently audited security sandbox.",
    ],
    results: ["A first-quest learning prototype, as reported by the owner."],
    limitations: [
      "No verified public repository or demo supplied; the full quest set is not complete.",
    ],
    planned: [
      "Additional quests and further validation of execution safeguards.",
    ],
    lessons: [
      "Code execution, simulation, and learning feedback benefit from separate responsibilities.",
    ],
    evidence: [],
    related: ["agenthq"],
  },
  {
    slug: "pokemon-party-fighter",
    title: "Pokémon Party Fighter",
    home: "workshop",
    category: "creative",
    tags: ["TypeScript — reported", "Phaser 3 — reported", "Vite — reported"],
    status: "prototype",
    verification: "owner-reported",
    statusDetail:
      "Prototype described by the owner; current roster and mechanics remain unverified.",
    summary: "A noncommercial local platform-fighting fan-game experiment.",
    problem:
      "Explore character movement, combat feedback, and local multiplayer input.",
    role: "Personal game experiment. Individual implementation and asset attribution require a source review.",
    architecture: [
      "Local input",
      "Character movement and combat simulation",
      "Pixel-art animation presentation",
    ],
    implemented: [
      "A prototype is reported; individual combat mechanics and player counts are not independently verified.",
    ],
    challenges: [
      "Character-specific behavior, input handling, and combat validation.",
    ],
    safeguards: [
      "No game assets or downloadable build are distributed by this portfolio.",
    ],
    results: ["An ongoing creative experiment, not a released game."],
    limitations: [
      "Roster, ultimate abilities, controller coverage, and Babylon.js experiments are not verified for publication.",
    ],
    planned: [
      "Validate combat behavior, supported inputs, and asset rights before sharing a build.",
    ],
    lessons: [],
    evidence: [],
    related: ["bug-hunters-guild"],
    notice:
      "Noncommercial fan project. Not affiliated with Nintendo, Game Freak, or The Pokémon Company. Pokémon intellectual property belongs to its respective owners.",
  },
  {
    slug: "mtg-game-night",
    title: "MTG Game Night",
    home: "workshop",
    category: "creative",
    tags: ["JavaScript", "Node.js", "WebSocket", "XMage", "Mobile browsers"],
    status: "prototype",
    verification: "local-documentation",
    statusDetail:
      "Local PartyMage documentation inspected; application tests not rerun here.",
    summary:
      "A shared tabletop display with private phone hands and controllers, backed by an XMage rules engine.",
    problem:
      "Bring a rules-driven card game to a local game night without exposing private hands on the shared display.",
    role: "Personal software project, repository name PartyMage. Implementation and playtest scope are described in local project documentation.",
    architecture: [
      "Windows launcher and local host",
      "XMage engine through a WebSocket proxy",
      "Shared battlefield display",
      "Private phone controllers",
    ],
    implemented: [
      "Local documentation records two-player human duels and human-versus-XMage-AI play.",
      "QR-based seat connection, private hands, deck presets/import, and reconnection flows.",
      "Documentation records real-game library ordering validation and conservative priority-passing logic.",
    ],
    challenges: [
      "Preserving hidden information across shared and private interfaces.",
      "Handling reconnects and engine decision types honestly.",
    ],
    safeguards: [
      "No local connection addresses, QR codes, seat secrets, or card artwork are copied here.",
      "Host controls and player visibility boundaries are documented in the source project.",
    ],
    results: [
      "A local working prototype with documented playtests; results are source-reported, not reproduced in this update.",
    ],
    limitations: [
      "Two-player duels only in inspected docs; no Commander or 3–4 player mode.",
      "Some decision flows have unit evidence only. No public repository link was verified.",
    ],
    planned: [
      "Continue improving decision handling and browser/controller usability.",
    ],
    lessons: [
      "Private state must remain private throughout reconnect and rendering flows.",
    ],
    evidence: [],
    related: ["bug-hunters-guild"],
    notice:
      "Personal, noncommercial fan project. Not affiliated with Wizards of the Coast. Magic: The Gathering names, cards, and art belong to their respective owners; no copyrighted game assets are distributed here.",
  },
  {
    slug: "lifedash",
    title: "LifeDash",
    home: "workshop",
    category: "creative",
    professionalSpotlight: true,
    tags: ["Flutter", "Dart", "Hacklahoma"],
    status: "historical",
    verification: "repository-documented",
    statusDetail:
      "Hackathon project; feature completeness and personal contribution require confirmation.",
    summary:
      "A Hacklahoma productivity and life-management application with a Flutter frontend in the public repository.",
    problem:
      "Explore a unified interface for personal productivity and daily tracking.",
    role: "Hackathon participation reported in the original portfolio. Team and feature-level authorship are not established by the short public README.",
    architecture: [
      "Flutter frontend",
      "Repository-organized application components",
    ],
    implemented: [
      "Public 2026 project tree contains a Flutter application; its README documents running the web frontend.",
    ],
    challenges: ["Scoping a useful application within a hackathon."],
    safeguards: [
      "No personal records or application data copied into this portfolio.",
    ],
    results: ["A surviving public hackathon codebase."],
    limitations: [
      "Habits, goals, backend completeness, and real-time behavior were asserted in the old portfolio but are not independently established here.",
    ],
    planned: [],
    lessons: [],
    evidence: [
      {
        label: "Public project source",
        url: gh("Xirro9/Hacklahoma-LifeDashApp"),
      },
    ],
    repositoryUrl: gh("Xirro9/Hacklahoma-LifeDashApp"),
    related: ["bug-hunters-guild"],
  },
  {
    slug: "realitycheck",
    title: "RealityCheck AI / TrustLens",
    home: "workshop",
    category: "creative",
    tags: ["Information credibility", "Hackathon concept"],
    status: "concept",
    verification: "owner-reported",
    statusDetail:
      "May 2026 concept; surviving implementation and final naming remain unverified.",
    summary:
      "A hackathon concept for examining source quality, misinformation, bias, and manipulated media.",
    problem:
      "Explore how readers might assess the credibility of information in an AI-mediated environment.",
    role: "Owner-reported participation in a May 2026 hackathon and concept development.",
    architecture: [],
    implemented: [],
    challenges: ["Defining credible evidence and communicating uncertainty."],
    safeguards: ["No claim of reliable automated truth detection."],
    results: [
      "Concept development only is supported by the available owner account.",
    ],
    limitations: [
      "RealityCheck AI and TrustLens are treated as names for one investigation, not two completed products.",
      "No surviving prototype or public repository was verified.",
    ],
    planned: [
      "Recover source and confirm the project name before adding implementation claims.",
    ],
    lessons: [],
    evidence: [],
    related: ["lifedash"],
  },
];

export const projectPath = (project: Project) =>
  `/${project.home}/${project.slug}`;
export function filterProjects(
  items: Project[],
  query: string,
  category: string,
) {
  const search = query.trim().toLocaleLowerCase();
  return items.filter(
    (project) =>
      (category === "all" || project.category === category) &&
      `${project.title} ${project.summary} ${project.tags.join(" ")}`
        .toLocaleLowerCase()
        .includes(search),
  );
}

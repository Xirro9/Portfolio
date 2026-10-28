import type {
  Certification,
  Education,
  EngineeringNote,
  Experience,
  Milestone,
  Publication,
  SkillGroup,
} from "./types";

export const site = {
  name: "Mahin Moon",
  base: "/Portfolio",
  origin: "https://xirro9.github.io",
  asOf: "October 28, 2026",
  description:
    "Cybersecurity, software engineering, and local AI systems. Professional experience and evidence-led engineering case studies by Mahin Moon.",
  positioning:
    "I connect cybersecurity requirements to practical engineering, testable systems, and the evidence that supports them.",
  contacts: [
    {
      label: "Email",
      url: "mailto:mahinmoon99@gmail.com",
      detail: "mahinmoon99@gmail.com",
    },
    { label: "GitHub", url: "https://github.com/Xirro9", detail: "@Xirro9" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mahin-moon-6633672b0/",
      detail: "Mahin Moon on LinkedIn",
    },
  ],
};
export const navigation = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/experience", label: "Experience" },
  { path: "/labs", label: "Labs & notes" },
  { path: "/workshop", label: "The Workshop" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];
export const experiences: Experience[] = [
  {
    role: "Security Compliance Analyst",
    organization: "Oklahoma Cyber Innovation Institute",
    period: "October 2025 – present",
    start: "2025-10",
    summary:
      "Connect security requirements with technical evidence through control assessment, documentation review, and practical remediation recommendations.",
    details: [
      "Review security controls and supporting evidence against NIST SP 800-53, CMMC Level 2 requirements, and GreenUAS Corporate Cyber Hygiene.",
      "Analyze security documentation and system architecture across IT and OT environments.",
      "Communicate risk findings and remediation recommendations. Research security assessment and testing methods.",
    ],
  },
  {
    role: "Administrative Assistant",
    organization: "University of Tulsa Cyber Fellows",
    period: "August 2024 – May 2025",
    start: "2024-08",
    end: "2025-05",
    summary:
      "Supported the people and operations behind a cybersecurity education program.",
    details: [
      "Coordinated events, logistics, and program communications.",
      "Supported communication among students, faculty, and industry partners.",
    ],
  },
];
export const education: Education[] = [
  {
    title: "Graduate study · Cybersecurity",
    institution: "The University of Tulsa",
    period: "Fall 2026 – expected May 2028",
    status: "in progress",
    description:
      "Continuing graduate education alongside professional security work and applied engineering projects.",
    source: "owner-confirmed",
  },
  {
    title: "Bachelor’s degree · Cybersecurity",
    institution: "The University of Tulsa",
    period: "Completed May 2026",
    status: "completed",
    description:
      "Undergraduate foundation in systems, networking, scripting, and cybersecurity.",
    source: "owner-confirmed",
  },
];
export const milestones: Milestone[] = [
  {
    title: "AgentHQ telemetry and replay",
    date: "October 2026",
    category: "engineering",
    publication: "public",
    description:
      "Public documentation records live Hermes integration, workstation inspection, and replayable events. OpenCode remains experimental.",
    evidence: {
      label: "AgentHQ progress",
      url: "https://github.com/Xirro9/AgentHQ/blob/main/docs/PROGRESS.md",
    },
  },
  {
    title: "ControlGauge desktop foundation",
    date: "October 2026",
    category: "engineering",
    publication: "public",
    description:
      "Desktop shell, supervised local service, tests, and a documented Windows installer validation. Assessment and AI workflows remain planned.",
    evidence: {
      label: "ControlGauge status",
      url: "https://github.com/MoonPhase-LLC/ControlGauge",
    },
  },
  {
    title: "Began graduate study",
    date: "Fall 2026",
    category: "education",
    publication: "public",
    description:
      "Started graduate studies in cybersecurity at The University of Tulsa; expected completion May 2028.",
  },
  {
    title: "Completed undergraduate degree",
    date: "May 2026",
    category: "education",
    publication: "public",
    description:
      "Completed a bachelor’s degree in cybersecurity at The University of Tulsa.",
  },
];
export const skills: SkillGroup[] = [
  {
    title: "Security assessment",
    context: "Professional practice",
    description:
      "Translate framework requirements into evidence requests, technical review, and remediation guidance.",
    skills: [
      "NIST SP 800-53",
      "CMMC Level 2 requirements",
      "GreenUAS",
      "Evidence validation",
      "Architecture review",
      "Risk communication",
    ],
  },
  {
    title: "Infrastructure & visibility",
    context: "Hands-on labs and projects",
    description:
      "Build contained environments and make system behavior observable.",
    skills: [
      "Linux",
      "Docker",
      "Networking",
      "Virtualization",
      "Wazuh",
      "Proxmox / OPNsense / Suricata — lab experience",
    ],
  },
  {
    title: "Software systems",
    context: "Demonstrated project experience",
    description:
      "Work across interfaces, local services, data contracts, and validation. Project stacks describe implementation evidence, not proficiency ratings.",
    skills: [
      "TypeScript / React",
      "Python",
      "C",
      "FastAPI / Fastify",
      "SQLite / WebSocket",
      "Testing / CI",
      "Rust / Tauri — project exposure",
    ],
  },
  {
    title: "Applied AI infrastructure",
    context: "Active experimentation",
    description:
      "Explore local inference and specialized agent workflows with privacy and resource constraints.",
    skills: [
      "llama.cpp",
      "Hermes",
      "OpenCode — experimental integration",
      "Local model serving",
      "Agent orchestration",
      "Docker / Ubuntu",
      "vLLM / CUDA — experimentation",
    ],
  },
];
export const activities = [
  {
    title: "Hivestorm",
    description:
      "Team captain; collaborative cybersecurity competition experience.",
  },
  {
    title: "CyberPatriot",
    description:
      "Historical team captain experience in defensive cybersecurity.",
  },
  {
    title: "NCAE Cyber Games",
    description: "Competitor in team-based cybersecurity exercises.",
  },
  {
    title: "Route66 Cyber Clubs",
    description: "Infrastructure team involvement.",
  },
];
export const notes: EngineeringNote[] = [
  {
    title: "Configured context is not measured context",
    status: "Engineering note · October 2026",
    body: "A model server accepting a context configuration does not demonstrate reliable reasoning at that length. My local AI experiments separate configuration, successful requests, and measured workload behavior; benchmark claims require repeatable evidence.",
    projectSlug: "local-ai-workbench",
  },
  {
    title: "Smaller-model experiments",
    status: "Owner-reported experimentation · 2026",
    body: "Qwen-family inference and Hermes/OpenCode workflows on a personal RTX 4070 system provide a smaller environment for exploring model selection. No speed or quality comparisons are claimed.",
    projectSlug: "local-ai-workbench",
  },
];
// Publish credentials or papers only after evidence exists. Empty collections produce no empty pages.
export const certifications: Certification[] = [];
export const publications: Publication[] = [];

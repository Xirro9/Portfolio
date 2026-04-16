import { useEffect, useState } from "react";

export default function MahinPortfolio() {
  const experience = [
    {
      role: "Security Compliance Analyst",
      org: "Oklahoma Cyber Innovation Institute (OCII)",
      period: "Oct 2025 – Present",
      bullets: [
        "Conduct NIST SP 800-53 control assessments across 10+ client IT/OT environments in support of GreenUAS Corporate Cyber Hygiene, helping reduce control gaps through targeted remediation.",
        "Analyze security documentation and system configurations against NIST SP 800-53, CMMC Level 2, and DoD-aligned frameworks to improve compliance posture.",
        "Contribute as an apprentice penetration tester by helping develop internal testing methodologies and playbooks for embedded systems and UAV platforms.",
        "Review system architectures, including network diagrams and infrastructure layouts, and provide actionable security recommendations in a consulting capacity.",
        "Communicate risk findings and remediation roadmaps to stakeholders, enabling prioritization of high and critical issues."
      ]
    },
    {
      role: "Graduate Cybersecurity Student",
      org: "The University of Tulsa",
      period: "M.S. in Cyber Studies, Expected 2028",
      bullets: [
        "Advanced study in cybersecurity with emphasis on offensive security, governance, and emerging technologies.",
        "Coursework includes PenTest+ preparation, Security+ and CISA preparation, and cybersecurity ethics and AI-related security topics.",
        "Building depth in penetration testing methodologies, security assessment, and applied research."
      ]
    },
    {
      role: "Cybersecurity Student",
      org: "The University of Tulsa",
      period: "B.S. in Cybersecurity, Expected 2026",
      bullets: [
        "Hands-on experience across systems, networking, scripting, and security labs.",
        "Focused on bridging technical security work with governance, risk, and compliance so controls remain grounded in real systems and evidence.",
        "Coursework and labs in incident response, operating systems, and network security."
      ]
    },
    {
      role: "Administrative Assistant",
      org: "University of Tulsa Cyber Fellows",
      period: "Aug 2024 – May 2025",
      bullets: [
        "Supported program operations including event planning, coordination, and logistics for cybersecurity initiatives.",
        "Facilitated communication between students, faculty, and industry partners."
      ]
    }
  ];

  const projects = [
    {
      title: "Adversary Simulation and Detection Environment",
      subtitle: "Detection, segmentation, and adversarial validation in a hands-on environment",
      description:
        "Built and tested a practical security environment centered on blue team visibility and red team style validation across segmented infrastructure.",
      points: [
        "Worked across virtualized infrastructure and routed network segments",
        "Explored defensive tooling, service exposure, and validation through controlled testing",
        "Strengthened understanding of attacker-defender interaction and hardening"
      ],
      badge: "Featured"
    },
    {
      title: "Centralized Logging and SIEM Deployment (Wazuh)",
      subtitle: "Centralized log aggregation, monitoring, and alerting",
      description:
        "Designed and deployed a centralized SIEM solution using Wazuh to aggregate, analyze, and monitor security events across multiple systems. Focused on building visibility into system activity, authentication events, and potential threat indicators through structured logging and alerting.",
      points: [
        "Configured Wazuh SIEM to collect and analyze logs from multiple endpoints and services",
        "Implemented centralized logging for authentication events, system changes, and security-relevant activity",
        "Explored alerting logic and detection workflows based on real-world security scenarios",
        "Gained hands-on experience with log aggregation, event correlation, and security monitoring pipelines"
      ],
      badge: "SIEM"
    },
    {
      title: "Segmented Network and Secure Service Deployment Lab",
      subtitle: "Web, file, routing, and access control validation in a contained environment",
      description:
        "Built and configured a multi-system lab involving internal services, network routing, access control, and exposure testing.",
      points: [
        "Configured services, routing, and connectivity across multiple systems",
        "Tested accessibility, behavior, and security posture from internal and external perspectives",
        "Documented troubleshooting and deployment steps in a workflow-oriented format"
      ],
      badge: "Infrastructure"
    },
    {
      title: "LifeDash Application (Hacklahoma)",
      subtitle: "Full-stack productivity and life tracking application",
      description:
        "Developed a full-stack application designed to help users track habits, goals, and daily metrics in a unified dashboard.",
      points: [
        "Built backend and frontend components",
        "Focused on usability and real-time feedback",
        "Presented in a competitive hackathon"
      ],
      badge: "Hackathon"
    },
    {
      title: "Custom Memory Allocator",
      subtitle: "Low-level systems programming",
      description:
        "Implemented a custom memory allocator in C focusing on efficient allocation and system-level behavior.",
      points: [
        "Implemented malloc/free style logic",
        "Explored fragmentation and optimization",
        "Strengthened low-level systems understanding"
      ],
      href: "https://github.com/Xirro9/MemoryAllocator",
      badge: "Systems"
    },
    {
      title: "CLI Text Editor",
      subtitle: "Terminal-based editor",
      description:
        "Built a command-line text editor with file operations and real-time input handling.",
      points: [
        "Handled keyboard input and navigation",
        "Implemented editing and file management",
        "Focused on CLI usability"
      ],
      href: "https://github.com/Xirro9/textEditor",
      badge: "CLI"
    },
    {
      title: "Incident Response Scripting Suite",
      subtitle: "Automation and detection scripting",
      description:
        "Developed Python scripts for asset inventory, suspicious login monitoring, and incident response support workflows.",
      points: [
        "Created automation scripts for security workflows",
        "Built detection logic for suspicious login activity",
        "Documented methodology and results in formal reporting"
      ],
      href: "https://github.com/Xirro9/CYB-4863-Scripting-Project",
      badge: "Automation"
    },
    {
      title: "Docker Web Application Deployment (WordPress)",
      subtitle: "Containerized web deployment",
      description:
        "Containerized and deployed a functional WordPress web application using Docker as part of a practical infrastructure project.",
      points: [
        "Built and managed a containerized deployment",
        "Worked with service setup and application exposure",
        "Strengthened practical understanding of Dockerized environments"
      ],
      href: "https://github.com/Xirro9/DockerWPprojMahin",
      badge: "Containers"
    },
  ];

  const skills = [
    "NIST SP 800-53",
    "GreenUAS Corporate Cyber Hygiene",
    "CMMC Level 2",
    "Penetration Testing",
    "Security Control Assessment",
    "Compliance Mapping",
    "Policy and Artifact Review",
    "Burp Suite",
    "Nmap",
    "Metasploit",
    "Wireshark",
    "Threat Hunting",
    "Vulnerability Assessment",
    "Incident Response",
    "SIEM",
    "Phishing Simulations",
    "Social Engineering",
    "Firmware Analysis",
    "Python",
    "Java",
    "C/C++",
    "JavaScript",
    "HTML",
    "Bash",
    "Docker",
    "Linux (Arch, Ubuntu)",
    "PyTorch",
    "TeamDynamix",
    "Visual Studio"
  ];

  const activities = [
    "Route66 Cyber Clubs – Infrastructure Team",
    "Hivestorm – Team Captain",
    "NCAE Cyber Games – Competitor",
    "CyberPatriot – Team Captain"
  ];

  const stats = [
    { label: "Client Environments", value: "10+" },
    { label: "Framework Focus", value: "NIST / CMMC / GreenUAS" },
    { label: "Style", value: "Compliance + Technical" },
    { label: "Build Mindset", value: "Hands-on and Curious" }
  ];

  const currentFocus = [
    "GreenUAS Corporate Cyber Hygiene assessments",
    "Evidence mapping and control validation",
    "SIEM visibility and logging workflows",
    "Adversary simulation and segmented lab environments"
  ];

  const whatIDo = [
    {
      title: "Translate requirements into real security work",
      text: "I take framework and policy requirements and connect them to systems, evidence, and actual implementation details."
    },
    {
      title: "Review environments, not just documents",
      text: "I look at how systems are laid out, how controls are applied, and where technical reality does or does not match the written policy."
    },
    {
      title: "Build hands-on technical depth alongside compliance",
      text: "I keep working in labs, scripting, infrastructure, and detection environments so my security perspective stays grounded."
    }
  ];

  const terminalLines = [
    "initializing assessment context...",
    "loading segmented environment map...",
    "aggregating logs from monitored systems...",
    "validating controls against implementation...",
    "checking exposure paths and service behavior...",
    "status: active, curious, and building"
  ];

  const featuredProject = projects[0];
  const [visibleTerminalLines, setVisibleTerminalLines] = useState([""]);
  const [activeTerminalLine, setActiveTerminalLine] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = terminalLines[activeTerminalLine];
    if (!currentLine) return;

    if (activeCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setVisibleTerminalLines((prev) => {
          const next = [...prev];
          next[activeTerminalLine] = currentLine.slice(0, activeCharIndex + 1);
          return next;
        });
        setActiveCharIndex((prev) => prev + 1);
      }, 28);

      return () => clearTimeout(timeout);
    }

    if (activeTerminalLine < terminalLines.length - 1) {
      const timeout = setTimeout(() => {
        setVisibleTerminalLines((prev) => [...prev, ""]);
        setActiveTerminalLine((prev) => prev + 1);
        setActiveCharIndex(0);
      }, 450);

      return () => clearTimeout(timeout);
    }

    const resetTimeout = setTimeout(() => {
      setVisibleTerminalLines([""]);
      setActiveTerminalLine(0);
      setActiveCharIndex(0);
    }, 2200);

    return () => clearTimeout(resetTimeout);
  }, [activeCharIndex, activeTerminalLine]);

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-zinc-100 selection:bg-fuchsia-400/20 selection:text-fuchsia-100 scroll-smooth">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_20%),radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.08),transparent_30%),linear-gradient(to_bottom,#020617,#050816_38%,#020617)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:38px_38px] opacity-40 [mask-image:radial-gradient(circle_at_top,black,transparent_78%)]" />
        <div className="absolute left-[8%] top-[10%] h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[10%] top-[14%] h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute left-[30%] top-[42%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[22%] bottom-[12%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050816]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-300 transition hover:text-fuchsia-200">
            Mahin Moon
          </a>
          <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            {[
              { label: "Featured", href: "#featured" },
              { label: "Projects", href: "#projects" },
              { label: "Experience", href: "#experience" },
              { label: "What I Do", href: "#what-i-do" },
              { label: "Skills", href: "#skills" }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-fuchsia-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section id="top" className="scroll-reveal mx-auto max-w-6xl px-6 pb-14 pt-20 md:px-10 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.10)] transition duration-300 hover:border-violet-300/30 hover:bg-violet-400/10">
              <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
              Cybersecurity • Compliance • Assessment • Offensive Curiosity
            </div>

            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Mahin Moon</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              Cybersecurity,
              <span className="block bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-transparent">
                compliance, and technical depth.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-xl">
              I am a cybersecurity student at The University of Tulsa and a Security Compliance Analyst with the Oklahoma Cyber Innovation Institute. I work at the intersection of compliance, architecture review, practical security validation, and hands-on technical environments, with a focus on turning requirements into security that actually holds up.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <a href="mailto:mahinmoon99@gmail.com" className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 underline-offset-4 transition hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:text-fuchsia-200 hover:underline hover:shadow-[0_0_20px_rgba(217,70,239,0.08)]">
                mahinmoon99@gmail.com
              </a>
              <span className="text-zinc-600">•</span>
              <span>Based in Tulsa</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
              {[
                { label: "GitHub", href: "https://github.com/Xirro9?tab=repositories" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/mahin-moon-6633672b0/" }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-800 bg-zinc-900/80 px-5 py-2.5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/10 hover:text-fuchsia-100 hover:shadow-[0_0_25px_rgba(217,70,239,0.12)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
              {[
                "OCII",
                "GreenUAS",
                "NIST SP 800-53",
                "CMMC",
                "Cybersecurity @ UTulsa"
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/10 hover:text-fuchsia-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_50px_rgba(168,85,247,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/20">
            <div className="mb-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-transparent" />
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Snapshot</p>
              <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">Active</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-zinc-950/50 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/20 hover:bg-fuchsia-400/5">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
                  <p className="mt-3 text-lg font-medium text-zinc-100">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-400/10 via-transparent to-fuchsia-400/10 p-4">
              <p className="text-sm text-zinc-300 leading-7">
                Focused on governance and evidence-driven security while still building labs, validating systems, and staying close to the technical side of the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Primary Focus",
              value: (
                <ul className="space-y-2">
                  <li>• Security Compliance and Control Assessment</li>
                  <li>• Penetration Testing</li>
                  <li>• Architecture Review</li>
                </ul>
              )
            },
            {
              label: "Current Work",
              value:
                "GreenUAS, evidence mapping, framework-driven security review, penetration testing research, and embedded or UAV-adjacent security work"
            },
            {
              label: "Approach",
              value: "Translate requirements into practical, defensible security outcomes grounded in how systems actually behave"
            }
          ].map((item, index) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-400/5 hover:shadow-[0_0_30px_rgba(168,85,247,0.10)]"
              style={{ animation: `fadeIn 0.8s ease-out ${0.1 * index}s both` }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200/80">{item.label}</p>
              <div className="mt-3 text-lg leading-7 text-zinc-200">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="featured" className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Featured Project</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Start here</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            This project best represents the mix of technical curiosity, defensive visibility, and validation mindset that I bring to cybersecurity work.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <a
            href={featuredProject.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_0_50px_rgba(168,85,247,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:shadow-[0_0_55px_rgba(217,70,239,0.14)]"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-200">
                {featuredProject.badge}
              </span>
              <span className="text-sm text-zinc-500 transition group-hover:text-fuchsia-200">View Repository →</span>
            </div>

            <h3 className="text-3xl font-semibold text-white md:text-4xl">{featuredProject.title}</h3>
            <p className="mt-3 text-fuchsia-300">{featuredProject.subtitle}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
              {featuredProject.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Segmented infrastructure",
                "Blue team visibility",
                "Adversarial validation"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-zinc-950/50 p-4 text-sm text-zinc-300 transition duration-300 group-hover:border-fuchsia-400/20">
                  {item}
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3 text-zinc-300">
              {featuredProject.points.map((point) => (
                <li key={point} className="flex gap-3 leading-7">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.6)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </a>

          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_0_50px_rgba(59,130,246,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs uppercase tracking-[0.25em] text-zinc-500">Terminal</span>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#030712] p-5 font-mono text-sm leading-7 text-zinc-300 shadow-inner shadow-fuchsia-500/5 min-h-[260px]">
              {visibleTerminalLines.map((line, index) => {
                const isCurrentLine = index === activeTerminalLine;
                return (
                  <div key={`${index}-${line}`} className="flex items-start gap-2">
                    <span className="text-fuchsia-300">&gt;</span>
                    <span className="whitespace-pre-wrap">{line}</span>
                    {isCurrentLine && activeCharIndex <= terminalLines[activeTerminalLine]?.length ? (
                      <span className="mt-1 inline-block h-5 w-2 animate-pulse rounded-sm bg-fuchsia-300/80" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-400/10 via-transparent to-fuchsia-400/10 p-4 text-sm leading-7 text-zinc-300">
              Security should be testable, not just documented.
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
      </div>

      <section id="projects" className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Selected work and technical environments</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            A mix of infrastructure, SIEM visibility, scripting, systems programming, and lab-driven validation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Wrapper = project.href ? "a" : "div";

            return (
              <Wrapper
                key={project.title}
                {...(project.href
                  ? {
                      href: project.href,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }
                  : {})}
                className="group block"
                style={{ animation: `fadeIn 0.7s ease-out ${0.08 * index}s both` }}
              >
                <article className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-fuchsia-400/40 hover:bg-zinc-900/90 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/0 via-transparent to-violet-400/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:from-fuchsia-400/5 group-hover:to-violet-400/5" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Project</p>
                      <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-200">
                        {project.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-medium text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-fuchsia-300">{project.subtitle}</p>
                    <p className="mt-5 leading-7 text-zinc-300">{project.description}</p>

                    <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-400">
                      {project.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.6)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between text-sm font-medium">
                      <span className="text-fuchsia-300 opacity-70 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        {project.href ? "View Project →" : "Project Summary"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition duration-300 group-hover:border-fuchsia-400/20 group-hover:text-fuchsia-200">
                        {project.href ? "Live" : "Info"}
                      </span>
                    </div>
                  </div>
                </article>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
      </div>

      <section id="experience" className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Experience</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Work grounded in real security environments</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            Technical credibility matters more when the writing is backed by actual environments, stakeholder work, and framework-driven assessments.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={item.role}
              className="group rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-8 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-400/5 hover:shadow-[0_0_35px_rgba(168,85,247,0.10)]"
              style={{ animation: `fadeIn 0.8s ease-out ${0.1 * index}s both` }}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-medium text-white">{item.role}</h3>
                  <p className="mt-1 text-fuchsia-300">{item.org}</p>
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{item.period}</p>
              </div>

              <ul className="mt-6 space-y-3 text-zinc-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.5)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/20">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Current Focus</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Working on right now</h2>
            <ul className="mt-6 space-y-4 text-zinc-300">
              {currentFocus.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(244,114,182,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="what-i-do" className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_40px_rgba(59,130,246,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">What I Actually Do</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Simple, practical security work</h2>
            <div className="mt-6 grid gap-4">
              {whatIDo.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/8 bg-zinc-950/50 p-5 transition duration-300 hover:border-fuchsia-400/20 hover:bg-fuchsia-400/5">
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-fuchsia-400/25 to-transparent" />
      </div>

      <section id="skills" className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Skills</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Frameworks, tooling, and strengths</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            Security work that bridges policy, evidence, offensive testing interest, and operational awareness.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-zinc-200 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/10 hover:text-fuchsia-100 hover:shadow-[0_0_20px_rgba(217,70,239,0.08)]"
              style={{ animation: `fadeIn 0.55s ease-out ${0.02 * index}s both` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Leadership & Activities</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Competitive experience and team leadership</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-8 transition duration-300 hover:border-violet-400/30 hover:bg-violet-400/5 hover:shadow-[0_0_30px_rgba(168,85,247,0.10)]">
          <div className="space-y-6 text-zinc-300 leading-7">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-fuchsia-200/80">Activities</p>
              <p>{activities.join(" | ")}</p>
            </div>

            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-fuchsia-200/80">Overview</p>
              <p>
                Active participation in competitive and collaborative cybersecurity environments, focusing on infrastructure defense,
                real-time incident response scenarios, and team-based problem solving under pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-violet-400/10 via-white/[0.03] to-fuchsia-400/10 p-8 md:p-12 shadow-[0_0_40px_rgba(168,85,247,0.08)] backdrop-blur-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Professional Summary</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Security work that connects policy, evidence, and technical reality</h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-300 md:text-lg">
            My background combines hands-on cybersecurity education with real assessment experience in environments where security requirements must be explained, validated, and defended. I am especially interested in the space where governance, risk, compliance, and practical security operations overlap. Whether I am reviewing policies, mapping controls, building labs, or validating infrastructure, I focus on one core idea: security should be understandable, testable, and grounded in how systems actually work.
          </p>
        </div>
      </section>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-reveal {
          opacity: 0.22;
          transform: translateY(38px) scale(0.985);
          filter: blur(4px);
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
          will-change: opacity, transform, filter;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
      `}</style>
    </main>
  );
}

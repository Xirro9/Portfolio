import { useId, useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import { href } from "../../routes";
import { Monogram } from "../visual/Monogram";
import { useSceneSupport } from "../visual/sceneSupport";

/**
 * Signal lines leave the monogram's contact pads and run off the page edges.
 * The mark is nested inside the field so the traces meet it exactly.
 * Purely decorative; every fact lives in the copy column.
 */
const MARK = { x: 380, y: 120, size: 230 };
const unit = MARK.size / 64;
const pad = (x: number) => MARK.x + x * unit;
const PAD_Y = MARK.y + 55 * unit;
const TOP_Y = MARK.y + 14 * unit;
const signals = [
  { d: `M${pad(10)} ${PAD_Y} C${pad(10)} 520 260 560 120 640 S-20 820 -40 900`, depth: 0.5, pulse: true },
  { d: `M${pad(19)} ${PAD_Y} C${pad(19)} 470 400 600 300 700 S210 860 200 920`, depth: 0.7 },
  { d: `M${pad(45)} ${PAD_Y} C${pad(45)} 520 600 620 640 720 S700 860 720 920`, depth: 0.7, pulse: true },
  { d: `M${pad(54)} ${PAD_Y} C${pad(54)} 420 700 470 780 480`, depth: 0.5 },
  { d: `M${pad(10)} ${TOP_Y} C${pad(10)} 90 330 40 250 -30`, depth: 0.35 },
  { d: `M${pad(54)} ${TOP_Y} C${pad(54)} 60 650 30 760 10`, depth: 0.35, pulse: true },
  { d: `M-60 360 C150 350 250 250 ${pad(10) - 18} 236`, depth: 0.25, faint: true },
];
const nodes = [
  [120, 640],
  [300, 700],
  [640, 720],
  [pad(10) - 18, 236],
];

export function ProfessionalHero() {
  const field = useRef<SVGSVGElement>(null);
  const motion = useSceneSupport("motion");
  const id = useId().replace(/[^\w-]/g, "");
  const drift = (event: PointerEvent) => {
    if (!motion || !field.current) return;
    const box = field.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    field.current.querySelectorAll<SVGGElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      gsap.to(layer, { x: x * depth * 18, y: y * depth * 12, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    });
  };
  return (
    <header className="pro-hero" data-hero="observatory" onPointerMove={drift}>
      <div className="pro-hero-visual" aria-hidden="true" data-motion-slot="signal-field">
        <svg
          ref={field}
          className="signal-field"
          viewBox="0 0 720 900"
          preserveAspectRatio="xMaxYMin meet"
          focusable="false"
        >
          <defs>
            <pattern id={`dots-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" />
            </pattern>
            <radialGradient id={`fade-${id}`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`mask-${id}`}>
              <circle cx={MARK.x + MARK.size / 2} cy={MARK.y + MARK.size / 2} r="330" fill={`url(#fade-${id})`} />
            </mask>
          </defs>
          <rect className="sf-dots" width="720" height="900" fill={`url(#dots-${id})`} mask={`url(#mask-${id})`} />
          {signals.map((signal, index) => (
            <g key={signal.d} data-depth={signal.depth}>
              <path
                className={`sf-line${signal.faint ? " sf-faint" : ""}`}
                pathLength={1}
                d={signal.d}
                style={{ animationDelay: `${1.4 + index * 0.12}s` }}
              />
              {signal.pulse && (
                <path
                  className="sf-pulse"
                  pathLength={1}
                  d={signal.d}
                  style={{ animationDelay: `${3.2 + index * 1.7}s` }}
                />
              )}
            </g>
          ))}
          {nodes.map(([x, y], index) => (
            <circle
              key={`${x}${y}`}
              className="sf-node"
              cx={x}
              cy={y}
              r="3.2"
              style={{ animationDelay: `${2 + index * 0.15}s` }}
            />
          ))}
          <svg x={MARK.x} y={MARK.y} width={MARK.size} height={MARK.size} viewBox="0 0 64 64" overflow="visible">
            <Monogram animated className="hero-monogram" />
          </svg>
        </svg>
      </div>
      <div className="pro-hero-copy" data-motion-slot="hero-foreground">
        <p className="eyebrow hero-kicker">
          Cybersecurity &amp; software engineering
          <span aria-hidden="true"> · </span>
          <span className="hero-handle">Xirro9</span>
        </p>
        <h1 data-motion-slot="hero-heading">
          <span className="hero-name">Mahin Moon</span>{" "}
          <span className="line-mask">
            <span data-motion-part="heading-line">Cybersecurity grounded</span>
          </span>{" "}
          <span className="line-mask">
            <span data-motion-part="heading-line">in practical engineering.</span>
          </span>
        </h1>
        <p className="hero-description">
          I’m a Security Compliance Analyst at the Oklahoma Cyber Innovation
          Institute and a graduate student in cybersecurity at The University of
          Tulsa. My work spans security assessment and software systems, with
          ongoing experiments in local AI infrastructure.
        </p>
        <dl className="hero-credentials">
          <div>
            <dt>Role</dt>
            <dd>Security Compliance Analyst, Oklahoma Cyber Innovation Institute</dd>
          </div>
          <div>
            <dt>Study</dt>
            <dd>Cybersecurity graduate; graduate study at The University of Tulsa</dd>
          </div>
          <div>
            <dt>Builds</dt>
            <dd>Local-first security software and agent observability</dd>
          </div>
        </dl>
        <div className="actions">
          <a className="button-link button-primary" href={href("/work")}>
            Explore professional work
          </a>
          <a className="button-link button-quiet" href={href("/experience")}>
            Experience & education
          </a>
          <a className="hero-anchor" href="#education">
            Education highlights <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}

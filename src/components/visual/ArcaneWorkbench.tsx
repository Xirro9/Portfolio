import { useId, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView, useSceneSupport } from "./sceneSupport";
import { crescentPath } from "./Insignia";
import { runes } from "./runes";

gsap.registerPlugin(useGSAP);

const CX = 320;
const CY = 262;
const polar = (radius: number, degrees: number) => {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
};
const band = Array.from({ length: 24 }, (_, index) => index);
const circuits = [
  "M112 452 V392 H150 V318 H196 L236 278",
  "M528 452 V400 H488 V330 H444 L404 290",
  "M112 452 V420 H70 V210 H128 L176 170",
  "M528 452 V430 H580 V200 H508 L470 162",
  "M320 476 V520 H226 V560",
  "M320 476 V520 H414 V560",
];
const nodes = [
  [236, 278],
  [404, 290],
  [176, 170],
  [470, 162],
  [150, 318],
  [488, 330],
  [70, 210],
  [580, 200],
];
const facets = [
  { points: "0,-96 -48,-8 6,4", shade: 0.95 },
  { points: "0,-96 6,4 48,-10", shade: 0.6 },
  { points: "-48,-8 6,4 0,88", shade: 0.5 },
  { points: "6,4 48,-10 0,88", shade: 0.3 },
];

export function ArcaneWorkbench() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const motion = useSceneSupport("motion");
  const visible = useInView(root);
  const [charge, setCharge] = useState(0);
  const [message, setMessage] = useState("");
  const loops = useRef<gsap.core.Animation[]>([]);
  const id = useId().replace(/[^\w-]/g, "");
  const crystal = `crystal-${id}`;
  const halo = `halo-${id}`;
  const copper = `copper-${id}`;

  useGSAP(
    () => {
      if (!motion || !svg.current) return;
      const q = gsap.utils.selector(svg.current);
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(q(".wb-circuit"), { strokeDashoffset: 1, duration: 1.4, stagger: 0.08 })
        .from(q(".wb-node"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.05 }, "-=0.9")
        .from(q(".wb-crystal"), { scale: 0.4, rotation: -12, svgOrigin: `${CX} ${CY}`, duration: 1.1, ease: "back.out(1.6)" }, "-=0.6")
        .from(q(".wb-halo"), { opacity: 0, scale: 0.5, svgOrigin: `${CX} ${CY}`, duration: 1.2 }, "<")
        .from(q(".wb-band-rune"), {
          scale: 0,
          rotation: () => gsap.utils.random(-180, 180),
          transformOrigin: "50% 50%",
          duration: 0.8,
          stagger: { each: 0.03, from: "random" },
        }, "-=0.8")
        .from(q(".wb-sigil-line"), { strokeDashoffset: 1, duration: 1.2 }, "<");
      loops.current = [
        gsap.to(q(".wb-ring-outer"), { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 140, repeat: -1, ease: "none" }),
        gsap.to(q(".wb-ring-inner"), { rotation: -360, svgOrigin: `${CX} ${CY}`, duration: 90, repeat: -1, ease: "none" }),
        gsap.to(q(".wb-crystal-float"), { y: -9, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(q(".wb-orbit"), { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 26, repeat: -1, ease: "none" }),
        ...q(".wb-pulse").map((pulse: Element, index: number) =>
          gsap.fromTo(
            pulse,
            { strokeDashoffset: 0.12 },
            { strokeDashoffset: -1, duration: 2.4, repeat: -1, repeatDelay: 2 + index * 0.7, delay: 1.6 + index * 0.4, ease: "power1.inOut" },
          ),
        ),
        gsap.to(q(".wb-arc"), { opacity: 0.35, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.45 }),
      ];
    },
    { scope: root, dependencies: [motion] },
  );
  useGSAP(
    () => {
      loops.current.forEach((loop) => loop.paused(!visible));
    },
    { dependencies: [visible] },
  );

  const parallax = (event: PointerEvent) => {
    if (!motion || !root.current) return;
    const box = root.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    root.current.querySelectorAll<SVGGElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      gsap.to(layer, { x: x * depth * 26, y: y * depth * 20, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    });
    gsap.to(root.current.querySelector(".wb-cursor"), {
      attr: { transform: `translate(${(x + 0.5) * 640} ${(y + 0.5) * 600})` },
      opacity: 1,
      duration: 0.4,
      overwrite: "auto",
    });
  };
  const channel = () => {
    const next = charge + 1;
    setCharge(next % 3);
    if (motion && svg.current) {
      const q = gsap.utils.selector(svg.current);
      gsap.fromTo(q(".wb-halo"), { scale: 1 + next * 0.08 }, { scale: 1, svgOrigin: `${CX} ${CY}`, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      if (next === 3) {
        gsap.fromTo(q(".wb-burst"), { scale: 0.2, opacity: 0.9 }, { scale: 2.4, opacity: 0, svgOrigin: `${CX} ${CY}`, duration: 1.4, ease: "power2.out" });
        gsap.to(q(".wb-band"), { rotation: "+=360", svgOrigin: `${CX} ${CY}`, duration: 1.6, ease: "power3.inOut" });
      }
    }
    setMessage(
      next === 3
        ? "Spell compiled: the core says hello, world."
        : `Core charge ${next} of 3.`,
    );
  };

  return (
    <div
      ref={root}
      className="workbench-stage"
      data-charge={charge}
      onPointerMove={parallax}
      onPointerLeave={() => {
        if (root.current)
          gsap.to(root.current.querySelector(".wb-cursor"), { opacity: 0, duration: 0.4 });
      }}
    >
      <div
        className="hero-scene-mount"
        data-motion-slot="workshop-illustration"
        aria-hidden="true"
      >
        <svg ref={svg} className="workbench-art" viewBox="0 0 640 600" focusable="false">
          <defs>
            <linearGradient id={crystal} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3fdff" />
              <stop offset="0.35" stopColor="#5be7f0" />
              <stop offset="0.75" stopColor="#7b5cff" />
              <stop offset="1" stopColor="#2a1670" />
            </linearGradient>
            <radialGradient id={halo}>
              <stop offset="0" stopColor="#7ff6ff" stopOpacity="0.85" />
              <stop offset="0.3" stopColor="#a57bff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#a57bff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={copper} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f5c68b" />
              <stop offset="0.5" stopColor="#c8783d" />
              <stop offset="1" stopColor="#5c2f1c" />
            </linearGradient>
          </defs>

          <g data-depth="0.25">
            <g className="wb-ring-outer">
              <circle className="wb-ring wb-dashed" cx={CX} cy={CY} r="270" />
              <circle className="wb-ring" cx={CX} cy={CY} r="252" />
              <g className="wb-band">
                {band.map((index) => {
                  const [x, y] = polar(232, index * 15);
                  return (
                    <path
                      key={index}
                      className="wb-band-rune"
                      d={runes[index % runes.length]}
                      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${index * 15})`}
                    />
                  );
                })}
              </g>
              <circle className="wb-ring" cx={CX} cy={CY} r="212" />
            </g>
            <g className="wb-ring-inner">
              <path
                className="wb-sigil-line"
                pathLength={1}
                transform={`translate(${CX - 190} ${CY - 190}) scale(3.8)`}
                d="M50 20 L71.2 71.2 L20 50 L71.2 28.8 L50 80 L28.8 28.8 L80 50 L28.8 71.2 Z"
              />
              <circle className="wb-ring wb-dotted" cx={CX} cy={CY} r="150" />
            </g>
          </g>

          <g data-depth="0.45">
            {circuits.map((d) => (
              <g key={d}>
                <path className="wb-circuit" pathLength={1} d={d} />
                <path className="wb-pulse" pathLength={1} d={d} />
              </g>
            ))}
            {nodes.map(([x, y], index) => (
              <g key={`${x}-${y}`} className="wb-node" transform={`translate(${x} ${y})`}>
                <circle r="11" />
                <path d={runes[(index * 3) % runes.length]} transform="scale(0.8)" />
              </g>
            ))}
          </g>

          <g data-depth="0.7" className="wb-panels">
            <g transform="translate(26 92) skewY(-8)">
              <rect className="wb-panel" width="150" height="128" rx="3" />
              <path className="wb-panel-rule" d="M12 22 H138" />
              {[38, 52, 66, 80, 94, 108].map((y, index) => (
                <path
                  key={y}
                  className="wb-script"
                  d={`M14 ${y} h${[96, 70, 110, 54, 88, 62][index]}`}
                />
              ))}
              <path className="wb-panel-glyph" d={runes[3]} transform="translate(124 98) scale(1.3)" />
            </g>
            <g transform="translate(470 104) skewY(8)">
              <rect className="wb-panel" width="146" height="132" rx="3" />
              <path className="wb-panel-rule" d="M12 22 H134" />
              <path className="wb-graph" d="M30 104 L58 62 L92 82 L118 42 M58 62 L76 38" />
              {[
                [30, 104],
                [58, 62],
                [92, 82],
                [118, 42],
                [76, 38],
              ].map(([x, y]) => (
                <circle key={x} className="wb-graph-node" cx={x} cy={y} r="4.5" />
              ))}
            </g>
          </g>

          <g data-depth="0.35">
            <path className="wb-cable" d="M112 452 C112 500 200 520 236 500" />
            <path className="wb-cable" d="M528 452 C528 500 440 520 404 500" />
            {[112, 528].map((x) => (
              <g key={x} transform={`translate(${x} 0)`}>
                <rect className="wb-pylon" x="-12" y="340" width="24" height="120" fill={`url(#${copper})`} />
                {[352, 372, 392, 412].map((y) => (
                  <ellipse key={y} className="wb-coil" cx="0" cy={y} rx="24" ry="6" />
                ))}
                <circle className="wb-pylon-cap" cx="0" cy="334" r="10" />
              </g>
            ))}
            <path className="wb-console" d="M184 528 L456 528 L428 470 L212 470 Z" fill={`url(#${copper})`} />
            <ellipse className="wb-plate" cx="320" cy="470" rx="128" ry="16" />
            <ellipse className="wb-emitter" cx="320" cy="458" rx="40" ry="8" />
            {[236, 268, 372, 404].map((x) => (
              <circle key={x} className="wb-knob" cx={x} cy="502" r="6" />
            ))}
            <path className="wb-vent" d="M292 496 H348 M292 506 H348 M292 516 H348" />
          </g>

          <g className="wb-arcs" data-depth="0.6">
            <polyline className="wb-arc" points="320,350 312,374 326,392 314,414 322,452" />
            <polyline className="wb-arc" points="272,280 230,296 214,286 170,312 122,326" />
            <polyline className="wb-arc" points="368,280 410,300 428,288 470,312 518,326" />
          </g>

          <g data-depth="0.9">
            <g className="wb-crystal-float">
              <circle className="wb-halo" cx={CX} cy={CY} r="150" fill={`url(#${halo})`} />
              <circle className="wb-burst" cx={CX} cy={CY} r="90" />
              <g className="wb-orbit">
                <ellipse className="wb-orbit-path" cx={CX} cy={CY} rx="112" ry="30" transform={`rotate(-16 ${CX} ${CY})`} />
                <path className="wb-shard" d={`M${CX + 108} ${CY - 34} l6 -10 l6 10 l-6 10 Z`} />
                <path className="wb-shard" d={`M${CX - 116} ${CY + 24} l5 -8 l5 8 l-5 8 Z`} />
              </g>
              <g className="wb-crystal" transform={`translate(${CX} ${CY})`}>
                {facets.map((facet) => (
                  <polygon
                    key={facet.points}
                    className="wb-facet"
                    points={facet.points}
                    fill={`url(#${crystal})`}
                    fillOpacity={facet.shade}
                  />
                ))}
                <path className="wb-etch" d="M0 -70 V-30 H-18 V-6 M6 4 V40 H22 V62 M-30 -14 H-8" />
                <path
                  className="wb-crystal-core"
                  d={crescentPath}
                  transform="translate(-14 -20) scale(0.6)"
                />
              </g>
            </g>
          </g>

          <g data-depth="1.1">
            {[
              [96, 60, 2],
              [560, 58, 6],
              [602, 410, 0],
              [36, 330, 4],
            ].map(([x, y, rune]) => (
              <g key={x} className="wb-sigil" transform={`translate(${x} ${y})`}>
                <circle r="16" />
                <circle r="11" className="wb-dotted" />
                <path d={runes[rune]} />
              </g>
            ))}
          </g>
          <g className="wb-cursor" opacity="0" transform="translate(320 300)">
            <circle r="18" />
            <path d={runes[7]} />
          </g>
        </svg>
      </div>
      <button
        type="button"
        className="core-rune"
        onClick={channel}
        aria-describedby={`${id}-charge`}
      >
        <span className="visually-hidden">Channel the arcane core</span>
      </button>
      <p id={`${id}-charge`} className="core-message" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

import { useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView, useSceneSupport } from "./sceneSupport";
import { runes } from "./runes";

gsap.registerPlugin(useGSAP);

/**
 * The Workshop's arcane reactor: an original layered SVG machine. The markup
 * is the fully assembled, stable state, so it reads correctly without
 * JavaScript and under reduced motion; GSAP only plays the awakening and the
 * idle loops on top of it. `children` (the Celestial Engine canvas) sit in
 * the housing; while it runs live, the inner SVG layers (`te-inner`) recede.
 */
const C = 400;
const ORIGIN = `${C} ${C}`;
const f = (value: number) => Number(value.toFixed(2));
const polar = (radius: number, degrees: number) => {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return [f(C + radius * Math.cos(angle)), f(C + radius * Math.sin(angle))] as const;
};
/** An annular sector between two radii, used for the segmented metal ring. */
const sector = (inner: number, outer: number, from: number, to: number) => {
  const [ax, ay] = polar(outer, from);
  const [bx, by] = polar(outer, to);
  const [cx, cy] = polar(inner, to);
  const [dx, dy] = polar(inner, from);
  return `M${ax} ${ay} A${outer} ${outer} 0 0 1 ${bx} ${by} L${cx} ${cy} A${inner} ${inner} 0 0 0 ${dx} ${dy} Z`;
};
const gear = (root: number, tip: number, teeth: number) =>
  Array.from({ length: teeth }, (_, index) => {
    const step = 360 / teeth;
    const a = index * step;
    const points = [
      polar(root, a),
      polar(tip, a + step * 0.18),
      polar(tip, a + step * 0.48),
      polar(root, a + step * 0.66),
    ];
    return points.map(([x, y], k) => `${index || k ? "L" : "M"}${x} ${y}`).join(" ");
  }).join(" ") + " Z";

const segments = Array.from({ length: 6 }, (_, index) =>
  sector(272, 312, index * 60 + 2.2, index * 60 + 57.8),
);
const segmentOffsets = [-26, 18, -14, 24, -20, 12];
const vertices = Array.from({ length: 8 }, (_, index) => index * 45);
const circuits = vertices.map((angle) => {
  const turn = angle + 14;
  const [x1, y1] = polar(244, angle);
  const [x2, y2] = polar(206, angle);
  const [x3, y3] = polar(206, turn);
  const [x4, y4] = polar(152, turn);
  return `M${x1} ${y1} L${x2} ${y2} A206 206 0 0 1 ${x3} ${y3} L${x4} ${y4}`;
});
const feeders = [22.5, 112.5, 202.5, 292.5].map((angle) => {
  const [x1, y1] = polar(326, angle);
  const [x2, y2] = polar(286, angle);
  return `M${x1} ${y1} L${x2} ${y2}`;
});
const octagram = [0, 1].map((rotation) =>
  [0, 90, 180, 270, 360]
    .map((angle, index) => {
      const [x, y] = polar(244, angle + rotation * 45);
      return `${index ? "L" : "M"}${x} ${y}`;
    })
    .join(" "),
);
const clamps = Array.from({ length: 6 }, (_, index) => index * 60 + 30);
const arcs = [30, 150, 270].map((angle, index) => {
  const [x1, y1] = polar(104, angle);
  const [x2, y2] = polar(40, angle + 8);
  const jitter = [
    [10, -8],
    [-9, 6],
    [7, 9],
  ][index];
  const mx = f((x1 + x2) / 2 + jitter[0]);
  const my = f((y1 + y2) / 2 + jitter[1]);
  return `${x1},${y1} ${f(x1 + (mx - x1) * 0.5 - jitter[1])},${f(y1 + (my - y1) * 0.5 + jitter[0])} ${mx},${my} ${f(mx + (x2 - mx) * 0.5 + jitter[1])},${f(my + (y2 - my) * 0.5 - jitter[0])} ${x2},${y2}`;
});
const shards = [
  { points: "0,-118 30,-30 0,26 -30,-30", fill: "a", shade: 1 },
  { points: "0,-118 30,-30 10,-24", fill: "b", shade: 0.75 },
  { points: "-30,-30 0,26 0,88 -24,10", fill: "b", shade: 0.85 },
  { points: "30,-30 24,10 0,88 0,26", fill: "a", shade: 0.55 },
  { points: "-46,-58 -30,-30 -24,10 -56,-14", fill: "c", shade: 0.8 },
  { points: "48,-48 58,-8 30,6 30,-30", fill: "c", shade: 0.6 },
  { points: "-16,58 -6,104 -24,78", fill: "b", shade: 0.7 },
  { points: "18,52 34,82 12,98", fill: "a", shade: 0.5 },
];
const motes = [
  [92, 220], [702, 168], [654, 640], [128, 610], [560, 96], [246, 720], [736, 452], [62, 420],
  [330, 70], [470, 742],
];
const fragments = [
  { x: 118, y: 168, r: 34, from: 200, to: 290, depth: 1.25 },
  { x: 690, y: 214, r: 26, from: 10, to: 120, depth: 1.1 },
  { x: 664, y: 636, r: 40, from: 120, to: 200, depth: 1.35 },
  { x: 134, y: 626, r: 22, from: 280, to: 20, depth: 1.15 },
];

export function TechnomancerEngine({ children }: { children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const motion = useSceneSupport("motion");
  const visible = useInView(root);
  const [charge, setCharge] = useState(0);
  const [message, setMessage] = useState("");
  const loops = useRef<gsap.core.Animation[]>([]);
  const id = useId().replace(/[^\w-]/g, "");
  const ref = (name: string) => `url(#${name}-${id})`;

  useGSAP(
    () => {
      if (!motion || !svg.current) return;
      const q = gsap.utils.selector(svg.current);
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      // 1. Dormant: the machine is present but unlit.
      intro
        .from(q(".te-energy"), { opacity: 0.12, duration: 0.01 })
        .from(q(".te-halo, .te-nucleus"), { opacity: 0, duration: 0.01 }, 0)
        // 2. Mechanical segments align.
        .from(q(".te-segment"), {
          rotation: (index: number) => segmentOffsets[index],
          svgOrigin: ORIGIN,
          opacity: 0.35,
          duration: 1.6,
          ease: "power4.inOut",
          stagger: 0.06,
        }, 0.1)
        .from(q(".te-gimbal"), { scale: 0.72, opacity: 0, svgOrigin: ORIGIN, duration: 1.4, stagger: 0.12 }, 0.5)
        .from(q(".te-clamp"), { scale: 1.25, opacity: 0, svgOrigin: ORIGIN, duration: 0.9, stagger: 0.05 }, 0.9)
        // 3. Sigils and circuitry activate.
        .to(q(".te-energy"), { opacity: 1, duration: 0.8 }, 1.3)
        .from(q(".te-draw"), { strokeDashoffset: 1, duration: 1.4, stagger: 0.04, ease: "power2.inOut" }, 1.3)
        .from(q(".te-vertex"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.05 }, 1.9)
        // 4. Energy converges into the core.
        .fromTo(q(".te-pulse"), { strokeDashoffset: 0.14 }, { strokeDashoffset: -1, duration: 0.9, stagger: 0.04, ease: "power2.in" }, 2.3)
        .from(q(".te-core"), { scale: 0.35, opacity: 0.2, svgOrigin: ORIGIN, duration: 1.1, ease: "back.out(1.7)" }, 2.9)
        .to(q(".te-halo, .te-nucleus"), { opacity: 1, duration: 0.8 }, 2.9)
        // 5. Stabilise.
        .fromTo(q(".te-burst"), { scale: 0.3, opacity: 0.8 }, { scale: 2.1, opacity: 0, svgOrigin: ORIGIN, duration: 1.3, ease: "power2.out" }, 3.1);

      const spin = (selector: string, turns: number, duration: number) =>
        gsap.to(q(selector), { rotation: 360 * turns, svgOrigin: ORIGIN, duration, repeat: -1, ease: "none" });
      loops.current = [
        spin(".te-plate", 1, 260),
        spin(".te-teeth", -1, 150),
        spin(".te-segments", -1, 320),
        spin(".te-sigil", 1, 210),
        spin(".te-cage", -1, 120),
        spin(".te-core-runes", 1, 64),
        ...q(".te-gimbal").map((gimbal: Element, index: number) =>
          gsap.to(gimbal.querySelectorAll(".te-gimbal-ring"), {
            attr: { ry: [64, 112, 96][index] },
            duration: 9 + index * 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        ),
        gsap.to(q(".te-halo"), { scale: 1.06, opacity: 0.8, svgOrigin: ORIGIN, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(q(".te-crystal"), { y: "-=7", duration: 4.4, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(q(".te-atmosphere"), { opacity: 0.6, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        ...q(".te-pulse").map((pulse: Element, index: number) =>
          gsap.fromTo(
            pulse,
            { strokeDashoffset: 0.14 },
            { strokeDashoffset: -1, duration: 1.8, repeat: -1, repeatDelay: 4 + ((index * 1.7) % 5), delay: 4.2 + index * 0.6, ease: "power1.in" },
          ),
        ),
        ...q(".te-arc").map((arc: Element, index: number) =>
          gsap
            .timeline({ repeat: -1, repeatDelay: 7 + index * 2.9, delay: 5 + index * 3.1 })
            .to(arc, { opacity: 1, duration: 0.05 })
            .to(arc, { opacity: 0.15, duration: 0.07 })
            .to(arc, { opacity: 0.9, duration: 0.05 })
            .to(arc, { opacity: 0, duration: 0.25 }),
        ),
        ...q(".te-fragment").map((fragment: Element, index: number) =>
          gsap.to(fragment, { y: index % 2 ? 10 : -12, rotation: index % 2 ? 6 : -5, transformOrigin: "50% 50%", duration: 6 + index, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        ),
      ];
      loops.current.forEach((loop) => loop.delay(loop.delay() + 3.4));
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
      gsap.to(layer, { x: x * depth * 22, y: y * depth * 18, duration: 1, ease: "power2.out", overwrite: "auto" });
    });
  };
  const channel = () => {
    const next = charge + 1;
    setCharge(next % 3);
    if (motion && svg.current) {
      const q = gsap.utils.selector(svg.current);
      gsap.fromTo(q(".te-core"), { scale: 1 + next * 0.06 }, { scale: 1, svgOrigin: ORIGIN, duration: 0.9, ease: "elastic.out(1, 0.45)" });
      gsap.fromTo(q(`.te-arc:nth-of-type(${next})`), { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.in" });
      if (next === 3) {
        gsap.fromTo(q(".te-burst"), { scale: 0.3, opacity: 0.95 }, { scale: 2.6, opacity: 0, svgOrigin: ORIGIN, duration: 1.5, ease: "power2.out" });
        gsap.to(q(".te-segment"), { rotation: "+=60", svgOrigin: ORIGIN, duration: 1.8, ease: "power3.inOut", stagger: 0.04 });
        gsap.fromTo(q(".te-pulse"), { strokeDashoffset: 0.14 }, { strokeDashoffset: -1, duration: 0.7, stagger: 0.03, ease: "power2.in" });
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
      className="workbench-stage engine-stage"
      data-charge={charge}
      onPointerMove={parallax}
    >
      <div
        className="hero-scene-mount"
        data-motion-slot="workshop-illustration"
        aria-hidden="true"
      >
        <svg ref={svg} className="workbench-art engine-art" viewBox="0 0 800 800" focusable="false">
          <defs>
            <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3a3148" />
              <stop offset="0.35" stopColor="#1a1524" />
              <stop offset="0.7" stopColor="#0d0b14" />
              <stop offset="1" stopColor="#241d30" />
            </linearGradient>
            <linearGradient id={`brass-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f2d6a0" />
              <stop offset="0.38" stopColor="#b88a4c" />
              <stop offset="0.72" stopColor="#5e4022" />
              <stop offset="1" stopColor="#c99a5a" />
            </linearGradient>
            <radialGradient id={`atmos-${id}`}>
              <stop offset="0" stopColor="#3fd8e8" stopOpacity="0.34" />
              <stop offset="0.35" stopColor="#5b2fd0" stopOpacity="0.2" />
              <stop offset="0.7" stopColor="#2fd69b" stopOpacity="0.05" />
              <stop offset="1" stopColor="#07060d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`halo-${id}`}>
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.16" stopColor="#bdfbff" stopOpacity="0.8" />
              <stop offset="0.42" stopColor="#3fd8e8" stopOpacity="0.35" />
              <stop offset="0.75" stopColor="#7a3cff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#7a3cff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`shard-a-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#effeff" />
              <stop offset="0.35" stopColor="#4fe3f0" />
              <stop offset="0.8" stopColor="#4d22b8" />
              <stop offset="1" stopColor="#14093a" />
            </linearGradient>
            <linearGradient id={`shard-b-${id}`} x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c9fbff" />
              <stop offset="0.45" stopColor="#2c86d6" />
              <stop offset="1" stopColor="#0f0830" />
            </linearGradient>
            <linearGradient id={`shard-c-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f2c9ff" />
              <stop offset="0.5" stopColor="#a53fd0" />
              <stop offset="1" stopColor="#1a0a36" />
            </linearGradient>
            <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Atmosphere and distant motes */}
          <g data-depth="0.1">
            <circle className="te-atmosphere" cx={C} cy={C} r="400" fill={ref("atmos")} />
            {[-28, 18, 62].map((angle) => (
              <rect
                key={angle}
                className="te-shaft"
                x={C - 18}
                y="-60"
                width="36"
                height="920"
                transform={`rotate(${angle} ${C} ${C})`}
              />
            ))}
            {motes.map(([x, y]) => (
              <circle key={`${x}${y}`} className="te-mote" cx={x} cy={y} r="1.6" />
            ))}
          </g>

          {/* Engraved outer plate with a rune band */}
          <g data-depth="0.2">
            <g className="te-plate">
              <circle className="te-engrave" cx={C} cy={C} r="372" />
              <circle className="te-engrave te-faint" cx={C} cy={C} r="360" />
              {Array.from({ length: 120 }, (_, index) => {
                const [x1, y1] = polar(360, index * 3);
                const [x2, y2] = polar(index % 10 ? 352 : 342, index * 3);
                return <path key={index} className="te-engrave" d={`M${x1} ${y1} L${x2} ${y2}`} />;
              })}
              {Array.from({ length: 36 }, (_, index) => {
                const [x, y] = polar(334, index * 10);
                return (
                  <path
                    key={index}
                    className="te-rune te-energy"
                    d={runes[(index * 5) % runes.length]}
                    transform={`translate(${x} ${y}) rotate(${index * 10})`}
                  />
                );
              })}
              <circle className="te-engrave" cx={C} cy={C} r="322" />
            </g>
          </g>

          {/* Blackened segmented ring and its brass teeth */}
          <g data-depth="0.32">
            <g className="te-teeth">
              <path className="te-gear" d={gear(258, 268, 72)} fill={ref("brass")} />
              <circle className="te-gear-inner" cx={C} cy={C} r="252" />
            </g>
            <g className="te-segments">
              {segments.map((d, index) => (
                <g key={d} className="te-segment">
                  <path d={d} className="te-shadow" transform="translate(0 10)" />
                  <path d={d} className="te-metal" fill={ref("metal")} />
                  <path
                    className="te-metal-groove"
                    d={(() => {
                      const [ax, ay] = polar(292, index * 60 + 6);
                      const [bx, by] = polar(292, index * 60 + 54);
                      return `M${ax} ${ay} A292 292 0 0 1 ${bx} ${by}`;
                    })()}
                  />
                  {[index * 60 + 6, index * 60 + 54].map((angle) => {
                    const [x, y] = polar(292, angle);
                    return <circle key={angle} className="te-rivet" cx={x} cy={y} r="4.5" fill={ref("brass")} />;
                  })}
                  {[0, 1, 2].map((rune) => {
                    const [x, y] = polar(292, index * 60 + 18 + rune * 12);
                    return (
                      <path
                        key={rune}
                        className="te-inlay te-energy"
                        d={runes[(index + rune * 3) % runes.length]}
                        transform={`translate(${x} ${y}) rotate(${index * 60 + 18 + rune * 12}) scale(1.15)`}
                      />
                    );
                  })}
                </g>
              ))}
            </g>
            <g className="te-circuits te-energy">
              {feeders.map((d) => (
                <g key={d}>
                  <path className="te-circuit te-draw" pathLength={1} d={d} />
                  <path className="te-pulse" pathLength={1} d={d} />
                </g>
              ))}
            </g>
          </g>

          {/* Sacred geometry and circuitry routed along it */}
          <g data-depth="0.45" className="te-inner">
            <g className="te-sigil te-energy">
              <circle className="te-sigil-line te-draw" pathLength={1} cx={C} cy={C} r="244" />
              {octagram.map((d) => (
                <path key={d} className="te-sigil-line te-draw" pathLength={1} d={d} />
              ))}
              <circle className="te-sigil-line te-draw" pathLength={1} cx={C} cy={C} r="176" />
              {circuits.map((d) => (
                <g key={d}>
                  <path className="te-circuit te-draw" pathLength={1} d={d} />
                  <path className="te-pulse" pathLength={1} d={d} />
                </g>
              ))}
              {vertices.map((angle, index) => {
                const [x, y] = polar(244, angle);
                return (
                  <g key={angle} className="te-vertex" transform={`translate(${x} ${y})`}>
                    <circle r="13" />
                    <path d={runes[index]} transform="scale(0.85)" />
                  </g>
                );
              })}
            </g>
          </g>

          {/* Armillary gimbals: dimensional rings around the core */}
          <g data-depth="0.6" className="te-inner">
            {[
              [-28, 210, 70],
              [34, 210, 120],
              [90, 196, 104],
            ].map(([angle, rx, ry], index) => (
              <g key={angle} className="te-gimbal" transform={`rotate(${angle} ${C} ${C})`}>
                <ellipse className="te-gimbal-ring te-gimbal-back" cx={C} cy={C} rx={rx} ry={ry} />
                <ellipse className="te-gimbal-ring" cx={C} cy={C} rx={rx} ry={ry} stroke={ref("brass")} />
                <circle className="te-bead" cx={C + rx} cy={C} r={index === 1 ? 6 : 4.5} fill={ref("brass")} />
                <circle className="te-bead" cx={C - rx} cy={C} r="4.5" fill={ref("brass")} />
              </g>
            ))}
          </g>

          {/* Containment cage and clamps */}
          <g data-depth="0.75" className="te-inner">
            <g className="te-cage">
              <circle className="te-cage-ring" cx={C} cy={C} r="140" />
              <circle className="te-cage-edge" cx={C} cy={C} r="147" stroke={ref("brass")} />
              <circle className="te-cage-edge" cx={C} cy={C} r="133" stroke={ref("brass")} />
              {clamps.map((angle) => {
                const [a1x, a1y] = polar(156, angle - 6);
                const [a2x, a2y] = polar(156, angle + 6);
                const [b1x, b1y] = polar(108, angle - 2.5);
                const [b2x, b2y] = polar(108, angle + 2.5);
                const [tx, ty] = polar(103, angle);
                return (
                  <g key={angle} className="te-clamp">
                    <path
                      d={`M${a1x} ${a1y} L${a2x} ${a2y} L${b2x} ${b2y} L${b1x} ${b1y} Z`}
                      fill={ref("brass")}
                      className="te-clamp-body"
                    />
                    <circle className="te-emitter te-energy" cx={tx} cy={ty} r="3.6" />
                  </g>
                );
              })}
            </g>
            <g className="te-arcs" filter={ref("glow")}>
              {arcs.map((points) => (
                <polyline key={points} className="te-arc" points={points} />
              ))}
            </g>
          </g>

          {/* The fractured crystal core */}
          <g data-depth="0.9" className="te-inner">
            <circle className="te-halo" cx={C} cy={C} r="170" fill={ref("halo")} />
            <circle className="te-burst" cx={C} cy={C} r="96" />
            <g className="te-core-runes te-energy">
              <circle className="te-core-ring" cx={C} cy={C} r="86" />
              {Array.from({ length: 12 }, (_, index) => {
                const [x, y] = polar(72, index * 30);
                return (
                  <path
                    key={index}
                    className="te-rune"
                    d={runes[index % runes.length]}
                    transform={`translate(${x} ${y}) rotate(${index * 30}) scale(0.8)`}
                  />
                );
              })}
            </g>
            <g className="te-core">
              <g className="te-crystal" transform={`translate(${C} ${C - 6})`}>
                {shards.map((shard) => (
                  <polygon
                    key={shard.points}
                    className="te-shard"
                    points={shard.points}
                    fill={ref(`shard-${shard.fill}`)}
                    fillOpacity={shard.shade}
                  />
                ))}
                <path className="te-fracture" d="M0 -118 L4 -60 L-6 -20 L2 26 M-30 -30 L-8 -14 M30 -30 L12 -10 L24 10" />
                <circle className="te-nucleus" cy="-12" r="11" filter={ref("glow")} />
              </g>
            </g>
          </g>

          {/* Floating fragments in the foreground */}
          {fragments.map((fragment) => {
            const start = ((fragment.from - 90) * Math.PI) / 180;
            const end = ((fragment.to - 90) * Math.PI) / 180;
            const sweep = (fragment.to - fragment.from + 360) % 360;
            const p = (angle: number, r: number) =>
              `${f(fragment.x + r * Math.cos(angle))} ${f(fragment.y + r * Math.sin(angle))}`;
            return (
              <g key={fragment.x} data-depth={fragment.depth}>
                <g className="te-fragment">
                  <path
                    className="te-fragment-metal"
                    d={`M${p(start, fragment.r)} A${fragment.r} ${fragment.r} 0 ${sweep > 180 ? 1 : 0} 1 ${p(end, fragment.r)} L${p(end, fragment.r - 9)} A${fragment.r - 9} ${fragment.r - 9} 0 ${sweep > 180 ? 1 : 0} 0 ${p(start, fragment.r - 9)} Z`}
                    fill={ref("metal")}
                  />
                  <circle className="te-fragment-pin" cx={fragment.x} cy={fragment.y} r="3" fill={ref("brass")} />
                </g>
              </g>
            );
          })}
        </svg>
      </div>
      {children}
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

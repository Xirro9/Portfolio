import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSceneSupport } from "./sceneSupport";

gsap.registerPlugin(useGSAP);

/**
 * One signal line for a career: it runs down the margin past each role
 * (`data-rail-node`), then turns into the horizontal academic timeline
 * (`data-rail-turn`) and passes each degree (`data-rail-branch`). Geometry is
 * measured from the rendered sections, so it follows real layout. The line is
 * decorative; without JavaScript the sections read the same.
 */
interface Rail {
  width: number;
  height: number;
  d: string;
  nodes: [number, number, string][];
}
const RAIL_X = 6;
const RADIUS = 28;

export function CareerPath({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState<Rail | null>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const box = node.getBoundingClientRect();
      const local = (element: Element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.left - box.left, y: rect.top - box.top, right: rect.right - box.left, height: rect.height };
      };
      const nodes: Rail["nodes"] = [...node.querySelectorAll("[data-rail-node]")].map((element) => {
        const rect = local(element);
        return [RAIL_X, rect.y + Math.min(rect.height / 2, 26), "role"];
      });
      const turn = node.querySelector("[data-rail-turn]");
      const branches = [...node.querySelectorAll("[data-rail-branch]")].map((branch) => ({
        ...local(branch),
        status: branch.getAttribute("data-rail-branch") ?? "",
      }));
      const tops = branches.map((branch) => branch.y);
      const sideBySide = branches.length > 1 && Math.max(...tops) - Math.min(...tops) < 4;
      let d = `M${RAIL_X} 0 V${box.height}`;
      if (turn && sideBySide) {
        // Degrees side by side: the line turns into a horizontal timeline.
        const y = local(turn).y;
        d = `M${RAIL_X} 0 V${y - RADIUS} Q${RAIL_X} ${y} ${RAIL_X + RADIUS} ${y} H${box.width}`;
        branches.forEach((branch) => nodes.push([branch.x, y, branch.status]));
      } else {
        // Stacked degrees (narrow screens): the line keeps running down.
        branches.forEach((branch) => nodes.push([RAIL_X, branch.y + 30, branch.status]));
      }
      setRail({ width: box.width, height: box.height, d, nodes });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    node.querySelectorAll("[data-rail-turn], [data-rail-node]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const motion = useSceneSupport("motion");
  const drawn = rail !== null;
  useGSAP(
    () => {
      const node = root.current;
      if (!motion || !drawn || !node) return;
      gsap.registerPlugin(ScrollTrigger);
      // The line is drawn by reading progress, like a signal reaching each node.
      gsap.fromTo(
        node.querySelector(".rail-draw"),
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top 72%", end: "bottom 70%", scrub: 0.6 },
        },
      );
      node.querySelectorAll(".rail-node").forEach((point) => {
        gsap.from(point, {
          scale: 0,
          transformOrigin: "50% 50%",
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: point, start: "top 78%", once: true },
        });
      });
    },
    { scope: root, dependencies: [motion, drawn] },
  );
  return (
    <div ref={root} className="career-path" data-motion-slot="signal-rail">
      {rail && (
        <svg
          className="signal-rail"
          width={rail.width}
          height={rail.height}
          viewBox={`0 0 ${rail.width} ${rail.height}`}
          aria-hidden="true"
          focusable="false"
        >
          <path className="rail-base" d={rail.d} />
          <path className="rail-draw" pathLength={1} d={rail.d} data-motion-part="rail-path" />
          <path className="rail-pulse" pathLength={1} d={rail.d} />
          {rail.nodes.map(([x, y, kind], index) => (
            <g key={index} className={`rail-node rail-node-${kind.replace(/\s+/g, "-")}`} transform={`translate(${x} ${y})`}>
              <circle r="9" className="rail-node-halo" />
              <circle r="4" />
            </g>
          ))}
        </svg>
      )}
      {children}
    </div>
  );
}

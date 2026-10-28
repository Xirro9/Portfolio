import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * One scroll choreographer for every route, bound to the stable
 * data-motion-slot hooks. Text is only ever transformed, never hidden; with
 * reduced motion or without JavaScript nothing here runs.
 */
export function useSiteMotion(scope: RefObject<HTMLElement | null>, path: string) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || typeof matchMedia === "undefined") return;
      // Registered lazily: ScrollTrigger needs a real matchMedia.
      gsap.registerPlugin(ScrollTrigger);
      const all = <T extends Element = HTMLElement>(selector: string) =>
        gsap.utils.toArray<T>(selector, root);
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 900px)",
        },
        (context) => {
          const { motion, wide } = context.conditions as Record<string, boolean>;
          if (!motion) return;

          // Section rules draw in as each heading arrives.
          all(".section-heading, .page-heading").forEach((heading) => {
            gsap.fromTo(
              heading,
              { "--rule": 0 },
              {
                "--rule": 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: { trigger: heading, start: "top 88%", once: true },
              },
            );
          });

          // Hero → content: celestial lines straighten into the grid.
          all<SVGPathElement>('[data-motion-part="chapter-line"]').forEach((line, index) => {
            gsap.fromTo(
              line,
              { strokeDashoffset: 0.65 },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: line.closest("[data-motion-slot]") ?? line,
                  start: `top ${92 - (index % 4) * 4}%`,
                  end: "bottom 45%",
                  scrub: 0.8,
                },
              },
            );
          });
          all('[data-motion-slot="hero-foreground"]').forEach((foreground) => {
            gsap.to(foreground, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: foreground.closest("[data-hero]"),
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
          all(".orrery-art").forEach((art) => {
            gsap.to(art, {
              rotate: 24,
              scale: 0.86,
              ease: "none",
              scrollTrigger: {
                trigger: art.closest("[data-hero]"),
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          // Featured media expands from a masked aperture.
          all('[data-motion-slot="expanding-imagery"]').forEach((media) => {
            // Clip only the visual frame; captions and provenance stay readable.
            const frame = media.querySelector(
              ".project-media-frame, .system-diagram-stage, .project-overview-art",
            );
            if (!frame) return;
            gsap.fromTo(
              frame,
              { clipPath: wide ? "inset(8% 10% 8% 10%)" : "inset(4% 6% 4% 6%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: { trigger: media, start: "top 92%", end: "top 38%", scrub: 0.6 },
              },
            );
          });
          // Workshop artifacts open like a portal rather than a window.
          all('[data-motion-slot="artifact-portal"] .project-overview-art').forEach((art) => {
            gsap.fromTo(
              art,
              { clipPath: "circle(24% at 50% 50%)" },
              {
                clipPath: "circle(78% at 50% 50%)",
                ease: "none",
                scrollTrigger: { trigger: art, start: "top 95%", end: "center 50%", scrub: 0.8 },
              },
            );
          });
          all('[data-motion-slot="featured-project"]').forEach((feature) => {
            const parts = feature.querySelectorAll(
              ".exhibit-head > *, .exhibit-specs > div, .exhibit-actions",
            );
            if (parts.length)
              gsap.from(parts, {
                y: 28,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.06,
                clearProps: "transform",
                scrollTrigger: { trigger: feature, start: "top 75%", once: true },
              });
            const notes = feature.querySelectorAll('[data-motion-part="annotation"]');
            if (notes.length)
              gsap.from(notes, {
                scale: 0,
                transformOrigin: "0% 0%",
                duration: 0.5,
                ease: "back.out(2)",
                stagger: 0.15,
                scrollTrigger: { trigger: feature, start: "top 55%", once: true },
              });
            // The second capture drifts against the first: controlled layering.
            const layer = feature.querySelector('[data-motion-part="secondary-media"]');
            if (layer && wide)
              gsap.fromTo(
                layer,
                { yPercent: 18 },
                {
                  yPercent: -14,
                  ease: "none",
                  scrollTrigger: { trigger: feature, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
          });

          // Architecture wires draw with scroll; nodes settle onto the grid.
          all('[data-motion-slot="architecture-lines"]').forEach((diagram) => {
            const wires = diagram.querySelectorAll('[data-motion-part="diagram-path"]');
            const nodes = diagram.querySelectorAll('[data-motion-part="diagram-node"]');
            const zones = diagram.querySelectorAll('[data-motion-part="diagram-zone"]');
            const staged = diagram.closest(".workbench-exhibit");
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: diagram,
                start: "top 85%",
                end: staged ? "center 50%" : "center 45%",
                scrub: 0.7,
              },
            });
            if (staged && wide)
              // The plan view lifts from a tilted bench to face the reader.
              timeline.fromTo(
                diagram.querySelector("svg"),
                { rotateX: 26, scale: 0.94 },
                { rotateX: 0, scale: 1, ease: "power1.out", duration: 1 },
                0,
              );
            if (zones.length)
              timeline.from(zones, { opacity: 0, stagger: 0.12, ease: "none", duration: 0.4 }, 0);
            if (nodes.length)
              timeline.from(
                nodes,
                staged
                  ? { opacity: 0.25, stagger: 0.09, ease: "power1.out", duration: 0.4 }
                  : { y: "+=18", scale: 0.94, transformOrigin: "50% 50%", stagger: 0.08, ease: "power2.out" },
                0.05,
              );
            if (wires.length)
              timeline.fromTo(wires, { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.1, ease: "none" }, 0.15);
            const steps = diagram.querySelectorAll("[data-architecture-step]");
            if (steps.length)
              timeline.from(steps, { x: -24, stagger: 0.1, ease: "power2.out" }, 0);
          });

          // Index rows and artifact plates arrive with restraint.
          all('[data-motion-slot="project-card"], [data-motion-slot="arcane-entry"]').forEach((row) => {
            gsap.from(row, {
              y: 22,
              duration: 0.8,
              clearProps: "transform",
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 92%", once: true },
            });
          });
          all('[data-motion-slot="workshop-portal"]').forEach((plate, index) => {
            gsap.from(plate, {
              y: 48 + (index % 2) * 32,
              duration: 1.1,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: plate, start: "top 92%", once: true },
            });
          });
          all(".invitation-seal").forEach((seal) => {
            gsap.fromTo(
              seal,
              { scale: 0.86 },
              {
                scale: 1.04,
                ease: "none",
                scrollTrigger: { trigger: seal, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          // Timelines fill as the reader progresses through them.
          all(".timeline").forEach((timeline) => {
            gsap.fromTo(
              timeline,
              { "--progress": 0 },
              {
                "--progress": 1,
                ease: "none",
                scrollTrigger: { trigger: timeline, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
              },
            );
            gsap.from(timeline.children, {
              x: 24,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: { trigger: timeline, start: "top 80%", once: true },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope, dependencies: [path] },
  );
}

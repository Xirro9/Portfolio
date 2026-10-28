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
              ".project-media-frame, .system-diagram-scroll, .project-overview-art",
            );
            if (!frame) return;
            gsap.fromTo(
              frame,
              { clipPath: wide ? "inset(9% 12% 9% 12%)" : "inset(4% 6% 4% 6%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: { trigger: media, start: "top 92%", end: "top 38%", scrub: 0.6 },
              },
            );
          });
          all('[data-motion-slot="featured-project"]').forEach((feature) => {
            const copy = feature.querySelector(".featured-project-copy");
            if (copy)
              gsap.from(copy.children, {
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
          });

          // Architecture wires draw with scroll; nodes settle onto the grid.
          all('[data-motion-slot="architecture-lines"]').forEach((diagram) => {
            const wires = diagram.querySelectorAll('[data-motion-part="diagram-path"]');
            const nodes = diagram.querySelectorAll('[data-motion-part="diagram-node"]');
            const timeline = gsap.timeline({
              scrollTrigger: { trigger: diagram, start: "top 80%", end: "center 45%", scrub: 0.7 },
            });
            if (nodes.length)
              timeline.from(nodes, { y: "+=18", scale: 0.94, transformOrigin: "50% 50%", stagger: 0.08, ease: "power2.out" }, 0);
            if (wires.length)
              timeline.fromTo(wires, { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.1, ease: "none" }, 0.15);
            const steps = diagram.querySelectorAll("[data-architecture-step]");
            if (steps.length)
              timeline.from(steps, { x: -24, stagger: 0.1, ease: "power2.out" }, 0);
          });

          // Archive plaques and workshop portals arrive differently.
          all('[data-motion-slot="project-card"]').forEach((card, index) => {
            gsap.from(card, {
              y: 44,
              duration: 0.9,
              clearProps: "transform",
              delay: (index % 2) * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            });
          });
          all('[data-motion-slot="workshop-portal"]').forEach((portal, index) => {
            gsap.from(portal, {
              y: 56,
              rotate: index % 2 ? 2.5 : -2.5,
              scale: 0.94,
              duration: 1,
              ease: "back.out(1.4)",
              clearProps: "transform",
              scrollTrigger: { trigger: portal, start: "top 92%", once: true },
            });
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

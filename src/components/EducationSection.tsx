import { useEffect, useRef, type CSSProperties } from "react";
import { education, educationAnimation } from "../content/site";
import { SectionHeading } from "./Content";

export interface EducationAnimation {
  enabled: boolean;
  durationMs: number;
  staggerMs: number;
  glowOpacity: number;
}

export function EducationSection({
  animation = educationAnimation,
}: {
  animation?: EducationAnimation;
}) {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = section.current;
    if (
      !node ||
      !animation.enabled ||
      typeof IntersectionObserver === "undefined"
    )
      return;
    // Motion is purely decorative: never hide titles or gate their content.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    node.querySelectorAll(".education-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [animation.enabled]);

  const settings = {
    "--education-duration": `${Math.min(2400, Math.max(300, animation.durationMs))}ms`,
    "--education-glow-opacity": Math.min(1, Math.max(0, animation.glowOpacity)),
  } as CSSProperties;

  return (
    <section
      id="education"
      ref={section}
      className="education-section"
      data-motion={animation.enabled ? "enabled" : "disabled"}
      aria-labelledby="education-heading"
      style={settings}
    >
      <p className="eyebrow">Academic foundation · The University of Tulsa</p>
      <div id="education-heading">
        <SectionHeading title="Education & continued study">
          A completed cybersecurity degree, with graduate study underway.
        </SectionHeading>
      </div>
      <ol className="education-grid" data-rail-turn>
        {education.map((item, index) => (
          <li
            key={item.title}
            className={`education-card ${item.status === "completed" ? "education-completed" : "education-current"}`}
            data-rail-branch={item.status}
            style={
              {
                "--education-delay": `${Math.min(400, Math.max(0, animation.staggerMs)) * index}ms`,
              } as CSSProperties
            }
          >
            <div className="education-card-meta">
              <p className="eyebrow">
                {item.status === "completed"
                  ? "Undergraduate"
                  : "Graduate program"}
              </p>
              <span className="education-status">
                {item.status === "completed" ? "Completed" : "In progress"}
              </span>
            </div>
            <h3 className="education-title">
              {item.title}
              <span className="education-title-track" aria-hidden="true" />
            </h3>
            <p className="education-field">{item.field}</p>
            <p className="education-period">{item.period}</p>
            <p className="education-institution">{item.institution}</p>
            <p className="education-description">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

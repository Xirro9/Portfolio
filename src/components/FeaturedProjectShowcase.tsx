import type { Project } from "../content/types";
import { projectPath } from "../content/projects";
import { href } from "../routes";
import {
  ProjectEvidenceLinks,
  ProjectVisual,
  StatusIndicator,
} from "./Projects";
import { SystemDiagram } from "./visual/SystemDiagram";

/** Decorative call-outs over a real capture; positions are image fractions. */
const annotations: Record<string, [string, number, number][]> = {
  agenthq: [
    ["DEMO mode badge", 6, 4],
    ["Agent workstations", 38, 34],
    ["Activity & replay", 9, 92],
    ["Local settings", 84, 22],
  ],
};

export function FeaturedProjectShowcase({
  project,
  index = 0,
  creative = false,
  mediaPosition = index % 2 ? "end" : "start",
}: {
  project: Project;
  index?: number;
  creative?: boolean;
  mediaPosition?: "start" | "end";
}) {
  const notes = creative ? undefined : annotations[project.slug];
  const media = (
    <div
      className="featured-project-media"
      data-motion-slot="expanding-imagery"
    >
      {!creative && project.slug === "controlgauge" ? (
        <SystemDiagram slug={project.slug} />
      ) : (
        <div className={notes ? "annotated-media" : undefined}>
          <ProjectVisual project={project} />
          {notes && (
            <ul className="media-annotations" aria-hidden="true">
              {notes.map(([text, x, y]) => (
                <li
                  key={text}
                  data-motion-part="annotation"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={x > 60 ? "annotation-end" : undefined}
                >
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
  const copy = (
    <div className="featured-project-copy">
      <p className="eyebrow exhibit-number">
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        {creative ? "Featured in The Workshop" : "Featured engineering"}
      </p>
      <StatusIndicator status={project.status} />
      <h3>
        <a href={href(projectPath(project))}>{project.title}</a>
      </h3>
      <p className="featured-summary">{project.summary}</p>
      <ul className="tag-list" aria-label="Technologies and topics">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className="project-status-detail">{project.statusDetail}</p>
      <p className="caption">
        Evidence basis: {project.verification.replaceAll("-", " ")}
      </p>
      <a className="button-link" href={href(projectPath(project))}>
        Read {project.title} case study <span aria-hidden="true">→</span>
      </a>
      <ProjectEvidenceLinks project={project} />
    </div>
  );
  return (
    <article
      className={`featured-project-showcase${creative ? " featured-project-creative" : ""}${mediaPosition === "end" ? " feature-reversed" : ""}`}
      data-project={project.slug}
      data-motion-slot="featured-project"
      data-media-position={mediaPosition}
    >
      {mediaPosition === "start" ? (
        <>
          {media}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {media}
        </>
      )}
    </article>
  );
}

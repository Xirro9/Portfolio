import type { ReactNode } from "react";
import type { Project } from "../content/types";
import { projectPath } from "../content/projects";
import { href } from "../routes";
import { ProjectEvidenceLinks, ProjectVisual, StatusIndicator } from "./Projects";
import { ProjectMedia } from "./media/ProjectMedia";
import { ProjectArtwork } from "./visual/ProjectArtwork";
import { SystemDiagram, hasSystemDiagram } from "./visual/SystemDiagram";

/** Decorative call-outs over a real capture; positions are image fractions. */
const annotations: Record<string, [string, number, number][]> = {
  agenthq: [
    ["DEMO mode badge", 6, 4],
    ["Agent workstations", 38, 34],
    ["Activity & replay", 9, 92],
    ["Local settings", 84, 22],
  ],
};

/**
 * Each flagship project gets its own composition. The DOM order is always
 * heading → visual → specification → actions, so reading and focus order stay
 * stable while the grid places the parts differently per exhibit.
 */
type Exhibit = "diagram" | "media" | "arch" | "table" | "spread";
function exhibitFor(project: Project, creative: boolean): Exhibit {
  if (creative)
    return project.slug === "bug-hunters-guild"
      ? "arch"
      : project.slug === "mtg-game-night"
        ? "table"
        : "spread";
  if (project.media) return "media";
  if (hasSystemDiagram(project.slug)) return "diagram";
  return "spread";
}

export function FeaturedProjectShowcase({
  project,
  index = 0,
  creative = false,
}: {
  project: Project;
  index?: number;
  creative?: boolean;
}) {
  const exhibit = exhibitFor(project, creative);
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      id={`exhibit-${project.slug}`}
      className={`featured-project-showcase exhibit-${exhibit}${creative ? " featured-project-creative" : ""}`}
      data-project={project.slug}
      data-exhibit={exhibit}
      data-motion-slot="featured-project"
    >
      <header className="exhibit-head">
        <p className="eyebrow exhibit-number">
          <span aria-hidden="true">{number}</span>
          {creative ? "Workshop artifact" : "Featured engineering"}
        </p>
        <h3>
          <a href={href(projectPath(project))}>{project.title}</a>
        </h3>
        <p className="featured-summary">{project.summary}</p>
      </header>
      <div
        className="featured-project-media"
        data-motion-slot={creative ? "artifact-portal" : "expanding-imagery"}
      >
        <ExhibitVisual project={project} exhibit={exhibit} />
      </div>
      <dl className="exhibit-specs">
        <div>
          <dt>Status</dt>
          <dd>
            <StatusIndicator status={project.status} />
            <span className="project-status-detail">{project.statusDetail}</span>
          </dd>
        </div>
        <div>
          <dt>{creative ? "Made with" : "Stack"}</dt>
          <dd>
            <ul className="tag-list" aria-label="Technologies and topics">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Evidence basis</dt>
          <dd>{project.verification.replaceAll("-", " ")}</dd>
        </div>
      </dl>
      <div className="exhibit-actions">
        <a className="button-link" href={href(projectPath(project))}>
          Read {project.title} case study <span aria-hidden="true">→</span>
        </a>
        <ProjectEvidenceLinks project={project} />
      </div>
    </article>
  );
}

function ExhibitVisual({
  project,
  exhibit,
}: {
  project: Project;
  exhibit: Exhibit;
}): ReactNode {
  if (exhibit === "diagram") return <SystemDiagram slug={project.slug} />;
  if (exhibit === "arch" || exhibit === "table")
    return <ProjectArtwork project={project} bare />;
  const notes = annotations[project.slug];
  const secondary = project.media?.screenshots?.find(
    (shot) => shot.path !== project.media?.cover.path,
  );
  return (
    <div className="exhibit-layers">
      <div className={notes ? "annotated-media" : undefined}>
        <ProjectVisual project={project} priority={false} />
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
      {secondary && (
        <div className="exhibit-secondary" data-motion-part="secondary-media">
          <ProjectMedia image={secondary} sizes="(min-width: 900px) 24vw, 60vw" />
        </div>
      )}
    </div>
  );
}

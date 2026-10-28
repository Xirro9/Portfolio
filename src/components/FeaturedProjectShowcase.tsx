import type { Project } from "../content/types";
import { projectPath } from "../content/projects";
import { href } from "../routes";
import {
  ProjectEvidenceLinks,
  ProjectVisual,
  StatusIndicator,
} from "./Projects";

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
  const media = (
    <div
      className="featured-project-media"
      data-motion-slot="expanding-imagery"
    >
      <ProjectVisual project={project} />
    </div>
  );
  const copy = (
    <div className="featured-project-copy">
      <p className="eyebrow">
        {creative ? "Featured in The Workshop" : "Featured engineering"}
      </p>
      <StatusIndicator status={project.status} />
      <h3>
        <a href={href(projectPath(project))}>{project.title}</a>
      </h3>
      <p>{project.summary}</p>
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

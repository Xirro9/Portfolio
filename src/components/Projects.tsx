import { useState } from "react";
import { filterProjects, projectPath } from "../content/projects";
import type { Project, ProjectStatus } from "../content/types";
import { href } from "../routes";
import { ExternalLink } from "./Content";
import { StaticProjectOverview } from "./media/ProjectMedia";
import { ProjectPreview } from "./media/ProjectPreview";
const labels: Record<ProjectStatus, string> = {
  active: "Active development",
  prototype: "Prototype",
  experimental: "Experimental",
  historical: "Historical",
  concept: "Concept",
};
export function StatusIndicator({ status }: { status: ProjectStatus }) {
  return <span className={`status status-${status}`}>{labels[status]}</span>;
}
const verificationLabel = (project: Project) =>
  project.verification === "owner-reported"
    ? "Owner-reported"
    : project.verification === "local-documentation"
      ? "Local documentation"
      : "Public source";

/** A compact editorial index row for secondary professional work. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="project-card"
      data-project={project.slug}
      data-motion-slot="project-card"
    >
      <div className="index-title">
        <h3>
          <a href={href(projectPath(project))}>{project.title}</a>
        </h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies and topics">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="project-meta">
        <StatusIndicator status={project.status} />
        <span>{verificationLabel(project)}</span>
        <p className="project-status-detail">{project.statusDetail}</p>
      </div>
      <div className="index-actions">
        <a className="text-link" href={href(projectPath(project))}>
          Read {project.title} case study{"\u00a0"}<span aria-hidden="true">→</span>
        </a>
        <ProjectEvidenceLinks project={project} />
      </div>
    </article>
  );
}
export function ProjectGrid({
  projects,
  creative = false,
}: {
  projects: Project[];
  creative?: boolean;
}) {
  return creative ? (
    <div className="artifact-plates">
      {projects.map((project) => (
        <WorkshopProjectCard key={project.slug} project={project} />
      ))}
    </div>
  ) : (
    <div className="project-index">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
export function ProjectExplorer({
  projects,
  creative = false,
  title = "Projects",
}: {
  projects: Project[];
  creative?: boolean;
  title?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = [...new Set(projects.map((project) => project.category))];
  const filtered = filterProjects(projects, query, category);
  return (
    <>
      <h2>{title}</h2>
      <search className="project-filter" aria-label="Filter projects">
        <div>
          <label htmlFor="project-search">Search projects</label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, technology, or topic"
          />
        </div>
        <div>
          <label htmlFor="project-category">Discipline</label>
          <select
            id="project-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All disciplines</option>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCategory("all");
          }}
        >
          Reset filters
        </button>
      </search>
      <p role="status" className="result-count">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} shown
      </p>
      {filtered.length ? (
        creative ? (
          <ArcaneIndex projects={filtered} />
        ) : (
          <ProjectGrid projects={filtered} />
        )
      ) : (
        <p className="empty-state">
          No projects match these filters. Try another topic or reset the
          filters.
        </p>
      )}
    </>
  );
}

export function ProjectVisual({
  project,
  priority = false,
  bare = false,
}: {
  project: Project;
  priority?: boolean;
  bare?: boolean;
}) {
  return project.media ? (
    <ProjectPreview
      title={project.title}
      cover={project.media.cover}
      video={project.media.preview}
      priority={priority}
    />
  ) : (
    <StaticProjectOverview project={project} bare={bare} />
  );
}
export function ProjectEvidenceLinks({ project }: { project: Project }) {
  return (
    <div className="project-evidence-links">
      {project.repositoryUrl && (
        <ExternalLink url={project.repositoryUrl}>
          Repository for {project.title}
        </ExternalLink>
      )}
      {project.liveUrl && (
        <ExternalLink url={project.liveUrl}>
          Demo of {project.title}
        </ExternalLink>
      )}
    </div>
  );
}
/** An open, unframed artifact plate: artwork first, then the record. */
export function WorkshopProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="workshop-project-card"
      data-project={project.slug}
      data-motion-slot="workshop-portal"
    >
      <div className="workshop-project-visual">
        <ProjectVisual project={project} bare />
      </div>
      <div className="workshop-project-description">
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
        <a className="text-link" href={href(projectPath(project))}>
          Read {project.title} case study{"\u00a0"}<span aria-hidden="true">→</span>
        </a>
        <ProjectEvidenceLinks project={project} />
      </div>
    </article>
  );
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * The Workshop collection as an index of artifacts. Hover or focus on an entry
 * brings its illustration into the preview plate; the plate is decorative, and
 * every entry carries its own text and canonical link.
 */
export function ArcaneIndex({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(projects[0]?.slug);
  const active = projects.some((project) => project.slug === selected)
    ? selected
    : projects[0]?.slug;
  return (
    <div className="arcane-index">
      <ol className="arcane-index-list">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className={project.slug === active ? "is-active" : undefined}
            data-project={project.slug}
            data-motion-slot="arcane-entry"
            onPointerEnter={() => setSelected(project.slug)}
            onFocus={() => setSelected(project.slug)}
          >
            <span className="arcane-index-numeral" aria-hidden="true">
              {numerals[index] ?? index + 1}
            </span>
            <div className="arcane-index-entry">
              <h3>
                <a href={href(projectPath(project))}>{project.title}</a>
              </h3>
              <p>{project.summary}</p>
              <p className="project-status-detail">{project.statusDetail}</p>
              <ul className="tag-list" aria-label="Technologies and topics">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="arcane-index-meta">
              <StatusIndicator status={project.status} />
              <span className="caption">
                Evidence basis: {project.verification.replaceAll("-", " ")}
              </span>
              <a className="text-link" href={href(projectPath(project))}>
                Read {project.title} case study{"\u00a0"}
                <span aria-hidden="true">→</span>
              </a>
              <ProjectEvidenceLinks project={project} />
            </div>
          </li>
        ))}
      </ol>
      <div className="arcane-index-preview" aria-hidden="true">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="arcane-index-plate"
            data-active={project.slug === active}
          >
            <ProjectVisual project={project} bare />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { filterProjects, projectPath } from "../content/projects";
import type { Project, ProjectStatus } from "../content/types";
import { href } from "../routes";
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
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-meta">
        <StatusIndicator status={project.status} />
        <span>
          {project.verification === "owner-reported"
            ? "Owner-reported"
            : project.verification === "local-documentation"
              ? "Local documentation"
              : "Public source"}
        </span>
      </div>
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
      <a className="text-link" href={href(projectPath(project))}>
        Read {project.title} case study <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = [...new Set(projects.map((project) => project.category))];
  const filtered = filterProjects(projects, query, category);
  return (
    <>
      <h2>Projects</h2>
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
        <ProjectGrid projects={filtered} />
      ) : (
        <p className="empty-state">
          No projects match these filters. Try another topic or reset the
          filters.
        </p>
      )}
    </>
  );
}

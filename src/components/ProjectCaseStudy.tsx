import { projects, projectPath } from "../content/projects";
import { site } from "../content/site";
import type { Project } from "../content/types";
import { href } from "../routes";
import {
  BulletList,
  ExternalLink,
  PageHeading,
  SectionHeading,
} from "./Content";
import { ProjectGrid, StatusIndicator } from "./Projects";
import { CaseStudyMedia } from "./media/CaseStudyMedia";
import { ArchitectureDiagram } from "./media/ArchitectureDiagram";
import { ProjectArtwork } from "./visual/ProjectArtwork";
import { SystemDiagram, hasSystemDiagram } from "./visual/SystemDiagram";
import { Monogram } from "./visual/Monogram";
export function ProjectCaseStudy({
  project,
  layout = project.home === "workshop" ? "creative" : "technical",
}: {
  project: Project;
  layout?: "technical" | "creative";
}) {
  const related = projects.filter((item) =>
    project.related.includes(item.slug),
  );
  const list = (title: string, items: string[], className?: string) =>
    items.length > 0 && (
      <section className={className}>
        <SectionHeading title={title} />
        <BulletList items={items} />
      </section>
    );
  const diagramLed =
    layout === "technical" && !project.media && hasSystemDiagram(project.slug);
  return (
    <article
      className={`case-study case-study-${layout}`}
      data-case-study={project.slug}
      data-layout={layout}
    >
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href={href(`/${project.home}`)}>
          {project.home === "workshop"
            ? "The Workshop"
            : project.home === "labs"
              ? "Labs & notes"
              : "Work"}
        </a>
        <span aria-hidden="true"> / </span>
        <span>{project.title}</span>
      </nav>
      <PageHeading
        eyebrow={
          layout === "creative"
            ? "Workshop project notebook"
            : "Technical case study"
        }
        title={project.title}
        mark={
          <Monogram
            className="case-mark"
            variant={layout === "creative" ? "arcane" : "signal"}
          />
        }
      >
        <p>{project.summary}</p>
      </PageHeading>
      <div className="case-study-status">
        <StatusIndicator status={project.status} />
        <p>{project.statusDetail}</p>
        <p>
          Evidence basis: {project.verification.replaceAll("-", " ")} · Reviewed{" "}
          {site.asOf}
        </p>
      </div>
      {project.notice && (
        <aside className="notice" aria-label="Project notice">
          {project.notice}
        </aside>
      )}
      {/* One large visual opens every case study: real media first, then
          the sanitized system diagram, then the original illustration. */}
      <div className={`case-hero-visual${diagramLed ? " case-hero-diagram" : ""}`}>
        {project.media ? (
          <CaseStudyMedia key={project.slug} project={project} />
        ) : (
          <div className="case-study-media" data-motion-slot="case-study-media">
            {diagramLed ? (
              <SystemDiagram slug={project.slug} />
            ) : (
              <div className="case-study-artwork">
                <ProjectArtwork project={project} bare />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="case-lede">
        <section className="case-lede-problem">
          <SectionHeading
            title={
              layout === "creative"
                ? "Creative intent & experience"
                : "Problem & intended use"
            }
          />
          <p>{project.problem}</p>
        </section>
        <section className="case-lede-role">
          <SectionHeading title="My role & attribution" />
          <p>{project.role}</p>
        </section>
      </div>
      <div className="case-study-layout">
        <div className="case-study-body">
          {(project.architecture.length > 0 || project.media?.diagram) && (
            <section>
              <SectionHeading title="Architecture" />
              <ArchitectureDiagram
                steps={project.architecture}
                image={project.media?.diagram}
                slug={diagramLed ? undefined : project.slug}
              />
            </section>
          )}
          {list(
            layout === "creative"
              ? "Current prototype & interaction"
              : "Implementation",
            project.implemented,
          )}
          <div className="case-pair">
            {list("Engineering challenges", project.challenges)}
            {list("Security & reliability", project.safeguards)}
          </div>
          {list("Results", project.results, "case-results")}
          <div className="case-pair case-pair-boundary">
            {list("Limitations", project.limitations)}
            {list("Next steps · planned", project.planned)}
          </div>
          {list("Engineering lessons", project.lessons, "case-lessons")}
          <section>
            <SectionHeading title="Evidence" />
            {project.evidence.length ? (
              <ul className="evidence-list">
                {project.evidence.map((item) => (
                  <li key={item.url}>
                    <ExternalLink url={item.url}>{item.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                {project.verification === "local-documentation"
                  ? "Summary based on local project documentation. Raw playtest artifacts are not distributed here."
                  : "Summary based on the owner’s project account. No independently verified public artifact is linked yet."}
              </p>
            )}
          </section>
        </div>
        <aside className="case-study-aside">
          <h2>Technologies & topics</h2>
          <ul className="tag-list">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.repositoryUrl && (
            <p>
              <ExternalLink url={project.repositoryUrl}>
                View repository
              </ExternalLink>
            </p>
          )}
          <p>
            <a href={href(projectPath(project))}>Canonical case study</a>
          </p>
        </aside>
      </div>
      {related.length > 0 && (
        <section>
          <SectionHeading title="Related work" />
          <ProjectGrid projects={related} creative={layout === "creative"} />
        </section>
      )}
    </article>
  );
}

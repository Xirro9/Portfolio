import { useState } from "react";
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
export function CaseStudyMedia({ media }: { media: Project["media"] }) {
  const [failed, setFailed] = useState(false);
  if (!media) return null;
  return (
    <figure className="case-study-media">
      {failed ? (
        <p>
          Image unavailable. See the linked project evidence for the original
          capture.
        </p>
      ) : (
        <img
          src={`${site.base}/${media.path}`}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
export function ProjectCaseStudy({ project }: { project: Project }) {
  const related = projects.filter((item) =>
    project.related.includes(item.slug),
  );
  const sections = [
    { title: "Implementation", items: project.implemented },
    { title: "Engineering challenges", items: project.challenges },
    { title: "Security & reliability", items: project.safeguards },
    { title: "Results", items: project.results },
    { title: "Limitations", items: project.limitations },
    { title: "Next steps · planned", items: project.planned },
    { title: "Engineering lessons", items: project.lessons },
  ];
  return (
    <>
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
      <PageHeading eyebrow="Technical case study" title={project.title}>
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
      <div className="case-study-layout">
        <div className="case-study-body">
          <section>
            <SectionHeading title="Problem & intended use" />
            <p>{project.problem}</p>
          </section>
          <section>
            <SectionHeading title="My role & attribution" />
            <p>{project.role}</p>
          </section>
          {project.architecture.length > 0 && (
            <section>
              <SectionHeading title="Architecture" />
              <ol
                className="architecture-flow"
                aria-label="High-level component flow"
              >
                {project.architecture.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="caption">
                Sanitized component overview; no infrastructure connection
                details.
              </p>
            </section>
          )}
          <CaseStudyMedia key={project.slug} media={project.media} />
          {sections
            .filter((section) => section.items.length)
            .map((section) => (
              <section key={section.title}>
                <SectionHeading title={section.title} />
                <BulletList items={section.items} />
              </section>
            ))}
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
          <ProjectGrid projects={related} />
        </section>
      )}
    </>
  );
}

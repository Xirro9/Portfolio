import { projects, projectPath } from "../content/projects";
import { notes, publications } from "../content/site";
import { href } from "../routes";
import { ExternalLink, SectionHeading } from "./Content";
import { StatusIndicator } from "./Projects";
import { MilestoneTimeline } from "./Timelines";

/** Contained practice beside a dated record: two densities in one section. */
export function LabsAndMilestones() {
  const labs = projects.filter((project) => project.home === "labs").slice(0, 4);
  return (
    <section className="labs-milestones" data-section="labs-milestones">
      <SectionHeading title="Labs, research & milestones">
        Contained security practice alongside a dated record of education and
        engineering progress.
      </SectionHeading>
      <div className="labs-milestones-grid">
        <div className="lab-column">
          <p className="eyebrow">Security labs & notes</p>
          <ul className="lab-list">
            {labs.map((project) => (
              <li key={project.slug}>
                <h3>
                  <a href={href(projectPath(project))}>{project.title}</a>
                </h3>
                <p>{project.summary}</p>
                <StatusIndicator status={project.status} />
              </li>
            ))}
          </ul>
          <a className="section-coda-link" href={href("/labs")}>
            All labs & engineering notes <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="milestone-column">
          <p className="eyebrow">Selected milestones</p>
          <MilestoneTimeline bare />
        </div>
      </div>
    </section>
  );
}
export function CaseStudyIndex() {
  return (
    <section data-section="technical-case-studies">
      <SectionHeading title="Inside the technical case studies">
        Follow the boundary between a working implementation, a documented
        outcome, and the next engineering question.
      </SectionHeading>
      <ol className="case-study-index">
        {projects
          .filter(
            (project) =>
              project.home === "work" && project.category !== "foundational",
          )
          .map((project) => (
            <li key={project.slug}>
              <h3>
                <a href={href(projectPath(project))}>{project.title}</a>
              </h3>
              <p>{project.challenges[0] ?? project.problem}</p>
              <p className="caption">{project.statusDetail}</p>
            </li>
          ))}
      </ol>
    </section>
  );
}
export function EngineeringNotes() {
  if (!notes.length) return null;
  return (
    <section data-section="engineering-notes">
      <SectionHeading title="Engineering notes" />
      <div className="notes-list">
        {notes.map((note) => (
          <article key={note.title}>
            <p className="eyebrow">{note.status}</p>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <a href={href(`/work/${note.projectSlug}`)}>
              Related infrastructure case study
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FeaturedWriting() {
  if (!publications.length) return null;
  return (
    <section data-section="technical-writing">
      <SectionHeading title="Technical writing & research" />
      <ul>
        {publications.map((publication) => (
          <li key={publication.evidence.url}>
            <ExternalLink url={publication.evidence.url}>
              {publication.title}
            </ExternalLink>
            <p>{publication.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

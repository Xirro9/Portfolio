import { projects, projectPath } from "../content/projects";
import { notes, publications } from "../content/site";
import { href } from "../routes";
import { ExternalLink, SectionHeading } from "./Content";

export function ProfessionalIntroduction() {
  return (
    <section
      className="professional-introduction"
      aria-labelledby="professional-introduction-heading"
      data-section="credentials"
    >
      <h2 id="professional-introduction-heading">
        Mahin Moon · cybersecurity & practical engineering
      </h2>
      <p>
        I’m a Security Compliance Analyst at the Oklahoma Cyber Innovation
        Institute, a cybersecurity graduate, and a current graduate student at
        The University of Tulsa.
      </p>
      <a href="#education">
        Education highlights <span aria-hidden="true">↓</span>
      </a>
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

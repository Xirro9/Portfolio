import { projects } from "../content/projects";
import { notes, site } from "../content/site";
import { href } from "../routes";
import {
  ContactPanel,
  PageHeading,
  SectionHeading,
  TechnicalSkills,
} from "../components/Content";
import { ProjectExplorer, ProjectGrid } from "../components/Projects";
import {
  Activities,
  EducationSection,
  ExperienceTimeline,
  MilestoneTimeline,
} from "../components/Timelines";
export function HomePage() {
  return (
    <>
      <PageHeading
        eyebrow="Mahin Moon · Cybersecurity & engineering"
        title="Security requirements. Working systems. Clear evidence."
      >
        <p>{site.positioning}</p>
        <p>
          I’m a Security Compliance Analyst at the Oklahoma Cyber Innovation
          Institute, a cybersecurity graduate, and a current graduate student at
          The University of Tulsa.
        </p>
        <div className="actions">
          <a className="button-link" href={href("/work")}>
            Explore professional work
          </a>
          <a href={href("/experience")}>Experience & education</a>
        </div>
      </PageHeading>
      <section>
        <SectionHeading title="Featured professional work">
          Local-first security software and observability, with implementation
          status and supporting sources.
        </SectionHeading>
        <ProjectGrid
          projects={projects.filter((project) => project.featured)}
        />
      </section>
      <ExperienceTimeline currentOnly />
      <TechnicalSkills />
      <section>
        <SectionHeading title="Systems beyond the interface" />
        <article className="feature-note">
          <p className="eyebrow">Applied AI · Experimental</p>
          <h3>Local AI workbench</h3>
          <p>
            Model serving, specialized agents, and resource boundaries explored
            as a practical development environment. Performance claims await
            repeatable measurements.
          </p>
          <a href={href("/work/local-ai-workbench")}>
            Read the infrastructure case study
          </a>
        </article>
      </section>
      <EducationSection />
      <MilestoneTimeline />
      <aside className="workshop-invitation">
        <h2>A different kind of engineering practice</h2>
        <p>
          Games, programming adventures, and experiments have their own space.
        </p>
        <a href={href("/workshop")}>Visit The Workshop</a>
      </aside>
      <ContactPanel />
    </>
  );
}
export function WorkPage() {
  return (
    <>
      <PageHeading eyebrow="Professional portfolio" title="Work">
        <p>
          Cybersecurity applications, observability, and local infrastructure.
          Each case study distinguishes current behavior from future work.
        </p>
      </PageHeading>
      <ProjectExplorer
        projects={projects.filter((project) => project.home === "work")}
      />
      <section>
        <SectionHeading title="Creative work with an engineering spotlight">
          These projects retain one canonical home in The Workshop.
        </SectionHeading>
        <ProjectGrid
          projects={projects.filter((project) => project.professionalSpotlight)}
        />
      </section>
    </>
  );
}
export function LabsPage() {
  return (
    <>
      <PageHeading
        eyebrow="Practice & investigation"
        title="Labs & engineering notes"
      >
        <p>
          Contained security environments, earlier infrastructure work, and
          small observations from ongoing experimentation.
        </p>
      </PageHeading>
      <ProjectExplorer
        projects={projects.filter((project) => project.home === "labs")}
      />
      <section>
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
    </>
  );
}
export function WorkshopPage() {
  return (
    <>
      <PageHeading
        eyebrow="Creative projects & experiments"
        title="The Workshop"
      >
        <p>
          A space for coding adventures, local game nights, and recreational
          systems. Prototypes and concepts carry explicit evidence labels.
        </p>
      </PageHeading>
      <ProjectExplorer
        projects={projects.filter((project) => project.home === "workshop")}
      />
    </>
  );
}
export function ExperiencePage() {
  return (
    <>
      <PageHeading
        eyebrow="Professional background"
        title="Experience & education"
      >
        <p>
          Security assessment work informed by systems education and continued
          hands-on engineering.
        </p>
      </PageHeading>
      <ExperienceTimeline />
      <EducationSection />
      <MilestoneTimeline />
      <Activities />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <PageHeading eyebrow="Background & approach" title="About Mahin">
        <p>
          I work at the intersection of cybersecurity and practical engineering.
        </p>
      </PageHeading>
      <section className="reading-width">
        <SectionHeading title="Requirements have to meet reality" />
        <p>
          My professional work connects control requirements with documentation,
          architecture, and technical evidence. I care about explaining what a
          system does, what supports a conclusion, and where uncertainty
          remains.
        </p>
        <p>
          I completed my undergraduate cybersecurity degree in May 2026 and
          began graduate study in Fall 2026. Alongside that work, I build and
          experiment with local-first software, agent observability, and
          security labs.
        </p>
        <p>
          AI coding tools are part of my development process. Project write-ups
          distinguish system behavior from individual authorship and avoid
          treating generated implementation as proof of a tested outcome.
        </p>
        <p>
          The Workshop is where I explore interactive learning, games, and
          unusual interfaces. Those projects can have serious engineering
          questions even when the setting is playful.
        </p>
      </section>
      <TechnicalSkills />
      <ContactPanel />
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <PageHeading eyebrow="Contact" title="Start a conversation">
        <p>
          For cybersecurity work, engineering projects, or a current résumé.
        </p>
      </PageHeading>
      <ContactPanel />
    </>
  );
}
export function NotFoundPage() {
  return (
    <>
      <PageHeading eyebrow="404" title="Page not found">
        <p>This address does not match a published page or project.</p>
      </PageHeading>
      <p>
        <a href={href("/")}>Return home</a> or{" "}
        <a href={href("/work")}>browse professional work</a>.
      </p>
    </>
  );
}

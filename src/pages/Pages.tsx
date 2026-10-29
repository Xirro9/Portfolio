import { projects } from "../content/projects";
import { fieldNotes } from "../content/fieldNotes";
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
  ExperienceTimeline,
  MilestoneTimeline,
} from "../components/Timelines";
import { EducationSection } from "../components/EducationSection";
import { ProfessionalHero } from "../components/heroes/ProfessionalHero";
import { WorkshopHero } from "../components/heroes/WorkshopHero";
import { ArchiveHero } from "../components/heroes/ArchiveHero";
import {
  FeaturedProjectShowcase,
  WorkbenchExhibit,
} from "../components/FeaturedProjectShowcase";
import { CareerPath } from "../components/visual/SignalRail";
import { Monogram } from "../components/visual/Monogram";
import {
  CaseStudyIndex,
  EngineeringNotes,
  FeaturedWriting,
  LabsAndMilestones,
} from "../components/EngineeringSections";
export function HomePage() {
  return (
    <>
      <ProfessionalHero />
      <CareerPath>
        <ExperienceTimeline currentOnly />
        <EducationSection />
      </CareerPath>
      <section data-section="featured-professional-work">
        <SectionHeading title="Selected projects">
          Local-first security software and observability, with implementation
          status and supporting sources.
        </SectionHeading>
        <div className="featured-project-list">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <FeaturedProjectShowcase
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
        </div>
        <WorkbenchExhibit headingLevel={3} />
      </section>
      <TechnicalSkills />
      <LabsAndMilestones />
      <FeaturedWriting />
      <aside className="workshop-invitation">
        <Monogram variant="arcane" className="invitation-mark" />
        <div className="invitation-copy">
          <p className="eyebrow">Off the clock</p>
          <h2>A different kind of engineering practice</h2>
          <p>
            Games, programming adventures, and experiments have their own space.
          </p>
          <a href={href("/workshop")}>
            Visit The Workshop <span aria-hidden="true">→</span>
          </a>
        </div>
      </aside>
      <ContactPanel />
    </>
  );
}
export function WorkPage() {
  return (
    <>
      <ArchiveHero />
      <section id="featured-engineering" data-section="featured-engineering">
        <SectionHeading title="Featured engineering projects">
          Start with the system, then inspect the evidence.
        </SectionHeading>
        <div className="featured-project-list">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <FeaturedProjectShowcase
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
        </div>
      </section>
      <WorkbenchExhibit />
      <section id="project-collection" data-section="project-collection">
        <ProjectExplorer
          title="Categorized project collection"
          projects={projects.filter((project) => project.home === "work")}
        />
      </section>
      <CaseStudyIndex />
      <section>
        <SectionHeading title="Creative work with an engineering spotlight">
          These projects retain one canonical home in The Workshop.
        </SectionHeading>
        <ProjectGrid
          projects={projects.filter((project) => project.professionalSpotlight)}
        />
      </section>
      <section id="labs-foundations" data-section="labs-foundations">
        <SectionHeading title="Security labs & foundational work">
          Contained validation, security scripting, and earlier systems
          programming.
        </SectionHeading>
        <ProjectGrid
          projects={projects.filter((project) =>
            [
              "purple-team-lab",
              "security-scripting",
              "memory-allocator",
            ].includes(project.slug),
          )}
        />
        <p className="section-coda">
          <a href={href("/labs")}>
            Explore all security labs & notes <span aria-hidden="true">→</span>
          </a>
        </p>
      </section>
      <EngineeringNotes />
      <ContactPanel />
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
      <section className="labs-feature" aria-labelledby="labs-feature-heading">
        <p className="eyebrow">Field notes · {fieldNotes[0].period}</p>
        <h2 id="labs-feature-heading">
          <a href={href(fieldNotes[0].path)}>{fieldNotes[0].title}</a>
        </h2>
        <p className="labs-feature-dek">{fieldNotes[0].dek}</p>
        <ol className="labs-feature-points">
          {fieldNotes[0].rules.slice(1, 4).map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
        <a className="button-link" href={href(fieldNotes[0].path)}>
          Read the field notes <span aria-hidden="true">→</span>
        </a>
      </section>
      <ProjectExplorer
        projects={projects.filter((project) => project.home === "labs")}
      />
      <EngineeringNotes />
    </>
  );
}
export function WorkshopPage() {
  return (
    <>
      <WorkshopHero />
      <section
        className="workshop-introduction"
        data-section="creative-introduction"
      >
        <SectionHeading title="Built for curiosity">
          This is where I turn programming questions into little worlds and
          shared experiences.
        </SectionHeading>
        <p>
          I enjoy the point where an interface becomes something you can play
          with: a quest that responds to code, a phone that becomes a private
          hand, or a simulation with rules worth testing. The creative setting
          stays playful; the implementation claims stay precise.
        </p>
      </section>
      <section data-section="featured-creative">
        <SectionHeading title="Featured creative projects">
          Two artifacts from the bench, each with its prototype status in plain
          view.
        </SectionHeading>
        <div className="featured-project-list">
          {projects
            .filter((project) => project.workshopFeatured)
            .map((project, index) => (
              <FeaturedProjectShowcase
                key={project.slug}
                project={project}
                index={index}
                creative
              />
            ))}
        </div>
      </section>
      <section id="creative-gallery" data-section="creative-gallery">
        <ProjectExplorer
          title="The artifact index"
          creative
          projects={projects.filter((project) => project.home === "workshop")}
        />
      </section>
      <section data-section="smaller-experiments">
        <SectionHeading title="Smaller experiments & prototypes">
          Unfinished ideas belong here too, with their current scope clearly
          stated.
        </SectionHeading>
        <ProjectGrid
          creative
          projects={projects.filter(
            (project) =>
              project.home === "workshop" &&
              !project.workshopFeatured &&
              (project.status === "prototype" || project.status === "concept"),
          )}
        />
      </section>
      <aside className="workshop-return">
        <h2>Back to professional ground</h2>
        <p>
          Explore the cybersecurity, local-first software, and infrastructure
          work behind the experiments.
        </p>
        <div className="actions">
          <a className="button-link" href={href("/work")}>
            Visit the Engineering Archive
          </a>
          <a href={href("/")}>Return to the Observatory</a>
        </div>
      </aside>
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
      <CareerPath>
        <ExperienceTimeline />
        <EducationSection />
      </CareerPath>
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

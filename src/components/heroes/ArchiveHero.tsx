import { PageHeading } from "../Content";

const contents = [
  ["01", "ControlGauge", "#exhibit-controlgauge"],
  ["02", "AgentHQ", "#exhibit-agenthq"],
  ["03", "Local AI workbench", "#workbench-exhibit"],
  ["04", "Project collection", "#project-collection"],
  ["05", "Labs & foundations", "#labs-foundations"],
] as const;

export function ArchiveHero() {
  return (
    <div
      className="archive-hero"
      data-hero="engineering-archive"
      data-motion-slot="archive-introduction"
    >
      <PageHeading eyebrow="The Engineering Archive" title="Work">
        <p>
          Cybersecurity applications, observability, and local infrastructure.
          Explore implementation evidence, architectural decisions, and what
          remains to be built.
        </p>
      </PageHeading>
      <nav className="archive-contents" aria-label="Exhibition contents">
        <ol>
          {contents.map(([number, label, target]) => (
            <li key={label}>
              <a href={target}>
                <span aria-hidden="true">{number}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

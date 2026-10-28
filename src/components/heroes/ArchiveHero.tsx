import { PageHeading } from "../Content";
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
    </div>
  );
}

import { activities, experiences, milestones } from "../content/site";
import { BulletList, ExternalLink, SectionHeading } from "./Content";
export function ExperienceTimeline({
  currentOnly = false,
}: {
  currentOnly?: boolean;
}) {
  return (
    <section>
      <SectionHeading
        title={
          currentOnly ? "Current professional work" : "Professional experience"
        }
      />
      <ol className="timeline">
        {(currentOnly ? experiences.slice(0, 1) : experiences).map((item) => (
          <li key={item.role}>
            <p className="eyebrow">{item.period}</p>
            <h3>{item.role}</h3>
            <p className="organization">{item.organization}</p>
            <p>{item.summary}</p>
            <details>
              <summary>Responsibilities and approach</summary>
              <BulletList items={item.details} />
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function MilestoneTimeline() {
  return (
    <section>
      <SectionHeading title="Selected milestones">
        A progression through education and documented engineering work in 2026.
      </SectionHeading>
      <ol className="timeline compact">
        {milestones.map((item) => (
          <li key={item.title}>
            <p className="eyebrow">
              {item.date} · {item.category}
            </p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.evidence && (
              <ExternalLink url={item.evidence.url}>
                {item.evidence.label}
              </ExternalLink>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
export function Activities() {
  return (
    <section>
      <SectionHeading title="Earlier activities & leadership">
        Historical participation retained from the original portfolio. No
        rankings or awards are claimed.
      </SectionHeading>
      <ul className="activity-list">
        {activities.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

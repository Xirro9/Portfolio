import { activities, experiences, milestones } from "../content/site";
import { BulletList, ExternalLink, SectionHeading } from "./Content";
export function ExperienceTimeline({
  currentOnly = false,
}: {
  currentOnly?: boolean;
}) {
  return (
    <section className="experience-section" data-section="experience">
      <SectionHeading
        title={
          currentOnly ? "Current professional work" : "Professional experience"
        }
      />
      <ol className="role-list">
        {(currentOnly ? experiences.slice(0, 1) : experiences).map((item) => (
          <li key={item.role} className="role-entry">
            <div className="role-heading">
              <p className="role-period">{item.period}</p>
              <h3 data-rail-node>{item.role}</h3>
              <p className="organization">{item.organization}</p>
            </div>
            <div className="role-body">
              <p className="role-summary">{item.summary}</p>
              {currentOnly ? (
                <BulletList items={item.details} />
              ) : (
                <details>
                  <summary>Responsibilities and approach</summary>
                  <BulletList items={item.details} />
                </details>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function MilestoneTimeline({ bare = false }: { bare?: boolean }) {
  const list = (
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
  );
  return bare ? (
    list
  ) : (
    <section>
      <SectionHeading title="Selected milestones">
        A progression through education and documented engineering work in 2026.
      </SectionHeading>
      {list}
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

import type { ReactNode } from "react";
import { site, skills } from "../content/site";
export function PageHeading({
  eyebrow,
  title,
  children,
  mark,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  mark?: ReactNode;
}) {
  return (
    <header className="page-heading">
      {mark}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="lede">{children}</div>}
    </header>
  );
}
export function SectionHeading({
  title,
  children,
  id,
}: {
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function ExternalLink({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  if (!/^https:\/\//.test(url) && !/^mailto:[^\s]+$/.test(url))
    return <span>{children}</span>;
  return <a href={url}>{children}</a>;
}
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="prose-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export function ContactPanel() {
  return (
    <section className="contact-panel">
      <SectionHeading title="Let’s talk about the work">
        Security assessments, local-first software, and engineering grounded in
        evidence.
      </SectionHeading>
      <ul className="contact-links">
        {site.contacts.map((contact) => (
          <li key={contact.label}>
            <ExternalLink url={contact.url}>
              {contact.label}
              <span>{contact.detail}</span>
            </ExternalLink>
          </li>
        ))}
      </ul>
      <p>
        For a current résumé,{" "}
        <ExternalLink url={site.contacts[0].url}>
          contact me by email
        </ExternalLink>
        .
      </p>
    </section>
  );
}
export function TechnicalSkills() {
  return (
    <section>
      <SectionHeading title="Technical expertise">
        Experience is described by context, without numerical proficiency
        scores.
      </SectionHeading>
      <div className="discipline-grid">
        {skills.map((group) => (
          <article key={group.title}>
            <p className="eyebrow">{group.context}</p>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <BulletList items={group.skills} />
          </article>
        ))}
      </div>
    </section>
  );
}

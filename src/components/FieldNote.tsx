import { useState } from "react";
import { projects, projectPath } from "../content/projects";
import type { ClaimBasis, FieldNote } from "../content/types";
import { href } from "../routes";
import { PageHeading, SectionHeading } from "./Content";
import { Monogram } from "./visual/Monogram";
import { MemoryBudget } from "./visual/MemoryBudget";
import { SystemDiagram } from "./visual/SystemDiagram";

const basisLabels: Record<ClaimBasis, { label: string; meaning: string }> = {
  observed: {
    label: "Observed",
    meaning: "Seen in an explicit test, log or result.",
  },
  reported: {
    label: "Reported",
    meaning: "Described in a setup report or run output.",
  },
  explored: {
    label: "Explored",
    meaning: "Considered or researched; not deployed.",
  },
};

function Basis({ basis }: { basis: ClaimBasis }) {
  return (
    <span className={`claim-basis claim-${basis}`}>
      {basisLabels[basis].label}
    </span>
  );
}

/** Copies the sanitized compact brief; the brief itself is always visible. */
function CopyBrief({ text }: { text: string }) {
  const [state, setState] = useState("");
  return (
    <div className="brief-actions">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("Brief copied to the clipboard.");
          } catch {
            setState("Copy unavailable here; select the text instead.");
          }
        }}
      >
        Copy the brief
      </button>
      <p className="caption" aria-live="polite">
        {state}
      </p>
    </div>
  );
}

export function FieldNotePage({ note }: { note: FieldNote }) {
  const related = projects.filter((project) =>
    note.related.includes(project.slug),
  );
  return (
    <article className="field-note" data-field-note={note.slug}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href={href("/labs")}>Labs & notes</a>
        <span aria-hidden="true"> / </span>
        <span>Field notes</span>
      </nav>
      <PageHeading
        eyebrow={`Field notes · ${note.period}`}
        title={note.title}
        mark={<Monogram className="case-mark" />}
      >
        <p>{note.dek}</p>
      </PageHeading>

      <dl className="note-meta">
        <div>
          <dt>Basis</dt>
          <dd>{note.basis}</dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd>Sanitized: no addresses, machine details or throughput figures</dd>
        </div>
        <div>
          <dt>Read</dt>
          <dd>
            <a href="#brief">The two-minute brief</a> or the full notes below
          </dd>
        </div>
      </dl>

      <section className="note-legend" aria-labelledby="legend-heading">
        <h2 id="legend-heading" className="visually-hidden">
          How claims are labelled
        </h2>
        <ul>
          {(Object.keys(basisLabels) as ClaimBasis[]).map((basis) => (
            <li key={basis}>
              <Basis basis={basis} />
              <span>{basisLabels[basis].meaning}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="note-question" aria-labelledby="question-heading">
        <h2 id="question-heading" className="visually-hidden">
          The question
        </h2>
        <p className="question-before">
          <span className="eyebrow">The question at the start</span>
          <s>{note.question.before}</s>
        </p>
        <p className="question-after">
          <span className="eyebrow">The question three weeks later</span>
          {note.question.after}
        </p>
      </section>

      <section id="brief" className="note-brief" aria-labelledby="brief-heading">
        <div className="brief-intro">
          <SectionHeading id="brief-heading" title="The compact brief">
            The same notes condensed for a coding agent or a quick read. Paste
            it at the start of a session instead of the full history.
          </SectionHeading>
          <CopyBrief text={note.brief} />
        </div>
        <pre className="brief-text" tabIndex={0}>
          {note.brief}
        </pre>
      </section>

      <section aria-labelledby="environments-heading">
        <SectionHeading id="environments-heading" title="Three environments, three jobs" />
        <ol className="note-environments">
          {note.environments.map((item) => (
            <li key={item.title}>
              <p className="eyebrow">{item.when}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Basis basis={item.basis} />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="timeline-heading" className="note-timeline-section">
        <SectionHeading id="timeline-heading" title="Three weeks, in order" />
        <ol className="note-timeline">
          {note.timeline.map((item) => (
            <li key={item.title}>
              <p className="note-when">{item.when}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Basis basis={item.basis} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="note-budget" aria-labelledby="budget-heading">
        <SectionHeading id="budget-heading" title="Configured context is not usable context">
          Weights, KV cache, harness overhead and concurrency are separate
          budgets. Try the controls: the same window that fits with one slot
          overflows with four.
        </SectionHeading>
        <MemoryBudget />
      </section>

      <section className="note-harness" aria-labelledby="harness-heading">
        <SectionHeading id="harness-heading" title="The harness">
          Hermes manages; OpenCode executes; six roles share one model server.
          More agents did not mean more throughput.
        </SectionHeading>
        <SystemDiagram slug="agent-harness" />
      </section>

      <section className="note-incidents" aria-labelledby="incidents-heading">
        <SectionHeading id="incidents-heading" title="Failure ledger">
          What each symptom turned out to be, and the check that tells you
          next time.
        </SectionHeading>
        <ol className="incident-list">
          {note.incidents.map((item, index) => (
            <li key={item.symptom}>
              <span className="incident-id" aria-hidden="true">
                {`F-${String(index + 1).padStart(2, "0")}`}
              </span>
              <h3>{item.symptom}</h3>
              <p className="incident-cause">{item.cause}</p>
              <p className="incident-check">
                <span>Check</span> {item.check}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="note-rules" aria-labelledby="rules-heading">
        <SectionHeading id="rules-heading" title="Decision rules" />
        <ol className="rule-list">
          {note.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section className="note-confidence" aria-labelledby="confidence-heading">
        <SectionHeading id="confidence-heading" title="What this does and doesn’t show" />
        <div className="confidence-grid">
          <div>
            <h3>Established</h3>
            <p className="caption">For the reported state at the time</p>
            <ul>
              {note.confidence.established.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Needs a reproducible benchmark</h3>
            <p className="caption">Reported, not controlled</p>
            <ul>
              {note.confidence.unproven.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Not established</h3>
            <p className="caption">Do not cite as done</p>
            <ul>
              {note.confidence.notEstablished.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="note-next" aria-labelledby="next-heading">
        <SectionHeading id="next-heading" title="Next experiments">
          Planned work, not results.
        </SectionHeading>
        <ol className="rule-list rule-list-planned">
          {note.experiments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="note-related" aria-labelledby="related-heading">
        <SectionHeading id="related-heading" title="Related work" />
        <ul>
          {related.map((project) => (
            <li key={project.slug}>
              <a href={href(projectPath(project))}>{project.title}</a>
              <span>{project.statusDetail}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

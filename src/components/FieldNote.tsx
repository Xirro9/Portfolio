import { useState } from "react";
import { projects, projectPath } from "../content/projects";
import type { ClaimBasis, FieldNote } from "../content/types";
import { href } from "../routes";
import { Monogram } from "./visual/Monogram";
import { MemoryBudget } from "./visual/MemoryBudget";
import { SystemDiagram } from "./visual/SystemDiagram";

const basisLabels: Record<ClaimBasis, { label: string; meaning: string }> = {
  observed: {
    label: "Observed",
    meaning: "seen in an explicit test, log or result",
  },
  reported: {
    label: "Reported",
    meaning: "described in a setup report or run output",
  },
  explored: {
    label: "Explored",
    meaning: "considered or researched, not deployed",
  },
};

function Basis({ basis }: { basis: ClaimBasis }) {
  return (
    <span className={`claim-basis claim-${basis}`}>
      {basisLabels[basis].label}
    </span>
  );
}

/** Copies the sanitized compact brief; its full text is in the disclosure. */
function CopyBrief({ text }: { text: string }) {
  const [state, setState] = useState("");
  return (
    <>
      <button
        type="button"
        className="brief-copy"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("Brief copied to the clipboard.");
          } catch {
            setState("Copy unavailable here; open the brief and select it.");
          }
        }}
      >
        Copy the brief
      </button>
      <p className="brief-status caption" aria-live="polite">
        {state}
      </p>
    </>
  );
}

/**
 * A field note set as a journal article: one reading measure, with figures
 * breaking out to wide and full widths. Section order follows the story.
 */
export function FieldNotePage({ note }: { note: FieldNote }) {
  const related = projects.filter((project) =>
    note.related.includes(project.slug),
  );
  const lines = note.brief.split("\n").length;
  return (
    <article className="field-note article" data-field-note={note.slug}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href={href("/labs")}>Labs & notes</a>
        <span aria-hidden="true"> / </span>
        <span>Field notes</span>
      </nav>

      <header className="article-head">
        <Monogram className="case-mark" />
        <p className="eyebrow">Field notes</p>
        <h1>{note.title}</h1>
        <p className="article-dek">{note.dek}</p>
        <p className="article-byline">
          <span>Mahin Moon</span>
          <span>{note.period}</span>
          <span>{note.basis}</span>
          <span>Sanitized: no addresses, machine details or throughput figures</span>
        </p>
      </header>

      <section className="article-question" aria-labelledby="question-heading">
        <h2 id="question-heading" className="visually-hidden">
          How the question changed
        </h2>
        <p className="question-before">
          <span className="question-date">October 6</span>
          <s>{note.question.before}</s>
        </p>
        <span className="question-line" aria-hidden="true" />
        <p className="question-after">
          <span className="question-date">October 28</span>
          {note.question.after}
        </p>
      </section>

      <details className="article-brief" id="brief">
        <summary>
          <span className="eyebrow">Reference · {lines} lines</span>
          <span className="brief-title">The compact brief</span>
          <span className="brief-summary">
            The same notes condensed for a coding agent or a quick read. Expand
            to read; copy to paste at the start of a session.
          </span>
        </summary>
        <pre className="brief-text" tabIndex={0}>
          {note.brief}
        </pre>
      </details>
      <div className="brief-tools">
        <CopyBrief text={note.brief} />
      </div>

      <section className="article-section" aria-labelledby="environments-heading">
        <h2 id="environments-heading">Three environments, three jobs</h2>
        <p className="article-lead">
          The work ran across three setups. Each answered a different
          question, and each claim below keeps the label it had in my notes:{" "}
          {(Object.keys(basisLabels) as ClaimBasis[]).map((basis, index) => (
            <span key={basis} className="inline-basis">
              <Basis basis={basis} /> {basisLabels[basis].meaning}
              {index < 2 ? "; " : "."}
            </span>
          ))}
        </p>
        <dl className="article-cast">
          {note.environments.map((item) => (
            <div key={item.title}>
              <dt>
                {item.title}
                <span>{item.when}</span>
              </dt>
              <dd>
                {item.body} <Basis basis={item.basis} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="article-section" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">Three weeks, in order</h2>
        <ol className="note-timeline">
          {note.timeline.map((item) => (
            <li key={item.title}>
              <p className="note-when">{item.when}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Basis basis={item.basis} />
            </li>
          ))}
        </ol>
      </section>

      <blockquote className="article-pull">
        <p>A configured context window is not usable capacity.</p>
      </blockquote>

      <section className="article-section" aria-labelledby="budget-heading">
        <h2 id="budget-heading">Four budgets, not one</h2>
        <p>
          Weights, KV cache, harness overhead and concurrency are separate
          budgets. The server will happily accept a context size that only fits
          while one request is active. Try the controls: the same window that
          fits with one slot overflows with four.
        </p>
      </section>
      <div className="article-figure figure-wide">
        <p className="figure-label">Fig. 1</p>
        <MemoryBudget />
      </div>

      <section className="article-section" aria-labelledby="harness-heading">
        <h2 id="harness-heading">The harness</h2>
        <p>
          Hermes manages the conversation, memory and routing; OpenCode
          executes against the repository; six roles share one model server.
          With a single inference slot, more agents did not mean more
          throughput. They queue.
        </p>
      </section>
      <div className="article-figure figure-full">
        <p className="figure-label">Fig. 2</p>
        <SystemDiagram slug="agent-harness" />
      </div>

      <section
        className="article-section article-table-section"
        aria-labelledby="incidents-heading"
      >
        <h2 id="incidents-heading">Failure ledger</h2>
        <p>
          What each symptom turned out to be, and the check that tells you
          next time.
        </p>
      </section>
      <div className="article-figure figure-wide">
        <table className="incident-table">
          <caption>
            <span className="figure-label">Table 1</span> Symptoms, causes and
            checks
          </caption>
          <thead>
            <tr>
              <th scope="col">Symptom</th>
              <th scope="col">What it was</th>
              <th scope="col">The check</th>
            </tr>
          </thead>
          <tbody>
            {note.incidents.map((item) => (
              <tr key={item.symptom}>
                <th scope="row">{item.symptom}</th>
                <td>{item.cause}</td>
                <td>{item.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="article-section" aria-labelledby="rules-heading">
        <h2 id="rules-heading">Decision rules</h2>
        <ol className="article-rules">
          {note.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section
        className="article-section figure-wide article-confidence"
        aria-labelledby="confidence-heading"
      >
        <h2 id="confidence-heading">What this does and doesn’t show</h2>
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

      <footer className="article-end figure-wide">
        <section aria-labelledby="next-heading">
          <h2 id="next-heading">Next experiments</h2>
          <p className="caption">Planned work, not results.</p>
          <ol>
            {note.experiments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
        <section aria-labelledby="related-heading">
          <h2 id="related-heading">Related work</h2>
          <ul>
            {related.map((project) => (
              <li key={project.slug}>
                <a href={href(projectPath(project))}>{project.title}</a>
                <span>{project.statusDetail}</span>
              </li>
            ))}
          </ul>
        </section>
      </footer>
    </article>
  );
}

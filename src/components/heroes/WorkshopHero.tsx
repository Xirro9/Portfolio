import { href } from "../../routes";
import { ArcaneWorkbench } from "../visual/ArcaneWorkbench";
import { Insignia } from "../visual/Insignia";

/** A separate creative composition, not a reskinned professional hero. */
export function WorkshopHero() {
  return (
    <header className="workshop-hero" data-hero="workshop">
      <div
        className="workshop-hero-introduction"
        data-motion-slot="workshop-title"
      >
        <p className="eyebrow workshop-kicker">
          <Insignia variant="workshop" className="hero-kicker-mark" />
          The Technomancer’s Realm
        </p>
        <h1 data-motion-slot="workshop-heading">
          <span className="workshop-heading-small" data-motion-part="heading-line">
            The
          </span>{" "}
          <span className="workshop-heading-large" data-motion-part="heading-line">
            Workshop
          </span>
        </h1>
        <p className="hero-description">
          Code, curiosity, and a little make-believe.
        </p>
        <p>
          Programming adventures, shared game nights, and experiments built to
          be explored.
        </p>
        <a className="button-link button-spell" href="#creative-gallery">
          Explore the projects
        </a>
      </div>
      <figure
        className="workshop-scene"
        aria-label="Creative development approach"
        data-scene="arcane-workbench"
      >
        <ArcaneWorkbench />
        <div className="workshop-static-scene" data-scene-fallback>
          <p className="eyebrow">From idea to interaction</p>
          <ul>
            <li>
              <span>Imagine</span>
              <p>A guild that teaches code.</p>
            </li>
            <li>
              <span>Build</span>
              <p>A shared table with private phone controllers.</p>
            </li>
            <li>
              <span>Play & refine</span>
              <p>Try the interaction, then test its boundaries.</p>
            </li>
          </ul>
        </div>
        <figcaption>
          Original illustration of an arcane workbench. A creative practice,
          with prototype status and evidence kept visible.
        </figcaption>
      </figure>
      <nav
        className="workshop-hero-transitions"
        aria-label="Workshop transitions"
      >
        <a href={href("/work")}>
          Professional work <span aria-hidden="true">↗</span>
        </a>
        <a href={href("/")}>Back to the Observatory</a>
      </nav>
    </header>
  );
}

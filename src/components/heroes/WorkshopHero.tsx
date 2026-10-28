import { href } from "../../routes";

/** A separate creative composition, not a reskinned professional hero. */
export function WorkshopHero() {
  return (
    <header className="workshop-hero" data-hero="workshop">
      <div
        className="workshop-hero-introduction"
        data-motion-slot="workshop-title"
      >
        <p className="eyebrow">The Technomancer’s Realm</p>
        <h1 data-motion-slot="workshop-heading">The Workshop</h1>
        <p className="hero-description">
          Code, curiosity, and a little make-believe.
        </p>
        <p>
          Programming adventures, shared game nights, and experiments built to
          be explored.
        </p>
        <a className="button-link" href="#creative-gallery">
          Explore the projects
        </a>
      </div>
      <figure
        className="workshop-scene"
        aria-label="Creative development approach"
        data-scene="arcane-workbench"
      >
        <div
          className="hero-scene-mount"
          data-motion-slot="workshop-illustration"
          aria-hidden="true"
        />
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
          A creative practice, with prototype status and evidence kept visible.
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

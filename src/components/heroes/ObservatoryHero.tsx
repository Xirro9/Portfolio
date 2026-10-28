import { site } from "../../content/site";
import { href } from "../../routes";

/** Foreground and scene layers stay independent; neither requires animation. */
export function ObservatoryHero() {
  return (
    <header className="observatory-hero" data-hero="observatory">
      <div
        className="observatory-foreground"
        data-motion-slot="hero-foreground"
      >
        <p className="eyebrow">The Observatory · Mahin Moon</p>
        <h1 data-motion-slot="hero-heading">
          <span data-motion-part="heading-line">Security requirements.</span>{" "}
          <span data-motion-part="heading-line">Working systems.</span>{" "}
          <span data-motion-part="heading-line">Clear evidence.</span>
        </h1>
        <p className="hero-description">{site.positioning}</p>
        <div className="actions">
          <a className="button-link" href={href("/work")}>
            Explore professional work
          </a>
          <a href={href("/experience")}>Experience & education</a>
        </div>
      </div>
      <figure
        className="observatory-visual"
        aria-label="Professional approach overview"
        data-scene="celestial-engine"
      >
        <div
          className="hero-scene-mount"
          data-motion-slot="celestial-engine"
          aria-hidden="true"
        />
        <div className="observatory-static-scene" data-scene-fallback>
          <p className="eyebrow">An engineering perspective</p>
          <ol>
            <li>
              <strong>Requirements</strong>
              <span>Define what needs to be true.</span>
            </li>
            <li>
              <strong>Systems</strong>
              <span>Connect policy to implementation.</span>
            </li>
            <li>
              <strong>Evidence</strong>
              <span>Test what the system actually does.</span>
            </li>
          </ol>
        </div>
        <figcaption>
          Cybersecurity grounded in practical, testable engineering.
        </figcaption>
      </figure>
    </header>
  );
}

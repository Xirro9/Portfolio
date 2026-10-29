import {
  Component,
  lazy,
  Suspense,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { href } from "../../routes";
import { Monogram } from "../visual/Monogram";
import { TechnomancerEngine } from "../visual/TechnomancerEngine";
import { useInView, useSceneSupport } from "../visual/sceneSupport";

const CelestialEngine = lazy(() => import("../visual/CelestialEngine"));

class SceneBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The Workshop hero: the Celestial Engine (WebGL) runs inside the reactor's
 * housing. The full SVG reactor is the static fallback, so a missing WebGL
 * context, reduced motion or a scene error still shows the complete machine.
 */
export function WorkshopHero() {
  const stage = useRef<HTMLDivElement>(null);
  const webgl = useSceneSupport("webgl");
  const visible = useInView(stage);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const state = !webgl || failed ? "static" : ready ? "live" : "loading";
  return (
    <header className="workshop-hero" data-hero="workshop">
      <div
        className="workshop-hero-introduction"
        data-motion-slot="workshop-title"
      >
        <p className="eyebrow workshop-kicker">
          <Monogram variant="arcane" className="hero-kicker-mark" />
          The Technomancer’s Sanctum
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
          Experiments in code, play and arcane machinery.
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
        data-scene="celestial-engine"
        data-scene-state={state}
        data-scene-active={visible}
      >
        <div ref={stage} className="engine-frame">
          <TechnomancerEngine>
            <div
              className="celestial-mount"
              data-motion-slot="celestial-engine"
              aria-hidden="true"
            >
              {webgl && !failed && (
                <SceneBoundary onError={() => setFailed(true)}>
                  <Suspense fallback={null}>
                    <CelestialEngine
                      active={visible}
                      onReady={() => setReady(true)}
                    />
                  </Suspense>
                </SceneBoundary>
              )}
            </div>
          </TechnomancerEngine>
        </div>
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
          Original illustration: a celestial engine inside an arcane reactor. A
          creative practice, with prototype status and evidence kept visible.
        </figcaption>
      </figure>
      <nav
        className="workshop-hero-transitions"
        aria-label="Workshop transitions"
      >
        <a href={href("/work")}>
          Professional work <span aria-hidden="true">↗</span>
        </a>
        <a href={href("/")}>Back to the professional site</a>
      </nav>
    </header>
  );
}

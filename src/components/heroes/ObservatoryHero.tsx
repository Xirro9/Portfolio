import {
  Component,
  lazy,
  Suspense,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "../../content/site";
import { href } from "../../routes";
import { Insignia } from "../visual/Insignia";
import { OrreryArt } from "../visual/OrreryArt";
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

/** Foreground and scene layers stay independent; neither requires animation. */
export function ObservatoryHero() {
  const stage = useRef<HTMLDivElement>(null);
  const webgl = useSceneSupport("webgl");
  const visible = useInView(stage);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const state = !webgl || failed ? "static" : ready ? "live" : "loading";
  return (
    <header className="observatory-hero" data-hero="observatory">
      <div
        className="observatory-foreground"
        data-motion-slot="hero-foreground"
      >
        <p className="eyebrow hero-kicker">
          <Insignia className="hero-kicker-mark" />
          The Observatory · Mahin Moon
        </p>
        <h1 data-motion-slot="hero-heading">
          <span className="line-mask">
            <span data-motion-part="heading-line">Security requirements.</span>
          </span>{" "}
          <span className="line-mask">
            <span data-motion-part="heading-line">Working systems.</span>
          </span>{" "}
          <span className="line-mask">
            <span data-motion-part="heading-line">Clear evidence.</span>
          </span>
        </h1>
        <p className="hero-description">{site.positioning}</p>
        <dl className="hero-credentials">
          <div>
            <dt>Role</dt>
            <dd>Security Compliance Analyst, Oklahoma Cyber Innovation Institute</dd>
          </div>
          <div>
            <dt>Study</dt>
            <dd>Cybersecurity graduate; graduate study at The University of Tulsa</dd>
          </div>
          <div>
            <dt>Builds</dt>
            <dd>Local-first security software and agent observability</dd>
          </div>
        </dl>
        <div className="actions">
          <a className="button-link button-primary" href={href("/work")}>
            Explore professional work
          </a>
          <a className="button-link button-quiet" href={href("/experience")}>
            Experience & education
          </a>
        </div>
      </div>
      <figure
        className="observatory-visual"
        aria-label="Professional approach overview"
        data-scene="celestial-engine"
        data-scene-state={state}
        data-scene-active={visible}
      >
        <div className="celestial-stage" ref={stage}>
          <OrreryArt />
          <div
            className="hero-scene-mount"
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
        </div>
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

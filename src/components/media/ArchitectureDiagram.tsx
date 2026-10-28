import type { MediaImage } from "../../content/types";
import { ProjectMedia } from "./ProjectMedia";
import { SystemDiagram, hasSystemDiagram } from "../visual/SystemDiagram";

export function ArchitectureDiagram({
  steps,
  image,
  title = "High-level component flow",
  slug,
}: {
  steps: string[];
  image?: MediaImage;
  title?: string;
  slug?: string;
}) {
  if (image) return <ProjectMedia image={image} />;
  if (!steps.length) return null;
  const flow = (
    <figure
      className="architecture-diagram"
      data-motion-slot="architecture-lines"
    >
      <ol className="architecture-flow" aria-label={title}>
        {steps.map((step, index) => (
          <li key={step} data-architecture-step={index + 1}>
            <span className="architecture-connector" aria-hidden="true" />
            <span className="architecture-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <figcaption>
        Sanitized component overview; no infrastructure connection details.
      </figcaption>
    </figure>
  );
  return slug && hasSystemDiagram(slug) ? (
    <div className="architecture-block">
      <SystemDiagram slug={slug} />
      {flow}
    </div>
  ) : (
    flow
  );
}

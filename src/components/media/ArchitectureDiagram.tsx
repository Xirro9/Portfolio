import type { MediaImage } from "../../content/types";
import { ProjectMedia } from "./ProjectMedia";

export function ArchitectureDiagram({
  steps,
  image,
  title = "High-level component flow",
}: {
  steps: string[];
  image?: MediaImage;
  title?: string;
}) {
  if (image) return <ProjectMedia image={image} />;
  if (!steps.length) return null;
  return (
    <figure
      className="architecture-diagram"
      data-motion-slot="architecture-lines"
    >
      <ol className="architecture-flow" aria-label={title}>
        {steps.map((step, index) => (
          <li key={step} data-architecture-step={index + 1}>
            <span className="architecture-connector" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <figcaption>
        Sanitized component overview; no infrastructure connection details.
      </figcaption>
    </figure>
  );
}

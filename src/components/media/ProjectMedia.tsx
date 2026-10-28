import { useState, type CSSProperties } from "react";
import type { MediaImage, Project } from "../../content/types";
import { mediaUrl } from "../../media";
import { ExternalLink } from "../Content";
import { ProjectArtwork } from "../visual/ProjectArtwork";

/** An original illustration, explicitly not a fictional application screenshot. */
export function StaticProjectOverview({ project }: { project: Project }) {
  return <ProjectArtwork project={project} />;
}

export function ProjectMedia({
  image,
  priority = false,
  sizes = "(min-width: 900px) 50vw, 100vw",
}: {
  image: MediaImage;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure
      className="project-media"
      data-media-kind="image"
      data-motion-slot="project-imagery"
    >
      <div
        className="project-media-frame"
        style={
          {
            "--media-ratio": `${image.width} / ${image.height}`,
          } as CSSProperties
        }
      >
        {failed ? (
          <p className="media-error" role="status">
            Image unavailable. See the linked project evidence for the original
            capture.
          </p>
        ) : (
          <picture>
            {image.variants?.lightPath && (
              <source
                media="(prefers-color-scheme: light)"
                srcSet={mediaUrl(image.variants.lightPath)}
              />
            )}
            {image.variants?.darkPath && (
              <source
                media="(prefers-color-scheme: dark)"
                srcSet={mediaUrl(image.variants.darkPath)}
              />
            )}
            <img
              src={mediaUrl(image.path)}
              srcSet={image.srcSet
                ?.map((source) => `${mediaUrl(source.path)} ${source.width}w`)
                .join(", ")}
              sizes={image.sizes ?? sizes}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={priority ? undefined : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              onError={() => setFailed(true)}
            />
          </picture>
        )}
      </div>
      <figcaption>
        {image.caption}
        {image.sourceUrl && (
          <>
            {" "}
            <ExternalLink url={image.sourceUrl}>Original capture</ExternalLink>
          </>
        )}
      </figcaption>
    </figure>
  );
}

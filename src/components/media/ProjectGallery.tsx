import { useState } from "react";
import type { MediaImage } from "../../content/types";
import { ProjectMedia } from "./ProjectMedia";
import { mediaUrl } from "../../media";

export function ProjectGallery({
  images,
  title,
}: {
  images: MediaImage[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);
  if (!images.length) return null;
  return (
    <section
      className="project-gallery"
      aria-label={`${title} screenshot gallery`}
    >
      <h2>Screenshot gallery</h2>
      <ProjectMedia
        key={images[selected].path}
        image={images[selected]}
        sizes="(min-width: 900px) 65vw, 100vw"
      />
      <noscript>
        <ul>
          {images.map((image, index) => (
            <li key={image.path}>
              <a href={mediaUrl(image.path)}>View screenshot {index + 1}</a>
            </li>
          ))}
        </ul>
      </noscript>
      {images.length > 1 && (
        <>
          <div className="gallery-selectors" aria-label="Choose screenshot">
            {images.map((image, index) => (
              <button
                key={image.path}
                type="button"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                Screenshot {index + 1}
              </button>
            ))}
          </div>
          <p className="caption" role="status">
            Screenshot {selected + 1} of {images.length}
          </p>
        </>
      )}
    </section>
  );
}

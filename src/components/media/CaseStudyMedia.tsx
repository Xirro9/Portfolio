import type { Project } from "../../content/types";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectMedia } from "./ProjectMedia";

export function CaseStudyMedia({ project }: { project: Project }) {
  const media = project.media;
  if (!media) return null;
  return (
    <div className="case-study-media" data-motion-slot="case-study-media">
      {media.preview ? (
        <ProjectPreview
          title={project.title}
          cover={media.cover}
          video={media.preview}
        />
      ) : media.screenshots?.length ? (
        <ProjectGallery title={project.title} images={media.screenshots} />
      ) : (
        <ProjectMedia
          image={media.cover}
          sizes="(min-width: 900px) 65vw, 100vw"
        />
      )}
      {media.preview && !!media.screenshots?.length && (
        <ProjectGallery title={project.title} images={media.screenshots} />
      )}
    </div>
  );
}

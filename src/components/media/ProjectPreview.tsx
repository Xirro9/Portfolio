import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { MediaImage, MediaVideo } from "../../content/types";
import { ProjectMedia } from "./ProjectMedia";
import { mediaUrl } from "../../media";

interface Connection extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}
const connection = () =>
  (navigator as Navigator & { connection?: Connection }).connection;
function readPolicy() {
  if (typeof matchMedia === "undefined") return "manual";
  const network = connection();
  return matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !network?.saveData &&
    !["slow-2g", "2g"].includes(network?.effectiveType ?? "")
    ? "automatic"
    : "manual";
}
function subscribePolicy(update: () => void) {
  if (typeof matchMedia === "undefined") return () => {};
  const queries = [
    matchMedia("(hover: hover) and (pointer: fine)"),
    matchMedia("(prefers-reduced-motion: reduce)"),
  ];
  queries.forEach((query) => query.addEventListener("change", update));
  const network = connection();
  network?.addEventListener("change", update);
  return () => {
    queries.forEach((query) => query.removeEventListener("change", update));
    network?.removeEventListener("change", update);
  };
}
let activePreview: HTMLVideoElement | null = null;
function claimPreview(video: HTMLVideoElement) {
  if (activePreview && activePreview !== video) activePreview.pause();
  activePreview = video;
}

/** Attach a video source only on user intent. At most one preview can play. */
export function ProjectPreview({
  title,
  cover,
  video,
  priority = false,
}: {
  title: string;
  cover: MediaImage;
  video?: MediaVideo;
  priority?: boolean;
}) {
  if (!video) return <ProjectMedia image={cover} priority={priority} />;
  return (
    <VideoPreview
      title={title}
      cover={cover}
      video={video}
      priority={priority}
    />
  );
}

function VideoPreview({
  title,
  cover,
  video,
  priority,
}: {
  title: string;
  cover: MediaImage;
  video: MediaVideo;
  priority: boolean;
}) {
  const policy = useSyncExternalStore(
    subscribePolicy,
    readPolicy,
    () => "manual",
  );
  const player = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const request = useRef(0);
  const automatic = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [activated, setActivated] = useState(false);
  const [failed, setFailed] = useState(false);
  const id = useId();

  useEffect(() => {
    const node = player.current;
    const pause = () => {
      request.current++;
      node?.pause();
      if (activePreview === node) activePreview = null;
    };
    const visibility = () => {
      if (document.hidden) pause();
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            if (entries.some((entry) => !entry.isIntersecting)) pause();
          });
    if (frame.current) observer?.observe(frame.current);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      pause();
    };
  }, []);
  useEffect(() => {
    if (policy === "manual" && automatic.current) {
      request.current++;
      player.current?.pause();
    }
  }, [policy]);

  const pause = () => {
    request.current++;
    player.current?.pause();
    automatic.current = false;
  };
  async function play(mode: "automatic" | "manual") {
    const node = player.current;
    if (!node || !video || failed) return;
    automatic.current = mode === "automatic";
    const requestId = ++request.current;
    if (!node.getAttribute("src")) {
      node.src = mediaUrl(video.path);
      node.poster = mediaUrl(video.poster.path);
    }
    claimPreview(node);
    try {
      await node.play();
      if (requestId !== request.current) node.pause();
    } catch {
      if (requestId === request.current) {
        automatic.current = false;
        setPlaying(false);
      }
    }
  }

  return (
    <div
      ref={frame}
      className={`project-preview${playing ? " is-playing" : ""}${activated ? " has-preview" : ""}`}
      data-preview-policy={policy}
      data-motion-slot="project-preview"
      onPointerEnter={() => {
        if (policy === "automatic") void play("automatic");
      }}
      onPointerLeave={() => {
        if (automatic.current) pause();
      }}
      onFocus={() => {
        if (policy === "automatic" && !failed) void play("automatic");
      }}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          automatic.current
        )
          pause();
      }}
    >
      <ProjectMedia key={cover.path} image={cover} priority={priority} />
      {video && !failed && (
        <>
          <video
            id={id}
            ref={player}
            hidden={!activated}
            className="preview-player"
            width={video.width}
            height={video.height}
            muted
            playsInline
            controls
            preload="none"
            aria-label={`${title} preview`}
            aria-describedby={`${id}-description`}
            onPlay={() => {
              if (player.current) claimPreview(player.current);
              setActivated(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              automatic.current = false;
              setPlaying(false);
            }}
            onError={() => {
              pause();
              setPlaying(false);
              setFailed(true);
            }}
          >
            {video.captionsPath && (
              <track
                kind="captions"
                src={mediaUrl(video.captionsPath)}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
          <div className="preview-controls">
            <button
              type="button"
              aria-controls={id}
              onClick={() => {
                if (playing) pause();
                else void play("manual");
              }}
            >
              {playing ? "Pause" : "Play"} preview of {title}
            </button>
          </div>
          <p id={`${id}-description`} className="preview-description">
            {video.caption} {video.description}
          </p>
          <noscript>
            <p>
              Video previews require JavaScript. The static image and project
              details remain available.
            </p>
          </noscript>
        </>
      )}
      {failed && (
        <p role="status">
          Preview unavailable. The static image remains available.
        </p>
      )}
    </div>
  );
}

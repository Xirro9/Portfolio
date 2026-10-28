import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MediaImage, MediaVideo } from "../src/content/types";
import { ProjectMedia } from "../src/components/media/ProjectMedia";
import { ProjectPreview } from "../src/components/media/ProjectPreview";
import { ProjectGallery } from "../src/components/media/ProjectGallery";

// Test-only fixture references. No fictional video is included in public data/build.
const cover: MediaImage = {
  path: "media/agenthq-night.png",
  width: 1280,
  height: 720,
  alt: "Real AgentHQ office screenshot in demo mode",
  caption: "DEMO interface capture.",
  srcSet: [
    { path: "media/agenthq-night-640.png", width: 640 },
    { path: "media/agenthq-night.png", width: 1280 },
  ],
};
const video: MediaVideo = {
  path: "media/test-only-preview.webm",
  type: "video/webm",
  poster: cover,
  width: 1280,
  height: 720,
  caption: "Test fixture only.",
  description: "Muted test preview.",
};
let finePointer = false;
let reduced = false;
let constrained = false;
let network: EventTarget & { saveData: boolean; effectiveType: string };
let queries: Map<string, MediaQueryList>;
let observers: IntersectionObserverCallback[];

beforeEach(() => {
  finePointer = false;
  reduced = false;
  constrained = false;
  queries = new Map();
  observers = [];
  network = Object.assign(new EventTarget(), {
    get saveData() {
      return constrained;
    },
    effectiveType: "4g",
  });
  Object.defineProperty(network, "saveData", {
    configurable: true,
    get: () => constrained,
  });
  vi.stubGlobal(
    "navigator",
    Object.assign(Object.create(navigator), { connection: network }),
  );
  vi.stubGlobal("matchMedia", (query: string) => {
    if (!queries.has(query)) {
      const target = new EventTarget();
      queries.set(query, {
        media: query,
        get matches() {
          return query.includes("reduced-motion") ? reduced : finePointer;
        },
        onchange: null,
        addEventListener: target.addEventListener.bind(target),
        removeEventListener: target.removeEventListener.bind(target),
        dispatchEvent: target.dispatchEvent.bind(target),
        addListener() {},
        removeListener() {},
      } as MediaQueryList);
    }
    return queries.get(query)!;
  });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observers.push(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    this.dispatchEvent(new Event("pause"));
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("project media contracts", () => {
  it("keeps the responsive image and caption accessible, including an error fallback", () => {
    render(<ProjectMedia image={cover} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "srcset",
      "/Portfolio/media/agenthq-night-640.png 640w, /Portfolio/media/agenthq-night.png 1280w",
    );
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "1280");
    fireEvent.error(image);
    expect(screen.getByRole("status")).toHaveTextContent("Image unavailable");
    expect(screen.getByText("DEMO interface capture.")).toBeInTheDocument();
  });
  it("does not attach video sources or poster requests before touch/keyboard intent", async () => {
    const { container } = render(
      <ProjectPreview title="Fixture" cover={cover} video={video} />,
    );
    const player = container.querySelector("video")!;
    expect(player).not.toHaveAttribute("src");
    expect(player).not.toHaveAttribute("poster");
    expect(player).toHaveAttribute("preload", "none");
    expect(player).toHaveAttribute("hidden");
    fireEvent.pointerEnter(container.firstElementChild!);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole("button", { name: "Play preview of Fixture" }),
    );
    await waitFor(() =>
      expect(player).toHaveAttribute(
        "src",
        "/Portfolio/media/test-only-preview.webm",
      ),
    );
    expect(player.muted).toBe(true);
    expect(player).toHaveAttribute("controls");
    expect(player).not.toHaveAttribute("hidden");
    fireEvent.click(
      screen.getByRole("button", { name: "Pause preview of Fixture" }),
    );
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });
  it("supports hover and keyboard focus previews on an unconstrained desktop", async () => {
    finePointer = true;
    const { container } = render(
      <ProjectPreview title="Fixture" cover={cover} video={video} />,
    );
    const frame = container.firstElementChild!;
    fireEvent.pointerEnter(frame);
    await screen.findByRole("button", { name: "Pause preview of Fixture" });
    fireEvent.pointerLeave(frame);
    await screen.findByRole("button", { name: "Play preview of Fixture" });
    fireEvent.focus(screen.getByRole("button"));
    await screen.findByRole("button", { name: "Pause preview of Fixture" });
  });
  it.each(["reduced motion", "data saver", "slow connection"])(
    "keeps %s manual, while permitting explicit playback",
    async (condition) => {
      finePointer = true;
      reduced = condition === "reduced motion";
      constrained = condition === "data saver";
      if (condition === "slow connection") network.effectiveType = "2g";
      const { container } = render(
        <ProjectPreview title="Fixture" cover={cover} video={video} />,
      );
      fireEvent.pointerEnter(container.firstElementChild!);
      fireEvent.focus(screen.getByRole("button"));
      expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button"));
      await screen.findByRole("button", { name: "Pause preview of Fixture" });
    },
  );
  it("pauses a running automatic preview when the motion preference changes", async () => {
    finePointer = true;
    const { container } = render(
      <ProjectPreview title="Fixture" cover={cover} video={video} />,
    );
    fireEvent.pointerEnter(container.firstElementChild!);
    await screen.findByRole("button", { name: "Pause preview of Fixture" });
    act(() => {
      reduced = true;
      queries
        .get("(prefers-reduced-motion: reduce)")!
        .dispatchEvent(new Event("change"));
    });
    await screen.findByRole("button", { name: "Play preview of Fixture" });
    expect(container.firstElementChild).toHaveAttribute(
      "data-preview-policy",
      "manual",
    );
  });
  it("allows only one playing preview and pauses offscreen media", async () => {
    render(
      <>
        <ProjectPreview title="One" cover={cover} video={video} />
        <ProjectPreview title="Two" cover={cover} video={video} />
      </>,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Play preview of One" }),
    );
    await screen.findByRole("button", { name: "Pause preview of One" });
    fireEvent.click(
      screen.getByRole("button", { name: "Play preview of Two" }),
    );
    await screen.findByRole("button", { name: "Play preview of One" });
    await screen.findByRole("button", { name: "Pause preview of Two" });
    act(() =>
      observers[1](
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    await screen.findByRole("button", { name: "Play preview of Two" });
  });
  it("retains a static fallback on playback error and tolerates blocked autoplay", async () => {
    const { container } = render(
      <ProjectPreview title="Fixture" cover={cover} video={video} />,
    );
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(
      new Error("Blocked"),
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveTextContent("Play preview"),
    );
    fireEvent.error(container.querySelector("video")!);
    expect(screen.getByRole("status")).toHaveTextContent("Preview unavailable");
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  it("changes screenshot and caption together, without a modal or autoplay", () => {
    render(
      <ProjectGallery
        title="AgentHQ"
        images={[
          cover,
          {
            ...cover,
            path: "media/agenthq-taskboard.png",
            alt: "Task-board demo capture",
            caption: "Task-board DEMO fixture.",
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Screenshot 2" }));
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Task-board demo capture",
    );
    expect(
      screen.getByRole("button", { name: "Screenshot 2" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Screenshot 2 of 2");
    expect(screen.getByText("Task-board DEMO fixture.")).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { projects, projectPath } from "../src/content/projects";
import {
  certifications,
  education,
  navigation,
  notes,
} from "../src/content/site";
import { allRoutes, href, normalizePath, routeMetadata } from "../src/routes";

describe("publication contracts", () => {
  it("has unique canonical records, valid relations, and complete case studies", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(
      projects.length,
    );
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      for (const field of [
        "summary",
        "problem",
        "role",
        "statusDetail",
      ] as const)
        expect(project[field].length).toBeGreaterThan(20);
      expect(project.limitations.length).toBeGreaterThan(0);
      expect(project.results.length).toBeGreaterThan(0);
      for (const slug of project.related)
        expect(
          projects.some((item) => item.slug === slug && item !== project),
        ).toBe(true);
      for (const evidence of project.evidence)
        expect(new URL(evidence.url).protocol).toBe("https:");
      if (project.repositoryUrl)
        expect(new URL(project.repositoryUrl).hostname).toBe("github.com");
      if (project.featured) expect(project.home).toBe("work");
      if (project.media) expect(project.media.alt.length).toBeGreaterThan(15);
    }
  });
  it("connects every navigation and note destination to a real route", () => {
    const paths = allRoutes().map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const item of navigation) expect(paths).toContain(item.path);
    for (const note of notes)
      expect(paths).toContain(`/work/${note.projectSlug}`);
    for (const project of projects)
      expect(paths).toContain(projectPath(project));
    expect(certifications).toEqual([]);
    expect(education.find((item) => item.status === "completed")?.period).toBe(
      "Completed May 2026",
    );
  });
  it("handles the Pages base, trailing slash, and unknown route metadata", () => {
    expect(normalizePath("/Portfolio/work/controlgauge/")).toBe(
      "/work/controlgauge",
    );
    expect(normalizePath("/Portfolio/")).toBe("/");
    expect(normalizePath("/Portfolio-other")).toBe("/Portfolio-other");
    expect(href("/work")).toBe("/Portfolio/work/");
    expect(routeMetadata("/missing").title).toBe("Page not found");
  });
  it("keeps private endpoints, unsupported credentials, and raw evidence out of content", () => {
    const content = JSON.stringify(projects);
    expect(content).not.toMatch(
      /(?:192\.168\.|10\.\d+\.\d+\.|100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/,
    );
    expect(content).not.toMatch(/ghp_[a-z0-9]{20}|sk-[a-z0-9]{20}/i);
    const cg = projects.find((project) => project.slug === "controlgauge")!;
    expect(cg.limitations.join(" ")).toContain("No evidence ingestion");
    expect(cg.planned.join(" ")).toContain("Local inference");
    expect(
      projects
        .find((project) => project.slug === "agenthq")
        ?.limitations.join(" "),
    ).toContain("experimental");
  });
});

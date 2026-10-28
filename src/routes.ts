import { projects, projectPath } from "./content/projects";
import { site } from "./content/site";
export const themeScopes = [
  "observatory",
  "engineering-archive",
  "technomancer-workshop",
] as const;
export type ThemeScope = (typeof themeScopes)[number];
export function themeForPath(path: string): ThemeScope {
  const route = normalizePath(path);
  if (route === "/workshop" || route.startsWith("/workshop/"))
    return "technomancer-workshop";
  if (
    route === "/work" ||
    route.startsWith("/work/") ||
    route === "/labs" ||
    route.startsWith("/labs/")
  )
    return "engineering-archive";
  return "observatory";
}
export const pages = [
  {
    path: "/",
    title: "Cybersecurity & practical engineering",
    description: site.description,
  },
  {
    path: "/work",
    title: "Professional work",
    description:
      "Local-first compliance software, coding-agent observability, and applied systems engineering.",
  },
  {
    path: "/experience",
    title: "Experience & education",
    description:
      "Security assessment work, education, and selected professional milestones.",
  },
  {
    path: "/labs",
    title: "Labs & engineering notes",
    description:
      "Security labs, incident response scripting, infrastructure, and local inference notes.",
  },
  {
    path: "/workshop",
    title: "The Workshop",
    description:
      "Creative coding, games, and personal experiments with honest prototype and evidence labels.",
  },
  {
    path: "/about",
    title: "About Mahin",
    description:
      "Background and approach to evidence-led cybersecurity and practical engineering.",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Mahin Moon for cybersecurity and engineering conversations.",
  },
];
export function normalizePath(path: string) {
  let clean = path.split(/[?#]/)[0];
  if (clean === site.base || clean.startsWith(`${site.base}/`))
    clean = clean.slice(site.base.length);
  return clean.replace(/\/+$/, "") || "/";
}
export const href = (path: string) =>
  `${site.base}${path === "/" ? "/" : `${path}/`}`;
export const allRoutes = () => [
  ...pages,
  ...projects.map((project) => ({
    path: projectPath(project),
    title: project.title,
    description: project.summary,
  })),
];
export function routeMetadata(path: string) {
  return (
    allRoutes().find((route) => route.path === normalizePath(path)) ?? {
      path: normalizePath(path),
      title: "Page not found",
      description: "This portfolio page could not be found.",
    }
  );
}

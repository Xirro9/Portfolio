import { projects, projectPath } from "./content/projects";
import { normalizePath } from "./routes";
import { ProjectCaseStudy } from "./components/ProjectCaseStudy";
import { SiteLayout } from "./components/SiteLayout";
import {
  AboutPage,
  ContactPage,
  ExperiencePage,
  HomePage,
  LabsPage,
  NotFoundPage,
  WorkPage,
  WorkshopPage,
} from "./pages/Pages";
const pageComponents = {
  "/": HomePage,
  "/work": WorkPage,
  "/experience": ExperiencePage,
  "/labs": LabsPage,
  "/workshop": WorkshopPage,
  "/about": AboutPage,
  "/contact": ContactPage,
};
export default function App({ path }: { path: string }) {
  const normalized = normalizePath(path);
  const project = projects.find((item) => projectPath(item) === normalized);
  const Page =
    pageComponents[normalized as keyof typeof pageComponents] ?? NotFoundPage;
  return (
    <SiteLayout path={normalized}>
      {project ? <ProjectCaseStudy project={project} /> : <Page />}
    </SiteLayout>
  );
}

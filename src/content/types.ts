export type ProjectStatus =
  "active" | "prototype" | "experimental" | "historical" | "concept";
export type Category =
  | "security"
  | "software-engineering"
  | "ai-infrastructure"
  | "creative"
  | "foundational";
export interface Evidence {
  label: string;
  url: string;
}
export interface MediaImage {
  path: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sourceUrl?: string;
  srcSet?: { path: string; width: number }[];
  sizes?: string;
  variants?: { lightPath?: string; darkPath?: string };
}
export interface MediaVideo {
  path: string;
  type: "video/webm" | "video/mp4";
  poster: MediaImage;
  width: number;
  height: number;
  caption: string;
  description: string;
  captionsPath?: string;
  sourceUrl?: string;
}
export interface ProjectMediaSet {
  cover: MediaImage;
  preview?: MediaVideo;
  screenshots?: MediaImage[];
  diagram?: MediaImage;
}
export interface Project {
  slug: string;
  title: string;
  home: "work" | "labs" | "workshop";
  category: Category;
  tags: string[];
  status: ProjectStatus;
  statusDetail: string;
  featured?: boolean;
  professionalSpotlight?: boolean;
  workshopFeatured?: boolean;
  liveUrl?: string;
  verification:
    "repository-documented" | "owner-reported" | "local-documentation";
  summary: string;
  problem: string;
  role: string;
  architecture: string[];
  implemented: string[];
  challenges: string[];
  safeguards: string[];
  results: string[];
  limitations: string[];
  planned: string[];
  lessons: string[];
  evidence: Evidence[];
  repositoryUrl?: string;
  media?: ProjectMediaSet;
  related: string[];
  notice?: string;
}
export interface Experience {
  role: string;
  organization: string;
  period: string;
  start: string;
  end?: string;
  summary: string;
  details: string[];
}
export interface Education {
  title: string;
  field: string;
  institution: string;
  period: string;
  status: "completed" | "in progress";
  description: string;
  source: "owner-confirmed";
}
export interface Milestone {
  title: string;
  date: string;
  category: "education" | "engineering";
  description: string;
  publication: "public";
  evidence?: Evidence;
}
export interface SkillGroup {
  title: string;
  context: string;
  description: string;
  skills: string[];
}
export interface EngineeringNote {
  title: string;
  status: string;
  body: string;
  projectSlug: string;
}
export interface Certification {
  title: string;
  earned: string;
  evidence: Evidence;
}
export interface Publication {
  title: string;
  date: string;
  evidence: Evidence;
}

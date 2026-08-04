import type { IconType } from "react-icons";

/* ---------- Site / SEO ---------- */
export type SiteMetadata = {
  siteUrl: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  ogImage: string;
  twitterHandle: string;
};

/* ---------- Main / Hero ---------- */
export type GetInTouchItem = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

export type MainData = {
  name: string;
  logo: string;
  tagline: string;
  titles: string[];
  getInTouch: GetInTouchItem[];
};

/* ---------- Tech Stack ---------- */
export type TechItem = {
  name: string;
  icon: IconType;
};

export type TechGroup = {
  group: string;
  items: TechItem[];
};

/* ---------- About ---------- */
export type AboutData = {
  aboutImage: string;
  intro: string;
  philosophy: string[];
  workingStyle: string[];
  favoriteTech: string[];
  quote: string;
  resumeUrl: string;
};

/* ---------- Journey ---------- */
export type JourneyType =
  | "Full-Time"
  | "Part-Time"
  | "Education"
  | "Certification"
  | "Competition";

export type JourneyItem = {
  slug: string;
  type: JourneyType;
  startDate: string; // "2024-01"
  endDate: string; // "Present" atau "2024-12"
  title: string;
  subtitle: string;
  caption?: string;
  description?: string[];
  tools?: string[];
  logo?: string;
};

/* ---------- Projects ---------- */
export type Project = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[]; // kategori filter
  role: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  docUrl?: string;
  gallery?: string[];
};

/* ---------- Blog ---------- */
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readingTime: string;
  author: string;
  featured?: boolean;
};

/* ---------- Socials ---------- */
export type Social = {
  name: string;
  icon: IconType;
  link: string;
};

/* ---------- GitHub Top Repos ---------- */
export type TopRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};

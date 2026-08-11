import type { SiteMetadata } from "@/lib/types";

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://syahrworks.com",
  title: "Muhammad Rohman Syah — SyahrWorks | Full-Stack Developer",
  description:
    "Portfolio of Muhammad Rohman Syah (SyahrWorks) — Full-Stack Developer (Next.js · Flutter · Go) in Jakarta. 13+ shipped projects, 3× BNSP certified. Open to full-time & remote.",
  keywords: [
    "SyahrWorks",
    "Muhammad Rohman Syah",
    "Full-Stack Developer",
    "Full-Stack Developer Jakarta",
    "Next.js Developer",
    "Flutter Developer",
    "Go Developer",
    "Web Development",
    "Mobile Development",
    "Junior Developer",
    "Remote Developer",
    "Clean Code",
    "Portfolio",
  ],
  author: "Muhammad Rohman Syah",
  ogImage: "/og-syahrworks.png",
  twitterHandle: "@syahrworks",
};

export const pageMetadata = {
  home: {
    title: "Muhammad Rohman Syah — SyahrWorks | Full-Stack Developer",
    description:
      "Full-Stack Developer (Next.js · Flutter · Go) in Jakarta — 13+ shipped projects, 3× BNSP certified. Open to full-time & remote.",
  },
  about: {
    title: "About",
    description:
      "About Muhammad Rohman Syah: Full-Stack Developer with 13+ projects, 3 BNSP certifications, and freelance and industry experience.",
  },
  journey: {
    title: "Journey",
    description:
      "Career journey of Muhammad Rohman Syah: work experience, education, BNSP certifications, and competitions.",
  },
  blog: {
    title: "Blog",
    description:
      "Articles and writings on web development, research, and technology from Muhammad Rohman Syah.",
  },
  projects: {
    title: "Projects",
    description:
      "13 featured projects by Muhammad Rohman Syah: web development, mobile apps, AI & data, and desktop tools.",
  },
} as const;

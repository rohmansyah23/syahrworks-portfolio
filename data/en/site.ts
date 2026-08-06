import type { SiteMetadata } from "@/lib/types";

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://syahrworks.vercel.app",
  title: "SyahrWorks — Muhammad Rohman Syah",
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
    title: "SyahrWorks — Muhammad Rohman Syah",
    description:
      "Full-Stack Developer (Next.js · Flutter · Go) in Jakarta — 13+ shipped projects, 3× BNSP certified. Open to full-time & remote.",
  },
  about: {
    title: "About — SyahrWorks",
    description:
      "About Muhammad Rohman Syah: Full-Stack Developer with 13+ projects, 3 BNSP certifications, and freelance and industry experience.",
  },
  journey: {
    title: "Journey — SyahrWorks",
    description:
      "Career journey of Muhammad Rohman Syah: work experience, education, BNSP certifications, and competitions.",
  },
  blog: {
    title: "Blog — SyahrWorks",
    description:
      "Articles and writings on web development, research, and technology from Muhammad Rohman Syah.",
  },
  projects: {
    title: "Projects — SyahrWorks",
    description:
      "13 featured projects by Muhammad Rohman Syah: web development, mobile apps, AI & data, and desktop tools.",
  },
} as const;

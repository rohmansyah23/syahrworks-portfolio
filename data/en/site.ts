import type { SiteMetadata } from "@/lib/types";

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://syahrworks.vercel.app",
  title: "SyahrWorks — Muhammad Rohman Syah",
  description:
    "Portfolio of Muhammad Rohman Syah (SyahrWorks) — Full-Stack Developer. Web & mobile applications focused on performance, scalability, and clean code.",
  keywords: [
    "SyahrWorks",
    "Muhammad Rohman Syah",
    "Full-Stack Developer",
    "Next.js",
    "Flutter",
    "Go",
    "Portfolio",
  ],
  author: "Muhammad Rohman Syah",
  ogImage: "/profile-me.png",
  twitterHandle: "@syahrworks",
};

export const pageMetadata = {
  home: {
    title: "SyahrWorks — Muhammad Rohman Syah",
    description:
      "Full-Stack Developer from Jakarta, Indonesia. Building reliable, scalable web & mobile applications focused on clean code.",
  },
  about: {
    title: "About — SyahrWorks",
    description:
      "About Muhammad Rohman Syah: Full-Stack Developer with 12+ projects, 3 BNSP certifications, and freelance and industry experience.",
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
      "12 featured projects by Muhammad Rohman Syah: web development, mobile apps, AI & data, and desktop tools.",
  },
} as const;

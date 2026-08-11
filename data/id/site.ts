import type { SiteMetadata } from "@/lib/types";

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://syahrworks.com",
  title: "Muhammad Rohman Syah — SyahrWorks | Full-Stack Developer",
  description:
    "Portofolio Muhammad Rohman Syah (SyahrWorks) — Full-Stack Developer (Next.js · Flutter · Go) di Jakarta. 13+ proyek shipped, 3× sertifikasi BNSP. Terbuka untuk full-time & remote.",
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
      "Full-Stack Developer (Next.js · Flutter · Go) di Jakarta — 13+ proyek shipped, 3× sertifikasi BNSP. Terbuka untuk full-time & remote.",
  },
  about: {
    title: "Tentang",
    description:
      "Tentang Muhammad Rohman Syah: Full-Stack Developer dengan 13+ proyek, 3 sertifikasi BNSP, dan pengalaman freelance serta industri.",
  },
  journey: {
    title: "Perjalanan",
    description:
      "Perjalanan karier Muhammad Rohman Syah: pengalaman kerja, pendidikan, sertifikasi BNSP, dan kompetisi.",
  },
  blog: {
    title: "Blog",
    description:
      "Artikel dan tulisan seputar pengembangan web, riset, dan teknologi dari Muhammad Rohman Syah.",
  },
  projects: {
    title: "Proyek",
    description:
      "13 proyek pilihan Muhammad Rohman Syah: web development, mobile apps, AI & data, serta desktop tools.",
  },
} as const;

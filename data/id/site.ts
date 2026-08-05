import type { SiteMetadata } from "@/lib/types";

export const siteMetadata: SiteMetadata = {
  siteUrl: "https://syahrworks.vercel.app",
  title: "SyahrWorks — Muhammad Rohman Syah",
  description:
    "Portofolio Muhammad Rohman Syah (SyahrWorks) — Full-Stack Developer. Aplikasi web & mobile dengan fokus pada performa, skalabilitas, dan clean code.",
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
      "Full-Stack Developer dari Jakarta, Indonesia. Membangun web & mobile applications yang reliable, scalable, dan berfokus pada clean code.",
  },
  about: {
    title: "Tentang — SyahrWorks",
    description:
      "Tentang Muhammad Rohman Syah: Full-Stack Developer dengan 12+ proyek, 3 sertifikasi BNSP, dan pengalaman freelance serta industri.",
  },
  journey: {
    title: "Perjalanan — SyahrWorks",
    description:
      "Perjalanan karier Muhammad Rohman Syah: pengalaman kerja, pendidikan, sertifikasi BNSP, dan kompetisi.",
  },
  blog: {
    title: "Blog — SyahrWorks",
    description:
      "Artikel dan tulisan seputar pengembangan web, riset, dan teknologi dari Muhammad Rohman Syah.",
  },
  projects: {
    title: "Proyek — SyahrWorks",
    description:
      "12 proyek pilihan Muhammad Rohman Syah: web development, mobile apps, AI & data, serta desktop tools.",
  },
} as const;

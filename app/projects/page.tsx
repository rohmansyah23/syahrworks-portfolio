import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: pageMetadata.projects.title,
  description: pageMetadata.projects.description,
};

export default function ProjectsPage() {
  return (
    <div className="container-editorial py-20 sm:py-28">
      <p className="micro-label text-accent">01 — PROJECTS</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        Selected work.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        12 proyek pilihan — dari web development, aplikasi mobile, AI &amp;
        data, hingga desktop tools. Klik kartu untuk melihat detail lengkap.
      </p>

      <div className="mt-14">
        <ProjectGrid />
      </div>
    </div>
  );
}

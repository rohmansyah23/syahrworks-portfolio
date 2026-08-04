"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof projectCategories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeCategory)),
    [activeCategory]
  );

  // Proyek pertama (featured) hanya pada tab All agar grid tetap bento
  const featured = activeCategory === "All" ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <div>
      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200",
              activeCategory === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid bento asimetris */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">
          Tidak ada proyek pada kategori ini.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured && (
            <ProjectCard
              project={featured}
              featured
              onClick={() => setSelected(featured)}
            />
          )}
          {rest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      )}

      {selected && (
        <ProjectModal
          project={selected}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  getData,
  getDictionary,
  type Locale,
} from "@/lib/i18n";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export default function ProjectGrid({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const projectData = getData(lang).projects;
  const projects = projectData.projects;
  const categories = projectData.projectCategories;

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === categories[0]
        ? projects
        : projects.filter((p) => p.tags.includes(activeCategory)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, lang]
  );

  // Proyek pertama (featured) hanya pada tab All agar grid tetap bento
  const featured = activeCategory === categories[0] ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <div>
      {/* Filter kategori */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
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
        <p className="mt-16 text-sm text-muted-foreground">{t.projectsEmpty}</p>
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
          lang={lang}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </div>
  );
}

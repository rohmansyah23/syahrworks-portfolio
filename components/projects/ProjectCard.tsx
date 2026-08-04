import Image from "next/image";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ProjectCard({
  project,
  featured,
  onClick,
}: {
  project: Project;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col overflow-hidden border border-border bg-card text-left transition-all duration-200 hover:shadow-[4px_4px_0_0_var(--foreground)]",
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          width={featured ? 1200 : 800}
          height={featured ? 800 : 600}
          sizes={featured ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            {project.tags[0]}
          </p>
          <span className="text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            →
          </span>
        </div>
        <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </button>
  );
}

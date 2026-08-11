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
        "group flex w-full flex-col overflow-hidden border border-border bg-background text-left transition-colors duration-200 hover:bg-muted",
        featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          width={featured ? 1200 : 800}
          height={featured ? 675 : 450}
          sizes={featured ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
          className="aspect-[16/9] w-full object-cover grayscale transition-[filter,transform] duration-300 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 pointer-coarse:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
            {project.tags[0]} {featured ? "· FEATURED" : ""}
          </p>
          <span className="text-accent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:group-hover:transform-none">
            →
          </span>
        </div>
        <h3
          className={cn(
            "font-serif leading-snug tracking-tight text-foreground",
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>
        {featured && project.role && (
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground/80">
            Role: {project.role}
          </p>
        )}
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            featured ? "line-clamp-4 lg:line-clamp-5" : "line-clamp-2"
          )}
        >
          {project.description}
        </p>

        {featured && project.techStack && project.techStack.length > 0 && (
          <div className="mt-auto pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 border border-border/60 bg-muted/40 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 6 && (
              <span className="font-mono text-[0.65rem] uppercase tracking-wider px-1.5 py-0.5 text-muted-foreground/60 self-center">
                +{project.techStack.length - 6}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

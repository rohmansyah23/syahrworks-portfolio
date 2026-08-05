"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Images } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import GalleryModal from "@/components/projects/GalleryModal";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export default function ProjectModal({
  project,
  lang,
  open,
  onOpenChange,
}: {
  project: Project;
  lang: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = getDictionary(lang);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const gallery = project.gallery ?? [project.coverImage];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <p className="micro-label text-accent">{project.tags.join(" · ")}</p>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.role}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            {/* Galeri */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveImage(0);
                  setGalleryOpen(true);
                }}
                className="group relative block overflow-hidden border border-border"
              >
                <Image
                  src={gallery[0]}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-foreground px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Images className="h-3.5 w-3.5" />
                  {t.projectView}
                </span>
              </button>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.slice(1).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveImage(i + 1);
                        setGalleryOpen(true);
                      }}
                      className="overflow-hidden border border-border transition-colors duration-200 hover:border-foreground"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} ${i + 2}`}
                        width={200}
                        height={150}
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detail */}
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5">
                <p className="micro-label text-muted-foreground">
                  {t.projectRole}
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {project.role}
                </p>
              </div>

              <div className="mt-5">
                <p className="micro-label text-muted-foreground">
                  {t.projectTechStack}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              {(project.githubUrl ||
                project.liveUrl ||
                project.docUrl) && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-2 border border-border px-4 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground"
                    >
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-2 bg-foreground px-4 text-xs font-medium text-background transition-opacity duration-200 hover:opacity-85"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t.projectLiveDemo}
                    </a>
                  )}
                  {project.docUrl && (
                    <a
                      href={project.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-2 border border-border px-4 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t.projectDocs}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {galleryOpen && (
        <GalleryModal
          lang={lang}
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
          title={project.title}
          image={gallery[activeImage]}
          alt={project.title}
        />
      )}
    </>
  );
}

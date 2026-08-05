import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getData, getDictionary, resolveLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getData(lang).site.pageMetadata.projects;
  return { title: page.title, description: page.description };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);

  return (
    <div className="container-editorial py-14 sm:py-20">
      <p className="micro-label text-accent">01 — {t.projectsLabel}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        {t.projectsTitle}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {t.projectsIntro}
      </p>

      <div className="mt-14">
        <ProjectGrid lang={lang} />
      </div>
    </div>
  );
}

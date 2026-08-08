import type { Metadata } from "next";
import BlogGrid from "@/components/blog/BlogGrid";
import { getData, getDictionary, resolveLang } from "@/lib/i18n";
import { pageAlternates, pageOpenGraph } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(params);
  const page = getData(lang).site.pageMetadata.blog;
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(lang, "/blog"),
    openGraph: pageOpenGraph(lang, "/blog", page.title, page.description),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);

  return (
    <div className="container-editorial py-14 sm:py-20">
      <p className="micro-label text-accent">01 — {t.blogLabel}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        {t.blogTitle}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {t.blogIntro}
      </p>

      <div className="mt-14">
        <BlogGrid lang={lang} />
      </div>
    </div>
  );
}

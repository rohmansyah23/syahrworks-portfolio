import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import {
  getData,
  getDictionary,
  locales,
  localePath,
  resolveLang,
  type Locale,
} from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { canonicalUrl, pageAlternates, blogPostJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

function getMarkdown(slug: string, lang: Locale): string | null {
  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    `${slug}.${lang}.md`
  );
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getData(lang)
      .blog.blogPosts.map((post) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const post = getData(lang).blog.blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: t.blogNotFound };
  const canonical = canonicalUrl(lang, `/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: pageAlternates(lang, `/blog/${post.slug}`),
    openGraph: {
      type: "article",
      locale: lang === "id" ? "id_ID" : "en_US",
      url: canonical,
      siteName: "SyahrWorks",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 675 }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang?: string; slug: string }>;
}) {
  const { slug } = await params;
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const post = getData(lang).blog.blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = getMarkdown(slug, lang);
  if (!body) notFound();

  return (
    <article className="container-editorial py-14 sm:py-20">
      <JsonLd data={blogPostJsonLd(post, lang)} />
      <Link
        href={localePath(lang, "/blog")}
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        {t.blogBack}
      </Link>

      <div className="mx-auto mt-10 max-w-3xl">
        <p className="micro-label text-accent">{post.category}</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date, lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            {post.tags.join(", ")}
          </span>
        </div>

        {post.coverImage && (
          <div className="mt-10 overflow-hidden border border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={675}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <div className="prose-editorial mt-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            {t.blogWrittenBy}{" "}
            <span className="text-foreground">{post.author}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

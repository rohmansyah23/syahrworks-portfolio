import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

function getMarkdown(slug: string): string | null {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Artikel tidak ditemukan" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = getMarkdown(slug);
  if (!body) notFound();

  return (
    <article className="container-editorial py-20 sm:py-28">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Blog
      </Link>

      <div className="mx-auto mt-10 max-w-3xl">
        <p className="micro-label text-accent">{post.category}</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
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
            Ditulis oleh{" "}
            <span className="text-foreground">{post.author}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

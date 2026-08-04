import type { Metadata } from "next";
import BlogGrid from "@/components/blog/BlogGrid";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: pageMetadata.blog.title,
  description: pageMetadata.blog.description,
};

export default function BlogPage() {
  return (
    <div className="container-editorial py-20 sm:py-28">
      <p className="micro-label text-accent">01 — BLOG</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        Notes &amp; writings.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Artikel seputar riset, pengembangan web, dan tutorial teknologi —
        ditulis dari pengalaman nyata.
      </p>

      <div className="mt-14">
        <BlogGrid />
      </div>
    </div>
  );
}

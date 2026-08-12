import Link from "next/link";
import { ArrowRight, ArrowUpRight, Pin } from "lucide-react";
import {
  getData,
  getDictionary,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { formatDate, sortBlogPosts } from "@/lib/utils";
import SectionHeader from "@/components/home/SectionHeader";

export default function LatestBlogs({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const blogPosts = getData(lang).blog.blogPosts;

  const latest = [...blogPosts].sort(sortBlogPosts).slice(0, 2);

  if (latest.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="05"
            label={t.latestBlogsLabel}
            title={t.latestBlogsTitle}
            className="mb-0"
          />
          <Link
            href={localePath(lang, "/blog")}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            {t.latestBlogsViewAll}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={localePath(lang, `/blog/${post.slug}`)}
              className="group flex flex-col gap-6 border border-border bg-background p-6 transition-colors duration-200 hover:bg-muted sm:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="micro-label text-muted-foreground">
                  {post.category}
                </p>
                <div className="flex items-center gap-2">
                  {post.featured && (
                    <span className="inline-flex items-center gap-1 rounded-[2px] border border-border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-foreground">
                      <Pin className="h-3 w-3 text-accent" />
                      {t.blogPinned}
                    </span>
                  )}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </div>
              <h3 className="font-serif text-2xl leading-snug tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-80">
                {post.title}
              </h3>
              <div className="mt-auto flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{formatDate(post.date, lang)}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

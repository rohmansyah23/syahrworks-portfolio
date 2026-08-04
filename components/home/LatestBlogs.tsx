import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import SectionHeader from "@/components/home/SectionHeader";

export default function LatestBlogs() {
  const latest = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  if (latest.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="container-editorial py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="05"
            label="From The Blog"
            title="Latest writings."
            className="mb-0"
          />
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            View All Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-6 bg-background p-6 transition-colors duration-200 hover:bg-muted sm:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="micro-label text-muted-foreground">
                  {post.category}
                </p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
              <h3 className="font-serif text-2xl leading-snug tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-80">
                {post.title}
              </h3>
              <div className="mt-auto flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{formatDate(post.date)}</span>
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

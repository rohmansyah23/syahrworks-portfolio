"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BlogGrid() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts
      .filter((post) => {
        const matchesTag =
          activeTag === "All" || post.tags.includes(activeTag);
        const matchesQuery =
          q === "" ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTag && matchesQuery;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [query, activeTag]);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Cari artikel"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                activeTag === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-20 border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          No posts found — coba ubah kata kunci atau tag.
        </p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

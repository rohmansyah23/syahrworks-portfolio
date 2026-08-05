"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  getData,
  getDictionary,
  type Locale,
} from "@/lib/i18n";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BlogGrid({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const blogPosts = getData(lang).blog.blogPosts;
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>(t.all);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return [t.all, ...Array.from(tags).sort()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts
      .filter((post) => {
        const matchesTag =
          activeTag === t.all || post.tags.includes(activeTag);
        const matchesQuery =
          q === "" ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchesTag && matchesQuery;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeTag, lang]);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.blogSearchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label={t.blogSearchAria}
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
          {t.blogEmpty}
        </p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

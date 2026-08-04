import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-all duration-200 hover:border-foreground hover:shadow-[4px_4px_0_0_var(--foreground)]"
    >
      {post.coverImage && (
        <div className="relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={600}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            {post.category}
          </p>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-80">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 font-mono text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Pin } from "lucide-react";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({
  post,
  lang,
}: {
  post: BlogPost;
  lang: Locale;
}) {
  const t = getDictionary(lang);
  return (
    <Link
      href={localePath(lang, `/blog/${post.slug}`)}
      className="group flex flex-col overflow-hidden border border-border bg-background transition-colors duration-200 hover:bg-muted"
    >
      {post.coverImage && (
        <div className="relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={450}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-[16/9] w-full object-cover grayscale transition-[filter,transform] duration-300 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 pointer-coarse:grayscale-0"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {post.featured && (
              <span className="inline-flex items-center gap-1 rounded-[2px] border border-border px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-foreground">
                <Pin className="h-3 w-3 text-accent" />
                {t.blogPinned}
              </span>
            )}
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
              {post.category}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-accent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:group-hover:transform-none" />
        </div>
        <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 font-mono text-xs text-muted-foreground">
          <span>{formatDate(post.date, lang)}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

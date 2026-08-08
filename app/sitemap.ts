import type { MetadataRoute } from "next";
import { getData, locales } from "@/lib/i18n";
import { hreflangLanguages } from "@/lib/seo";

/** Tanggal stabil (bukan `now`) agar lastmod sitemap tidak berubah tiap build. */
const SITE_LAST_MODIFIED = "2026-08-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getData("en").site.siteMetadata.siteUrl;

  const staticPaths = ["", "/about", "/journey", "/blog", "/projects"] as const;

  const alternatesFor = (path: string) => ({
    languages: hreflangLanguages(path),
  });

  const pages: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of staticPaths) {
      pages.push({
        url: `${base}/${lang}${path}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.8,
        alternates: alternatesFor(path),
      });
    }
  }

  const blogSlugs = getData("en").blog.blogPosts.map((post) => post.slug);
  const blogDates = new Map(
    getData("en").blog.blogPosts.map((post) => [post.slug, post.date])
  );

  for (const lang of locales) {
    for (const slug of blogSlugs) {
      const path = `/blog/${slug}`;
      pages.push({
        url: `${base}/${lang}${path}`,
        lastModified: blogDates.get(slug),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternatesFor(path),
      });
    }
  }

  return pages;
}

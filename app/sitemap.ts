import type { MetadataRoute } from "next";
import { getData, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = getData("en").site.siteMetadata.siteUrl;

  const staticPaths = ["", "/about", "/journey", "/blog", "/projects"] as const;

  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((lang) => [lang, `${base}/${lang}${path}`])
    ),
  });

  const pages: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of staticPaths) {
      pages.push({
        url: `${base}/${lang}${path}`,
        lastModified: now,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.8,
        alternates: alternatesFor(path),
      });
    }
  }

  const blogSlugs = getData("en").blog.blogPosts.map((post) => post.slug);

  for (const lang of locales) {
    for (const slug of blogSlugs) {
      const path = `/blog/${slug}`;
      pages.push({
        url: `${base}/${lang}${path}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternatesFor(path),
      });
    }
  }

  return pages;
}

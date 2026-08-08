import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { getData, locales } from "@/lib/i18n";
import { hreflangLanguages } from "@/lib/seo";

/**
 * lastmod halaman statis = tanggal commit git terakhir (bukan konstanta manual).
 * Stabil per commit (tidak berubah tiap build), otomatis ter-update setiap deploy
 * (workflow selalu `git pull` sebelum `npm run build`).
 * Fallback ke tanggal hari ini jika git tidak tersedia (mis. build tanpa .git,
 * seperti Vercel fallback di docs/DEPLOY-VERCEL-FALLBACK.md).
 */
function getSiteLastModified(): string {
  try {
    const out = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5000,
    })
      .toString()
      .trim();
    if (out) return out.slice(0, 10);
  } catch {
    // git tidak tersedia — pakai tanggal hari ini.
  }
  return new Date().toISOString().slice(0, 10);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getData("en").site.siteMetadata.siteUrl;
  const siteLastModified = getSiteLastModified();

  const staticPaths = ["", "/about", "/journey", "/blog", "/projects"] as const;

  const alternatesFor = (path: string) => ({
    languages: hreflangLanguages(path),
  });

  const pages: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of staticPaths) {
      pages.push({
        url: `${base}/${lang}${path}`,
        lastModified: siteLastModified,
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

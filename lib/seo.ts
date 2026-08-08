import type { Metadata } from "next";
import { socials } from "@/data/socials";
import { getData, localePath, type Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/types";

/** URL dasar situs (sama untuk semua locale). */
export function siteUrl(): string {
  return getData("en").site.siteMetadata.siteUrl;
}

/** URL absolut untuk sebuah path pada locale tertentu. */
export function canonicalUrl(lang: Locale, path: string): string {
  return `${siteUrl()}${localePath(lang, path)}`;
}

/** Map hreflang lengkap (en, id, x-default) untuk sebuah path. */
export function hreflangLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of ["en", "id"] as const) {
    languages[lang] = `${siteUrl()}${localePath(lang, path)}`;
  }
  languages["x-default"] = `${siteUrl()}${localePath("en", path)}`;
  return languages;
}

/** Snippet `alternates` (canonical + hreflang) untuk dipakai di generateMetadata. */
export function pageAlternates(
  lang: Locale,
  path: string
): Metadata["alternates"] {
  return {
    canonical: canonicalUrl(lang, path),
    languages: hreflangLanguages(path),
  };
}

/** `openGraph` lengkap per halaman. Page-level openGraph MENGGANTI openGraph layout. */
export function pageOpenGraph(
  lang: Locale,
  path: string,
  title: string,
  description: string
): Metadata["openGraph"] {
  const meta = getData(lang).site.siteMetadata;
  return {
    type: "website",
    locale: lang === "id" ? "id_ID" : "en_US",
    url: canonicalUrl(lang, path),
    title,
    description,
    siteName: "SyahrWorks",
    images: [
      { url: meta.ogImage, width: 1200, height: 630, alt: meta.author },
    ],
  };
}

/* ---------- JSON-LD Structured Data ---------- */

type JsonLd = Record<string, unknown>;

export function websiteJsonLd(lang: Locale): JsonLd {
  const main = getData(lang).main.main;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SyahrWorks",
    alternateName: main.name,
    url: siteUrl(),
    inLanguage: lang,
    publisher: {
      "@type": "Person",
      name: main.name,
      url: siteUrl(),
    },
  };
}

export function personJsonLd(lang: Locale): JsonLd {
  const main = getData(lang).main.main;
  const meta = getData(lang).site.siteMetadata;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: main.name,
    alternateName: "SyahrWorks",
    jobTitle: "Full-Stack Developer",
    url: siteUrl(),
    image: `${siteUrl()}${meta.ogImage}`,
    sameAs: socials.map((s) => s.link),
    knowsAbout: main.titles,
    description: meta.description,
  };
}

export function blogPostJsonLd(post: BlogPost, lang: Locale): JsonLd {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    url: canonicalUrl(lang, `/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl(),
    },
  };
  if (post.coverImage) {
    data.image = `${siteUrl()}${post.coverImage}`;
  }
  return data;
}

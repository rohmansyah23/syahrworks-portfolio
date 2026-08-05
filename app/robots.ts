import type { MetadataRoute } from "next";
import { getData } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getData("en").site.siteMetadata.siteUrl}/sitemap.xml`,
  };
}

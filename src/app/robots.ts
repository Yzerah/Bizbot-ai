import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog"],
      disallow: ["/dashboard", "/quotes", "/upgrade", "/api/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}

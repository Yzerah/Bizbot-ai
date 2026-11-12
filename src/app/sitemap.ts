import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { landings } from "@/content/seo/landings";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/websites`, changeFrequency: "monthly", priority: 0.9 },
    ...landings.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refund`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/websites/examples/renovation`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/websites/examples/accounting`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/websites/examples/cafe`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articles];
}

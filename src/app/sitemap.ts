import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const posts = getAllPosts();
  const latestPost = posts.reduce((latest, post) => (post.updatedAt > latest ? post.updatedAt : latest), posts[0]?.updatedAt ?? "2026-11-10");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: latestPost, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/pricing`, lastModified: "2026-11-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/signup`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articles];
}

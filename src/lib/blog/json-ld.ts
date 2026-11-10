import { getSiteUrl } from "@/lib/site";
import type { BlogPost } from "./types";

export function articleJsonLd(post: BlogPost) {
  const url = `${getSiteUrl()}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "he",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: "BizBot",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "BizBot",
      url: getSiteUrl(),
    },
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

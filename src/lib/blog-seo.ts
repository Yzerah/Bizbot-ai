import type { Metadata } from "next";
import type { BlogPost } from "@/content/blog/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function blogPostUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

const BLOG_TITLE = "מדריכים לעסק קטן: אתר, פניות והצעות מחיר";
const BLOG_DESCRIPTION =
  "מדריכים בעברית לעסקים קטנים: מה לכלול באתר, מתי מספיק דף נחיתה, איך לקבל פניות, ואיך לכתוב הצעת מחיר. מידע כללי, לא ייעוץ.";

export function blogIndexMetadata(): Metadata {
  const url = `${SITE_URL}/blog`;
  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    alternates: { canonical: url, languages: { he: url } },
    openGraph: {
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      locale: "he_IL",
      type: "website",
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: BLOG_TITLE }],
    },
    twitter: { card: "summary_large_image", title: BLOG_TITLE, description: BLOG_DESCRIPTION, images: ["/og/blog.png"] },
  };
}

export function articleMetadata(post: BlogPost): Metadata {
  const url = blogPostUrl(post.slug);
  const publishedTime = `${post.publishedAt}T00:00:00+02:00`;
  const modifiedTime = `${post.updatedAt}T00:00:00+02:00`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: url, languages: { he: url } },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      locale: "he_IL",
      publishedTime,
      modifiedTime,
      authors: [SITE_NAME],
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ["/og/blog.png"] },
  };
}

export function blogIndexJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "הבלוג של BizBot",
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    inLanguage: "he",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: "he",
      url: blogPostUrl(post.slug),
    })),
  };
}

export function articleJsonLd(post: BlogPost) {
  const url = blogPostUrl(post.slug);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      inLanguage: "he",
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "בלוג", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}

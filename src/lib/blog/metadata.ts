import type { Metadata } from "next";
import type { BlogPost } from "./types";

export function articleMetadata(post: BlogPost): Metadata {
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      type: "article",
      locale: "he_IL",
      siteName: "BizBot",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export const blogIndexMetadata: Metadata = {
  title: "בלוג",
  description:
    "מדריכים בעברית לעצמאים ולעסקים קטנים: הצעת מחיר, הסכם שירות, תמחור שעתי מול פרויקט, וגבייה.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "הבלוג של BizBot",
    description:
      "מדריכים בעברית לעצמאים ולעסקים קטנים: הצעת מחיר, הסכם שירות, תמחור שעתי מול פרויקט, וגבייה.",
    url: "/blog",
    type: "website",
    locale: "he_IL",
    siteName: "BizBot",
  },
};

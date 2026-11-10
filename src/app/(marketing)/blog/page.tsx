import type { Metadata } from "next";
import Link from "next/link";
import { blogIndexMetadata } from "@/lib/blog/metadata";
import { formatHebrewDate, readingMinutes } from "@/lib/blog/format";
import { articleWordCount, getAllPosts } from "@/lib/blog/posts";
import { BlogCta } from "@/components/blog/BlogCta";

export const metadata: Metadata = blogIndexMetadata;

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <p className="text-sm font-medium text-royal-600">BizBot</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">בלוג</h1>
      <p className="mt-4 text-lg leading-relaxed text-neutral-600">
        מדריכים מעשיים לעצמאים ולעסקים קטנים בישראל: איך לנסח הצעת מחיר, מה לשים בהסכם שירות קצר, איך לבחור בין מחיר לשעה למחיר לפרויקט, ומה לסגור מראש כדי שגבייה לא תהפוך להפתעה.
      </p>
      <ul className="mt-10 space-y-4">
        {posts.map((post) => {
          const minutes = readingMinutes(articleWordCount(post));
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="card block p-6 transition hover:border-royal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-600 sm:p-7"
              >
                <div className="text-xs font-semibold text-royal-600">{post.kicker}</div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{post.title}</h2>
                <p className="mt-2 leading-relaxed text-neutral-600">{post.description}</p>
                <p className="mt-4 text-sm text-neutral-500">
                  <time dateTime={post.publishedAt}>{formatHebrewDate(post.publishedAt)}</time>
                  <span aria-hidden="true"> · </span>
                  <span>{minutes} דקות קריאה</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      <BlogCta />
    </div>
  );
}

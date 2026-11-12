import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { ArticleDisclaimer } from "@/components/blog/ArticleDisclaimer";
import { JsonLd } from "@/components/blog/JsonLd";
import { posts } from "@/content/blog/posts";
import { postWordCount, readingMinutes } from "@/content/blog/text";
import { formatDate } from "@/lib/format";
import { blogIndexJsonLd, blogIndexMetadata } from "@/lib/blog-seo";

export const dynamic = "force-static";

export const metadata: Metadata = blogIndexMetadata();

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <JsonLd data={blogIndexJsonLd(posts)} />
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-royal-600">בלוג BizBot</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">מדריכים לעסק קטן: אתר, פניות והצעות מחיר</h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          מה לשים באתר, מתי מספיק עמוד אחד, איך פנייה מגיעה מהעמוד, ואיך לנסח הצעת מחיר אחרי השיחה. הכל בעברית, בלי מחירון מומצא ובלי הבטחות על דירוג.
        </p>
      </div>
      <div className="mt-6 max-w-3xl">
        <ArticleDisclaimer />
      </div>
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => {
          const words = postWordCount(post);
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="card block h-full p-6 transition hover:border-royal-200">
                <p className="text-sm text-neutral-500">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden> · </span>
                  <span>{readingMinutes(words)} דקות קריאה</span>
                </p>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-ink">{post.title}</h2>
                <p className="mt-2 leading-relaxed text-neutral-600">{post.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-12">
        <ArticleCta />
      </div>
    </div>
  );
}

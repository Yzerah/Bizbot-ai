import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleHeadings, BlogBody } from "@/components/blog/BlogBody";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { ArticleDisclaimer } from "@/components/blog/ArticleDisclaimer";
import { JsonLd } from "@/components/blog/JsonLd";
import { getPost, posts, relatedPosts } from "@/content/blog/posts";
import { postWordCount, readingMinutes } from "@/content/blog/text";
import { articleJsonLd, articleMetadata } from "@/lib/blog-seo";
import { formatDate } from "@/lib/format";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "המדריך לא נמצא" };
  return articleMetadata(post);
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const words = postWordCount(post);
  const headings = articleHeadings(post.blocks);
  const related = relatedPosts(post.slug);

  return (
    <article lang="he" dir="rtl" className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <JsonLd data={articleJsonLd(post)} />
      <nav aria-label="מיקום בעמוד" className="text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              דף הבית
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-ink">
              בלוג
            </Link>
          </li>
        </ol>
      </nav>
      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{post.title}</h1>
      <p className="mt-4 text-sm text-neutral-500">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden> · </span>
        <span>{readingMinutes(words)} דקות קריאה</span>
        <span aria-hidden> · </span>
        <span>BizBot</span>
      </p>
      <p className="mt-5 text-lg leading-relaxed text-neutral-600">{post.description}</p>
      <div className="mt-6">
        <ArticleDisclaimer />
      </div>
      {headings.length > 0 ? (
        <nav aria-label="תוכן המדריך" className="card mt-8 p-5">
          <p className="text-sm font-semibold text-ink">במדריך הזה</p>
          <ol className="mt-3 space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`} className="text-neutral-600 hover:text-royal-700">
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="mt-8">
        <BlogBody blocks={post.blocks} />
      </div>
      <div className="mt-12">
        <ArticleCta />
      </div>
      <section className="mt-12 border-t border-neutral-100 pt-8">
        <h2 className="text-xl font-bold text-ink">עוד בבלוג</h2>
        <ul className="mt-4 space-y-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/blog/${item.slug}`} className="font-medium text-royal-700 hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

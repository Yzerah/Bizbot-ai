import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCta } from "@/components/blog/BlogCta";
import { RichText } from "@/components/blog/RichText";
import { formatHebrewDate, readingMinutes } from "@/lib/blog/format";
import { articleJsonLd, jsonLdScript } from "@/lib/blog/json-ld";
import { LEGAL_NOTE } from "@/lib/blog/legal-note";
import { articleMetadata } from "@/lib/blog/metadata";
import { articleWordCount, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "המדריך לא נמצא" };
  return articleMetadata(post);
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readingMinutes(articleWordCount(post));
  const related = getRelatedPosts(post);
  const showUpdated = post.updatedAt !== post.publishedAt;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd(post)) }} />
      <nav aria-label="פירורי לחם" className="text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/blog" className="hover:text-ink">
              בלוג
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-700">{post.title}</li>
        </ol>
      </nav>
      <p className="mt-6 text-sm font-semibold text-royal-600">{post.kicker}</p>
      <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
      <p className="mt-4 text-sm text-neutral-500">
        <time dateTime={post.publishedAt}>{formatHebrewDate(post.publishedAt)}</time>
        {showUpdated && (
          <>
            <span aria-hidden="true"> · </span>
            <span>
              עודכן <time dateTime={post.updatedAt}>{formatHebrewDate(post.updatedAt)}</time>
            </span>
          </>
        )}
        <span aria-hidden="true"> · </span>
        <span>{minutes} דקות קריאה</span>
      </p>
      <p className="mt-6 text-lg leading-relaxed text-neutral-600">{post.description}</p>

      {post.legalNote && (
        <aside className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-700">
          <p className="font-semibold text-ink">זה לא ייעוץ משפטי</p>
          <p className="mt-1">{LEGAL_NOTE}</p>
        </aside>
      )}

      <nav aria-label="תוכן העניינים" className="mt-8 rounded-2xl border border-neutral-200 p-5">
        <div className="text-sm font-semibold">במדריך הזה</div>
        <ol className="mt-3 list-decimal space-y-2 pr-5 text-sm text-neutral-700 marker:text-neutral-400">
          {post.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:text-royal-600">
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-neutral-700">
        {post.intro.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        {post.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-ink">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-neutral-700">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pr-5">
                  {section.list.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <BlogCta />

      {related.length > 0 && (
        <section aria-labelledby="related-guides" className="mt-12 border-t border-neutral-100 pt-8">
          <h2 id="related-guides" className="text-xl font-bold tracking-tight">
            עוד במדריכים
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="font-medium text-royal-600 hover:underline">
                  {item.title}
                </Link>
                <p className="text-sm text-neutral-500">{item.kicker}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

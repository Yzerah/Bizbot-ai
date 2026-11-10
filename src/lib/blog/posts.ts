import { clientNotPaying } from "./content/client-not-paying";
import { freelancerPricing } from "./content/freelancer-pricing";
import { freelancerServiceAgreement } from "./content/freelancer-service-agreement";
import { howToWritePriceQuote } from "./content/how-to-write-price-quote";
import { priceQuoteTemplate } from "./content/price-quote-template";
import { countWords } from "./format";
import type { BlogPost } from "./types";

/**
 * To add an article: create a typed object in `./content` and append it here.
 * The index, article pages, and sitemap all read this list.
 */
export const posts: BlogPost[] = [
  howToWritePriceQuote,
  freelancerServiceAgreement,
  freelancerPricing,
  clientNotPaying,
  priceQuoteTemplate,
].sort((a, b) => a.order - b.order);

const bySlug = new Map(posts.map((post) => [post.slug, post]));

export function getAllPosts() {
  return posts;
}

export function getPost(slug: string) {
  return bySlug.get(slug);
}

export function getRelatedPosts(post: BlogPost) {
  return post.relatedSlugs.flatMap((slug) => {
    const related = bySlug.get(slug);
    return related ? [related] : [];
  });
}

export function articleText(post: BlogPost) {
  return [
    ...post.intro,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.list ?? [])]),
  ];
}

export function articleWordCount(post: BlogPost) {
  return countWords(articleText(post));
}

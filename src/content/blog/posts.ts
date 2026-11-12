import type { BlogPost } from "./types";
import freelancerPricing from "./articles/freelancer-pricing";
import freelancerServiceAgreement from "./articles/freelancer-service-agreement";
import landingPageOrWebsite from "./articles/landing-page-or-website";
import leadsFromASmallSite from "./articles/leads-from-a-small-site";
import paymentTerms from "./articles/payment-terms";
import quoteExample from "./articles/quote-example-design-website";
import quoteThatCloses from "./articles/quote-that-closes";
import smallBusinessSiteChecklist from "./articles/small-business-site-checklist";

/** Reading order for the index. Do not sort alphabetically or by date. */
export const posts: BlogPost[] = [
  smallBusinessSiteChecklist,
  landingPageOrWebsite,
  leadsFromASmallSite,
  quoteThatCloses,
  quoteExample,
  freelancerPricing,
  paymentTerms,
  freelancerServiceAgreement,
];

const bySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string) {
  return bySlug.get(slug);
}

export function relatedPosts(slug: string, limit = 3) {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return [];
  const related: BlogPost[] = [];
  for (let step = 1; related.length < limit && step < posts.length; step++) {
    related.push(posts[(index + step) % posts.length]);
  }
  return related;
}

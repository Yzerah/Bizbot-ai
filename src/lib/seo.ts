import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: SELLER_EMAIL,
    description,
    areaServed: "IL",
    founder: { "@type": "Person", name: SELLER_NAME },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

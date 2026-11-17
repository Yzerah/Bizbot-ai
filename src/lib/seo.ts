import type { Metadata } from "next";
import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Absolute production URL. Canonicals stay on bizbot-ai.co.il even in preview. */
export function absoluteUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

/** Meta-tag verification. Omitted until the env var is set. The HTML file method does not need it. */
export const googleVerification: Metadata["verification"] | undefined = googleSiteVerification
  ? { google: googleSiteVerification }
  : undefined;

export function publicMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  ogTitle?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const ogTitle = input.ogTitle ?? input.title;
  const image = input.image ?? "/og/home.png";
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url, languages: { he: url } },
    openGraph: {
      title: ogTitle,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: "he_IL",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: input.imageAlt ?? ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: input.description,
      images: [image],
    },
  };
}

export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: SITE_NAME,
    url: SITE_URL,
    email: SELLER_EMAIL,
    description,
    areaServed: { "@type": "Country", "name": "Israel" },
    founder: { "@type": "Person", name: SELLER_NAME },
    inLanguage: "he",
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "he",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

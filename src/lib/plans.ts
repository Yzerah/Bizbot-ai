import { SITE_URL } from "@/lib/site";

export const FREE_QUOTE_LIMIT = 3;

export type PlanId = "FREE" | "PRO" | "BUSINESS";

export const PLANS: {
  id: PlanId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}[] = [
  {
    id: "FREE",
    name: "חינם",
    price: 0,
    tagline: "להתנסות בלי כרטיס אשראי",
    features: [
      `${FREE_QUOTE_LIMIT} הצעות מחיר`,
      "PDF מקצועי בעברית",
      "לוגו ופרטי העסק",
      "חישוב מע״מ אוטומטי",
    ],
  },
  {
    id: "PRO",
    name: "PRO",
    price: 29,
    tagline: "לעצמאים שמוציאים הצעות כל שבוע",
    features: [
      "הצעות מחיר ללא הגבלה",
      "כל מה שבמסלול החינם",
      "שמירה, עריכה והורדה חוזרת",
      "פרטי העסק נשמרים אוטומטית",
      "ביטול בכל עת",
    ],
    highlighted: true,
  },
  {
    id: "BUSINESS",
    name: "BUSINESS",
    price: 59,
    tagline: "לעסקים עם צוות",
    features: [
      "כל מה שב-PRO",
      "מספר משתמשים לעסק (בקרוב)",
      "תבניות הצעה מותאמות (בקרוב)",
      "תמיכה מועדפת",
      "ביטול בכל עת",
    ],
  },
];

export function isPaid(plan: string) {
  return plan === "PRO" || plan === "BUSINESS";
}

export function quoteOffersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "מסלולי BizBot להצעות מחיר",
    itemListElement: PLANS.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: `BizBot ${plan.name}`,
        description: plan.tagline,
        price: String(plan.price),
        priceCurrency: "ILS",
        url: `${SITE_URL}/pricing`,
        ...(plan.price > 0
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(plan.price),
                priceCurrency: "ILS",
                unitText: "MONTH",
              },
            }
          : {}),
      },
    })),
  };
}

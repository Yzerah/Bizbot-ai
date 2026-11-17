import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalNav } from "@/components/LegalNav";
import { MerchantOfRecordNotice } from "@/components/MerchantOfRecordNotice";
import { PricingCards } from "@/components/PricingCards";
import { PLANS, quoteOffersJsonLd } from "@/lib/plans";
import { SELLER_EMAIL } from "@/lib/seller";
import {
  WEBSITE_HOSTED_PRO_BENEFIT,
  WEBSITE_HOSTING,
  WEBSITE_INCLUDED_HOSTING_MONTHS,
  WEBSITE_PACKAGES,
  formatShekel,
} from "@/lib/website-packages";

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;
const pricingDescription = `מסלול חינם עם 3 הצעות. PRO ב-${pro.price} ₪ לחודש, BUSINESS ב-${business.price} ₪ לחודש. מנוי חודשי, אפשר לבטל בכל עת.`;

export const metadata: Metadata = {
  title: "מחירים",
  description: pricingDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "מחירי הצעות המחיר",
    description: pricingDescription,
    url: "/pricing",
    locale: "he_IL",
    siteName: "BizBot",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: `PRO ${pro.price} ₪, BUSINESS ${business.price} ₪` }],
  },
  twitter: { card: "summary_large_image", title: "מחירי הצעות המחיר", description: pricingDescription, images: ["/og/pricing.png"] },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <JsonLd data={quoteOffersJsonLd()} />
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">מחירים פשוטים ושקופים</h1>
        <p className="mt-4 text-lg text-neutral-600">
          המחירים בשקלים חדשים (ILS) לחודש. מתחילים עם 3 הצעות מחיר בחינם. מסלול בתשלום הוא מנוי חודשי, ואפשר לבטל בכל עת.
        </p>
      </div>
      <PricingCards />
      <section className="mx-auto mt-20 max-w-3xl border-t border-neutral-100 pt-14">
        <h2 className="text-2xl font-bold tracking-tight">בניית אתר</h2>
        <p className="mt-3 leading-relaxed text-neutral-600">
          לא בונים לבד במערכת. מקבלים אתר מוכן תוך 48 שעות, אחרי שיש תוכן בסיסי ואישור לחבילה. זה שירות נפרד ממנוי ההצעות, וההזמנה אינה עוברת דרך Paddle.
        </p>
        <ul className="mt-6 space-y-2 text-sm leading-relaxed text-neutral-700">
          {WEBSITE_PACKAGES.map((pkg) => (
            <li key={pkg.id}>
              <strong className="text-ink">{pkg.name}</strong>
              {": "}
              <span className="num">{formatShekel(pkg.price)}</span>
              {", "}
              {pkg.unit}. {pkg.summary}
            </li>
          ))}
          <li>
            <strong className="text-ink">{WEBSITE_HOSTING.name}</strong>
            {": "}
            {WEBSITE_INCLUDED_HOSTING_MONTHS} החודשים הראשונים כלולים בכל חבילה. מהחודש הרביעי{" "}
            <span className="num">{formatShekel(WEBSITE_HOSTING.price)}</span> {WEBSITE_HOSTING.unit}.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          {WEBSITE_HOSTED_PRO_BENEFIT} כל עוד האתר מאוחסן אצלנו. כשהאחסון אצלנו נגמר, ההטבה נגמרת.
        </p>
        <Link href="/websites" className="btn-primary mt-6">
          לפרטים ולהשארת פרטים
        </Link>
      </section>
      <div className="mx-auto mt-14 max-w-3xl space-y-4 rounded-2xl border border-neutral-200 p-6 text-sm leading-relaxed text-neutral-600">
        <div>
          <div className="mb-2 font-semibold text-ink">מה משלמים</div>
          <ul className="space-y-1">
            {PLANS.map((plan) => (
              <li key={plan.id}>
                <strong className="text-ink">{plan.name}</strong>
                {": "}
                {plan.price === 0 ? "0 ₪ לתמיד" : <><span className="num">{plan.price} ₪</span> לחודש</>}
                {". "}
                {plan.features.join(" · ")}.
              </li>
            ))}
          </ul>
        </div>
        <p>
          מסלול בתשלום מתחדש אוטומטית כל חודש עד לביטול. הביטול נכנס לתוקף בסוף התקופה ששולמה. מס, אם חל, מחושב ומוצג
          בקופה לפני אישור התשלום. פריטים שמסומנים «בקרוב» עדיין אינם זמינים.
        </p>
        <MerchantOfRecordNotice />
        <p>
          לפני תשלום חלים <Link href="/terms" className="text-royal-600 hover:underline">תנאי השימוש</Link> ו<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link> (14 יום).
          שאלות:{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>
          .
        </p>
        <LegalNav className="flex flex-wrap gap-4" />
        <p>
          BizBot מפיק <strong>הצעות מחיר</strong>. הצעת מחיר אינה חשבונית מס, קבלה או חוזה. להפקת חשבוניות מס יש להשתמש
          במערכת המאושרת על ידי רשות המסים.
        </p>
      </div>
    </div>
  );
}

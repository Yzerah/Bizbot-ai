import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LeadsPrice } from "@/components/LeadsPrice";
import { LegalNav } from "@/components/LegalNav";
import { MerchantOfRecordNotice } from "@/components/MerchantOfRecordNotice";
import { PricingCards } from "@/components/PricingCards";
import { PLANS, quoteOffersJsonLd } from "@/lib/plans";
import { SELLER_EMAIL } from "@/lib/seller";
import { LEADS_OFFER, LEADS_PARTS, formatShekel, leadsPriceSummary, websiteOffersJsonLd } from "@/lib/website-packages";

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;
const pricingDescription = `מערכת לידים מגוגל לקבלני שיפוצים: ${leadsPriceSummary()} מחולל ההצעות לבד: חינם ל-3 מסמכים, PRO ב-${pro.price} ₪ לחודש, BUSINESS ב-${business.price} ₪ לחודש.`;

export const metadata: Metadata = {
  title: "מחיר מערכת הלידים",
  description: pricingDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `הקמה ${formatShekel(LEADS_OFFER.setupPrice)}, ואחר כך ${formatShekel(LEADS_OFFER.monthlyPrice)} לחודש`,
    description: pricingDescription,
    url: "/pricing",
    locale: "he_IL",
    siteName: "BizBot",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: `הקמה ${formatShekel(LEADS_OFFER.setupPrice)}, חודשי ${formatShekel(LEADS_OFFER.monthlyPrice)}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `הקמה ${formatShekel(LEADS_OFFER.setupPrice)}, ואחר כך ${formatShekel(LEADS_OFFER.monthlyPrice)} לחודש`,
    description: pricingDescription,
    images: ["/og/pricing.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <JsonLd data={websiteOffersJsonLd("/pricing")} />
      <JsonLd data={quoteOffersJsonLd()} />
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-medium text-royal-700">לקבלני שיפוצים</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">מחיר אחד למערכת</h1>
        <p className="mt-4 text-lg text-neutral-600">
          {formatShekel(LEADS_OFFER.setupPrice)} הקמה, ו-{formatShekel(LEADS_OFFER.monthlyPrice)} לחודש. דמי ההקמה משולמים אחרי שאתם מאשרים את מה שנבנה.
        </p>
      </div>
      <LeadsPrice />
      <ul className="mx-auto mt-8 grid max-w-3xl gap-2 text-sm leading-relaxed text-neutral-700">
        {LEADS_PARTS.map((part) => (
          <li key={part.title}>
            <strong className="text-ink">{part.title}.</strong> {part.text}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600">
        אם תוך {LEADS_OFFER.guaranteeDays} יום מהעלייה לאוויר לא נכנסת אף פנייה, דמי ההקמה חוזרים. פנייה היא שיחת טלפון או פרטים שהושאירו מהדף או מהפרופיל. הפירוט ב<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link>.
      </p>

      <section id="quotes" className="mx-auto mt-20 max-w-6xl scroll-mt-20 border-t border-neutral-100 pt-14">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">מחולל הצעות מחיר לבד</h2>
          <p className="mt-3 text-neutral-600">
            במערכת הלידים המחולל כלול. המסלולים כאן הם למי שרוצה רק את הכלי, בלי פרופיל ובלי דף. מנוי חודשי, ואפשר לבטל בכל עת.
          </p>
        </div>
        <PricingCards />
      </section>

      <div className="mx-auto mt-14 max-w-3xl space-y-4 rounded-2xl border border-neutral-200 p-6 text-sm leading-relaxed text-neutral-600">
        <div>
          <div className="mb-2 font-semibold text-ink">מה משלמים על הכלי לבד</div>
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
          מסלול בתשלום של המחולל מתחדש אוטומטית כל חודש עד לביטול. הביטול נכנס לתוקף בסוף התקופה ששולמה. מס, אם חל, מחושב ומוצג
          בקופה לפני אישור התשלום. פריטים שמסומנים «בקרוב» עדיין אינם זמינים. מערכת הלידים אינה מנוי של המחולל.
        </p>
        <MerchantOfRecordNotice />
        <p>
          לפני תשלום על המחולל חלים <Link href="/terms" className="text-royal-600 hover:underline">תנאי השימוש</Link> ו<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link> (14 יום על חיוב המנוי).
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

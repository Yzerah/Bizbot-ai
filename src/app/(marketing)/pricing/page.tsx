import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalNav } from "@/components/LegalNav";
import { MerchantOfRecordNotice } from "@/components/MerchantOfRecordNotice";
import { PricingCards } from "@/components/PricingCards";
import { PLANS, quoteOffersJsonLd } from "@/lib/plans";
import { SELLER_EMAIL } from "@/lib/seller";

export const metadata: Metadata = { title: "מחירים" };

export default function PricingPage() {
  const origin = (process.env.NEXT_PUBLIC_APP_URL || "https://bizbot-ai.co.il").replace(/\/$/, "");
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <JsonLd data={quoteOffersJsonLd(origin)} />
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">מחירים פשוטים ושקופים</h1>
        <p className="mt-4 text-lg text-neutral-600">
          המחירים בשקלים חדשים (ILS) לחודש. מתחילים עם 3 הצעות מחיר בחינם. מסלול בתשלום הוא מנוי חודשי, ואפשר לבטל בכל עת.
        </p>
      </div>
      <PricingCards />
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

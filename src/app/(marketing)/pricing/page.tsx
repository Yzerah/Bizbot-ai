import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "מחירים" };

export default async function PricingPage() {
  const user = await getCurrentUser();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">מחירים פשוטים ושקופים</h1>
        <p className="mt-4 text-lg text-neutral-600">
          מתחילים עם 3 הצעות מחיר בחינם. מסלולים בתשלום הם מנוי חודשי — אפשר לבטל בכל עת.
        </p>
      </div>
      <PricingCards loggedIn={!!user} />
      <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-neutral-200 p-6 text-sm leading-relaxed text-neutral-600">
        <div className="mb-1 font-semibold text-ink">חשוב לדעת</div>
        BizBot מפיק <strong>הצעות מחיר</strong>. הצעת מחיר אינה חשבונית מס, קבלה או חוזה. להפקת חשבוניות מס יש להשתמש
        במערכת המאושרת על ידי רשות המסים.
      </div>
    </div>
  );
}

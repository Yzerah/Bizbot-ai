import type { Metadata } from "next";
import Link from "next/link";
import { LegalNav } from "@/components/LegalNav";
import { SELLER_BRAND, SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export const metadata: Metadata = { title: "יצירת קשר" };

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 leading-relaxed text-neutral-700">
      <h1 className="text-3xl font-bold text-ink">יצירת קשר</h1>
      <p className="mt-4">
        {SELLER_BRAND} מופעל על ידי {SELLER_NAME}, עוסק עצמאי בישראל. לכל שאלה על המוצר, על חשבון, על חיוב או על פרטיות
        אפשר לכתוב ישירות:
      </p>
      <p className="mt-6">
        <a className="text-2xl font-semibold text-royal-600 hover:underline" dir="ltr" href={`mailto:${SELLER_EMAIL}`}>
          {SELLER_EMAIL}
        </a>
      </p>
      <p className="mt-4 text-sm text-neutral-500">נשתדל לחזור תוך שני ימי עסקים.</p>

      <h2 className="mt-10 text-xl font-semibold text-ink">במה אפשר לעזור</h2>
      <ul className="mt-3 list-disc space-y-1.5 pr-5">
        <li>שימוש ב-BizBot, הצעות מחיר וחשבון</li>
        <li>מנוי, ביטול וחשבונית. חיוב והחזר כספי מעובדים על ידי Paddle.com</li>
        <li>בקשת עיון, תיקון או מחיקה של מידע אישי</li>
      </ul>
      <p className="mt-4">
        להחזר כספי תוך 14 יום אפשר גם לפנות ישירות ל-Paddle בכתובת{" "}
        <a dir="ltr" className="text-royal-600 hover:underline" href="https://paddle.net">
          paddle.net
        </a>{" "}
        או דרך הקבלה שנשלחה אחרי התשלום. הפרטים המלאים נמצאים ב<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link>.
      </p>
      <LegalNav className="mt-10 flex flex-wrap gap-4 text-sm text-neutral-600" />
    </article>
  );
}

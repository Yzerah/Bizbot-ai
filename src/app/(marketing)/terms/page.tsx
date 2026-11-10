import type { Metadata } from "next";

export const metadata: Metadata = { title: "תנאי שימוש ופרטיות" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 leading-relaxed text-neutral-700">
      <h1 className="text-3xl font-bold text-ink">תנאי שימוש ופרטיות</h1>
      <p className="mt-2 text-sm text-neutral-500">גרסה ראשונית. יש להתאים עם יועץ משפטי לפני השקה מסחרית.</p>

      <h2 className="mt-10 text-xl font-semibold text-ink">השירות</h2>
      <p className="mt-2">
        BizBot הוא כלי ליצירת הצעות מחיר. המסמכים שנוצרים הם הצעות מחיר בלבד ואינם חשבונית מס, קבלה, או חוזה מחייב.
        האחריות לתוכן ההצעה, למחירים ולחישובי המס חלה על המשתמש.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">מסלולים ותשלום</h2>
      <p className="mt-2">
        מסלול החינם כולל 3 הצעות מחיר. מסלולי PRO ו-BUSINESS הם מנוי חודשי שניתן לבטל בכל עת; הביטול נכנס לתוקף בסוף תקופת
        החיוב הנוכחית.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink">פרטיות</h2>
      <p className="mt-2">
        אנחנו שומרים את פרטי החשבון (אימייל וסיסמה מוצפנת) ואת תוכן ההצעות שיצרת, כדי שתוכל לערוך ולהוריד אותן שוב. איננו
        מוכרים מידע לצד שלישי.
      </p>
    </article>
  );
}

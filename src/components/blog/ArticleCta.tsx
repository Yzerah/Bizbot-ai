import Link from "next/link";

export function ArticleCta() {
  return (
    <aside className="rounded-2xl bg-ink px-6 py-8 text-white sm:px-8">
      <h2 className="text-2xl font-bold tracking-tight">הצעת המחיר הבאה, בלי לפתוח וורד</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-neutral-300">
        BizBot מרכיב הצעת מחיר בעברית, עם הלוגו שלכם, שורות מחיר ואפשרות לחשב מע״מ, ומוריד PDF. אפשר ליצור 3
        מסמכים בחינם, בלי כרטיס אשראי. מעבר לזה יש PRO ב-119 ₪ לחודש, או BUSINESS ב-249 ₪ לחודש.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/signup" className="btn-primary !px-6 !py-3">
          נסו 3 מסמכים בחינם
        </Link>
        <Link href="/pricing" className="btn border border-white/20 bg-transparent text-white hover:bg-white/10">
          למסלולים
        </Link>
      </div>
      <p className="mt-4 text-xs text-neutral-400">המסמך שנוצר הוא הצעת מחיר, לא חשבונית מס.</p>
    </aside>
  );
}

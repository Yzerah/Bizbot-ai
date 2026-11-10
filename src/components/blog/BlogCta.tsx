import Link from "next/link";

export function BlogCta() {
  return (
    <aside className="mt-12 rounded-2xl bg-ink px-6 py-8 text-white sm:px-8" aria-labelledby="blog-cta-title">
      <p className="text-sm font-medium text-royal-200">BizBot</p>
      <h2 id="blog-cta-title" className="mt-2 text-2xl font-bold tracking-tight">
        הצעה מסודרת, מוכנה לשליחה
      </h2>
      <p className="mt-3 max-w-xl leading-relaxed text-neutral-300">
        3 הצעות מחיר ראשונות בחינם, בלי כרטיס אשראי. PDF בעברית, עם הלוגו שלכם, שורות מחיר וחישוב מע״מ שאפשר להפעיל או לכבות.
      </p>
      <Link href="/signup" className="btn-primary mt-6">
        צרו הצעת מחיר בחינם
      </Link>
    </aside>
  );
}

import Link from "next/link";
import { DemoInquiry } from "@/components/examples/DemoInquiry";

const menu = [
  { name: "אספרסו", price: "12" },
  { name: "קפוצ׳ינו", price: "16" },
  { name: "תה נענע", price: "14" },
  { name: "קרואסון חמאה", price: "15" },
  { name: "שקשוקה", price: "42" },
  { name: "סלט ירק", price: "38" },
];

export function CafeSite() {
  return (
    <div className="bg-[#f8f1e7] text-[#3f2415]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-bold">
          <CupIcon />
          קפה תמר
        </div>
        <a href="#visit" className="rounded-full bg-[#9a3412] px-4 py-2 text-sm font-semibold text-[#fff7ed]">
          להגעה
        </a>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_0%,#fdba74_0%,transparent_55%)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24">
          <div>
            <p className="text-sm font-medium text-[#9a3412]">בית קפה שכונתי</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] sm:text-6xl">קפה, אוכל קל, ומקום לשבת.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#7c4a32]">
              עמוד לדוגמה לבית קפה. תפריט לדוגמה, שעות לדוגמה, ודרך לשאול אם יש מקום.
            </p>
            <a href="#menu" className="mt-8 inline-flex rounded-xl bg-[#9a3412] px-5 py-3 font-semibold text-[#fff7ed]">
              לתפריט
            </a>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-gradient-to-b from-[#7c2d12] to-[#431407] p-8 text-[#ffedd5] shadow-xl">
            <svg viewBox="0 0 200 160" className="mx-auto w-44" role="img" aria-label="איור של ספל">
              <path d="M40 50 h90 v40 a40 40 0 0 1-40 40 H70 a30 30 0 0 1-30-30V50Z" fill="#fdba74" />
              <path d="M130 62 h16 a18 18 0 0 1 0 36 h-16" fill="none" stroke="#fed7aa" strokeWidth="8" />
              <path d="M70 28c6 10 6 10 0 18M96 22c6 10 6 10 0 18" fill="none" stroke="#fdba74" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p className="mt-4 text-center text-sm">נפתח בבוקר. נסגר אחרי ארוחת צהריים.</p>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl font-bold">תפריט לדוגמה</h2>
        <p className="mt-2 text-sm text-[#7c4a32]">המחירים כאן הם חלק מההדגמה, לא מחירון של בית קפה אמיתי.</p>
        <ul className="mt-8 divide-y divide-[#eadccb]">
          {menu.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
              <span className="font-medium">{item.name}</span>
              <span className="num text-[#9a3412]">{item.price} ₪</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="visit" className="bg-[#fffaf3]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">שעות לדוגמה</h2>
            <dl className="mt-6 space-y-2">
              <div className="flex justify-between"><dt>ראשון–חמישי</dt><dd className="num">07:30–16:00</dd></div>
              <div className="flex justify-between"><dt>שישי</dt><dd className="num">07:30–14:00</dd></div>
              <div className="flex justify-between"><dt>שבת</dt><dd>סגור</dd></div>
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-[#7c4a32]">
              רחוב הדגמה 12. הכתובת מומצאת. באתר אמיתי מופיעה כאן הכתובת, עם מפת Google Maps של בית הקפה.
            </p>
            <div className="relative mt-4 h-44 overflow-hidden rounded-2xl bg-[#ffedd5]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,#fdba74,transparent_50%)]" />
            </div>
          </div>
          <div id="contact" className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">שאלה על מקום</h2>
            <p className="mt-2 text-sm text-[#7c4a32]">באתר אמיתי הכפתור נפתח לוואטסאפ של בית הקפה. כאן אין מספר.</p>
            <a href="#contact" className="mt-4 inline-flex rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white">
              וואטסאפ
            </a>
            <div className="mt-6">
              <DemoInquiry buttonClass="w-full rounded-xl bg-[#9a3412] px-4 py-3 font-semibold text-[#fff7ed]" />
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-sm text-[#7c4a32]">
        קפה תמר הוא עסק בדיוני.{" "}
        <Link href="/websites" className="underline">
          בניית אתר כזה ב-BizBot
        </Link>
      </footer>
    </div>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#9a3412]" fill="none" aria-hidden>
      <path d="M5 8h10v5a5 5 0 0 1-5 5H8a4 4 0 0 1-3-5V8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 9h2.5a2.5 2.5 0 0 1 0 5H15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

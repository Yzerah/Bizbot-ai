import Link from "next/link";
import { DemoInquiry } from "@/components/examples/DemoInquiry";

const services = [
  { t: "שיפוץ דירה", d: "פירוק, בנייה מחדש וגמר, לפי מה שסוגרים מראש." },
  { t: "חדרי רחצה", d: "החלפת כלים סניטריים, ריצוף ואיטום." },
  { t: "מטבחים", d: "הכנה לתשתיות והתקנה מול הנגר." },
  { t: "עבודות גמר", d: "צבע, טיח, דלתות ופרקטים." },
];

export function RenovationSite() {
  return (
    <div className="bg-[#f6f1ea] text-[#1c1917]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1c1917] text-[#fdba74]">
            <HouseIcon />
          </span>
          דקל שיפוצים
        </div>
        <a href="#contact" className="rounded-full bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white">
          לתיאום
        </a>
      </header>

      <section className="relative overflow-hidden bg-[#1c1917] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_100%_0%,#9a3412_0%,transparent_62%)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 md:grid-cols-[1.15fr_.85fr] md:py-24">
          <div>
            <p className="text-sm font-medium text-[#fdba74]">שיפוץ דירות · עבודות גמר</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] sm:text-6xl">שיפוץ ברור, בלי הפתעות באמצע.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-300">
              עמוד לדוגמה לקבלן שיפוצים. מה עושים, איפה עובדים, ואיך קובעים שיחה.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="rounded-xl bg-[#ea580c] px-5 py-3 text-center font-semibold">
                קביעת שיחה
              </a>
              <a href="#services" className="rounded-xl border border-white/20 px-5 py-3 text-center">
                מה עושים
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[2rem] bg-[#9a3412]/40 blur-2xl" />
            <svg viewBox="0 0 320 280" className="relative w-full" role="img" aria-label="איור של בית בבנייה">
              <rect x="28" y="36" width="264" height="210" rx="18" fill="#292524" />
              <path d="M48 132 L160 48 L272 132" fill="none" stroke="#fdba74" strokeWidth="8" strokeLinejoin="round" />
              <rect x="118" y="150" width="84" height="78" rx="6" fill="#44403c" />
              <rect x="58" y="156" width="42" height="36" rx="4" fill="#57534e" />
              <rect x="220" y="156" width="42" height="36" rx="4" fill="#57534e" />
              <path d="M70 210 H250" stroke="#ea580c" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-3xl font-bold">מה עושים</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <article key={service.t} className="rounded-2xl border border-[#e7e5e4] bg-white p-6">
              <h3 className="text-lg font-semibold">{service.t}</h3>
              <p className="mt-2 text-stone-600">{service.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1c1917] text-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-3">
          {[
            ["01", "שיחה", "מספרים מה צריך לשפץ ומה התקציב."],
            ["02", "היקף", "רשימת עבודות, לפני שמתחילים."],
            ["03", "ביצוע", "עבודה לפי מה שסוכם, עם עדכון במהלך הדרך."],
          ].map(([n, t, d]) => (
            <div key={n}>
              <div className="text-sm font-semibold text-[#fdba74]">{n}</div>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-stone-300">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">איפה עובדים</h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            באזור המרכז. באתר אמיתי מופיעה כאן הכתובת של העסק, אם יש משרד או אולם תצוגה.
          </p>
          <div className="relative mt-6 h-52 overflow-hidden rounded-2xl bg-[#e7e5e4]">
            <div className="absolute inset-0 bg-[linear-gradient(#d6d3d1_1px,transparent_1px),linear-gradient(90deg,#d6d3d1_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#9a3412] text-white">
              <PinIcon />
            </div>
          </div>
          <p className="mt-2 text-xs text-stone-500">מפה לדוגמה. באתר אמיתי מופיעה כאן מפת Google Maps של העסק.</p>
        </div>
        <div id="contact" className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">קביעת שיחה</h2>
          <p className="mt-2 text-sm text-stone-600">באתר אמיתי הכפתור נפתח לוואטסאפ של הקבלן. כאן אין מספר.</p>
          <a href="#contact" className="mt-4 inline-flex rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white">
            וואטסאפ
          </a>
          <div className="mt-6">
            <DemoInquiry buttonClass="w-full rounded-xl bg-[#1c1917] px-4 py-3 font-semibold text-white" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e7e5e4] px-5 py-8 text-center text-sm text-stone-500">
        דקל שיפוצים הוא עסק בדיוני.{" "}
        <Link href="/websites" className="underline">
          בניית אתר כזה ב-BizBot
        </Link>
      </footer>
    </div>
  );
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Zm0-9.2A2.8 2.8 0 1 1 12 7.2a2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
}

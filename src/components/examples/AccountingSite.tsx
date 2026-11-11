import Link from "next/link";
import { DemoInquiry } from "@/components/examples/DemoInquiry";

const services = [
  { t: "הנהלת חשבונות", d: "קליטת חשבוניות, התאמות בנק וכרטסת שוטפת." },
  { t: "מע״מ ומקדמות", d: "דיווח במועד, לפי סוג העוסק שסוכם מראש." },
  { t: "תלושי שכר", d: "הכנת תלושים לעובדים. לא כולל גיוס או ניהול צוות." },
];

const hours = [
  ["ראשון–חמישי", "09:00–17:00"],
  ["שישי", "09:00–13:00"],
  ["שבת", "סגור"],
];

export function AccountingSite() {
  return (
    <div className="bg-[#f6f3ee] text-[#1c2430]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-bold text-[#1e3a5f]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1e3a5f] text-[#f3e6cf]">
            <LedgerIcon />
          </span>
          משרד נועם
        </div>
        <a href="#contact" className="rounded-full bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white">
          לתיאום
        </a>
      </header>

      <section className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-medium text-[#8a5a2b]">הנהלת חשבונות</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.15] sm:text-5xl">המספרים מסודרים. המסמכים במקום.</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#5e6872]">
            עמוד לדוגמה למשרד הנהלת חשבונות. שירותים, שעות לדוגמה, ודרך לקבוע שיחה.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="rounded-xl bg-[#1e3a5f] px-5 py-3 text-center font-semibold text-white">
              קביעת שיחה
            </a>
            <a href="#hours" className="rounded-xl border border-[#e4d7c3] bg-white px-5 py-3 text-center">
              שעות
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#e7d3b0] to-transparent" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm">
            <svg viewBox="0 0 280 220" className="mx-auto w-full max-w-xs" role="img" aria-label="איור של גיליון חשבונות">
              <rect width="280" height="220" rx="24" fill="#f6f3ee" />
              <rect x="46" y="34" width="188" height="152" rx="10" fill="#fff" stroke="#1e3a5f" strokeWidth="3" />
              <path d="M140 34v152" stroke="#1e3a5f" strokeWidth="2" />
              <path d="M66 68h56M66 90h56M66 112h40M66 134h48" stroke="#c4b49a" strokeWidth="4" strokeLinecap="round" />
              <path d="M158 68h56M158 90h56M158 112h56" stroke="#e6dfd2" strokeWidth="4" strokeLinecap="round" />
              <rect x="158" y="128" width="56" height="18" rx="4" fill="#8a5a2b" />
            </svg>
            <p className="mt-4 text-center text-sm text-[#5e6872]">איור, לא תמונה של המשרד.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="text-3xl font-bold">שירותים</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.t} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1e3a5f]">{service.t}</h3>
              <p className="mt-2 text-[#5e6872]">{service.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1e3a5f] text-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-3">
          {[
            ["01", "מסמכים", "חשבוניות, קבלות ודפי בנק מגיעים למשרד."],
            ["02", "קליטה", "התאמות וכרטסת, לפי מה שסוכם מראש."],
            ["03", "דיווח", "מע״מ ומקדמות במועד שסוכם."],
          ].map(([n, t, d]) => (
            <div key={n}>
              <div className="text-sm font-semibold text-[#e7d3b0]">{n}</div>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-white/75">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="hours" className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">שעות לדוגמה</h2>
            <p className="mt-2 text-sm text-[#5e6872]">השעות כאן הן חלק מההדגמה, לא שעות של מקום אמיתי.</p>
            <dl className="mt-6 divide-y divide-[#efe6d8]">
              {hours.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between py-3">
                  <dt>{day}</dt>
                  <dd className="num font-medium">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-3xl font-bold">איפה</h2>
            <p className="mt-3 text-[#5e6872]">באתר אמיתי מופיעה כאן כתובת המשרד, עם מפת Google Maps של המקום.</p>
            <div className="relative mt-6 h-52 overflow-hidden rounded-2xl bg-[#f3e6cf]">
              <div className="absolute inset-0 bg-[linear-gradient(#e7d3b0_1px,transparent_1px),linear-gradient(90deg,#e7d3b0_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1e3a5f] text-[#f3e6cf]">
                <span className="text-lg" aria-hidden>●</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-xl px-5 py-16">
        <h2 className="text-3xl font-bold">קביעת שיחה</h2>
        <p className="mt-2 text-sm text-[#5e6872]">באתר אמיתי הכפתור נפתח לוואטסאפ של המשרד. כאן אין מספר.</p>
        <a href="#contact" className="mt-4 inline-flex rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white">
          וואטסאפ
        </a>
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <DemoInquiry buttonClass="w-full rounded-xl bg-[#1e3a5f] px-4 py-3 font-semibold text-white" />
        </div>
      </section>

      <footer className="border-t border-[#e6dfd2] px-5 py-8 text-center text-sm text-[#5e6872]">
        משרד נועם הוא עסק בדיוני.{" "}
        <Link href="/websites" className="underline">
          בניית אתר כזה ב-BizBot
        </Link>
      </footer>
    </div>
  );
}

function LedgerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M6 4.5h12v15H8.5A2.5 2.5 0 0 1 6 17V4.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 8.5h6M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

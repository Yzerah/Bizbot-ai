import Link from "next/link";
import { DemoInquiry } from "@/components/examples/DemoInquiry";

const services = [
  { t: "פיזיותרפיה", d: "טיפול בכאב גב, צוואר וכתף." },
  { t: "שיקום", d: "חזרה לתנועה אחרי פציעה, בקצב של המטופל." },
  { t: "ייעוץ תנועה", d: "תרגילים שאפשר להמשיך בבית." },
];

const hours = [
  ["ראשון–חמישי", "08:00–19:00"],
  ["שישי", "08:00–13:00"],
  ["שבת", "סגור"],
];

export function ClinicSite() {
  return (
    <div className="bg-[#f3f7f5] text-[#14221e]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-bold text-[#0f766e]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ccfbf1]">
            <LeafIcon />
          </span>
          קליניקת אלה
        </div>
        <a href="#contact" className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white">
          לתיאום
        </a>
      </header>

      <section className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-medium text-[#0f766e]">פיזיותרפיה</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.15] sm:text-5xl">טיפול שקט, בלי להמתין על הקו.</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#3f534c]">
            עמוד לדוגמה לקליניקה. שירותים, שעות לדוגמה, ודרך לקבוע תור. אין כאן הבטחה רפואית.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="rounded-xl bg-[#0f766e] px-5 py-3 text-center font-semibold text-white">
              קביעת תור
            </a>
            <a href="#hours" className="rounded-xl border border-[#99f6e4] bg-white px-5 py-3 text-center">
              שעות
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#99f6e4] to-transparent" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm">
            <svg viewBox="0 0 280 220" className="mx-auto w-full max-w-xs" role="img" aria-label="איור של עלה">
              <rect width="280" height="220" rx="24" fill="#f0fdfa" />
              <path d="M150 180 C70 160 48 80 140 40 C200 90 210 150 150 180Z" fill="#14b8a6" />
              <path d="M146 170 C130 120 120 80 150 48" fill="none" stroke="#0f766e" strokeWidth="3" />
            </svg>
            <p className="mt-4 text-center text-sm text-[#3f534c]">איור, לא תמונה של הקליניקה.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="text-3xl font-bold">טיפולים</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.t} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0f766e]">{service.t}</h3>
              <p className="mt-2 text-[#3f534c]">{service.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="hours" className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">שעות לדוגמה</h2>
            <p className="mt-2 text-sm text-[#3f534c]">השעות כאן הן חלק מההדגמה, לא שעות של מקום אמיתי.</p>
            <dl className="mt-6 divide-y divide-[#d1fae5]">
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
            <p className="mt-3 text-[#3f534c]">באתר אמיתי מופיעה כאן כתובת הקליניקה, עם מפת Google Maps של המקום.</p>
            <div className="relative mt-6 h-52 overflow-hidden rounded-2xl bg-[#ccfbf1]">
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,#5eead4,transparent_45%),radial-gradient(circle_at_70%_60%,#99f6e4,transparent_40%)]" />
              <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0f766e] text-white">
                <span className="text-lg" aria-hidden>●</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-xl px-5 py-16">
        <h2 className="text-3xl font-bold">קביעת תור</h2>
        <p className="mt-2 text-sm text-[#3f534c]">באתר אמיתי הכפתור נפתח לוואטסאפ של הקליניקה. כאן אין מספר.</p>
        <a href="#contact" className="mt-4 inline-flex rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white">
          וואטסאפ
        </a>
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <DemoInquiry buttonClass="w-full rounded-xl bg-[#0f766e] px-4 py-3 font-semibold text-white" />
        </div>
      </section>

      <footer className="border-t border-[#d1fae5] px-5 py-8 text-center text-sm text-[#3f534c]">
        קליניקת אלה היא עסק בדיוני.{" "}
        <Link href="/websites" className="underline">
          בניית אתר כזה ב-BizBot
        </Link>
      </footer>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0f766e]" fill="currentColor" aria-hidden>
      <path d="M19 4s-9 1-13 8 1 9 1 9 6-1 9-6 3-11 3-11Z" />
    </svg>
  );
}

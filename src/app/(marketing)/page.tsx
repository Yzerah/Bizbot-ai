import Link from "next/link";
import { PricingCards } from "@/components/PricingCards";
import { QuotePreviewMock } from "@/components/QuotePreviewMock";
import { getCurrentUser } from "@/lib/auth";

const steps = [
  { n: "01", t: "ממלאים פרטים", d: "שם העסק, לוגו, פרטי הלקוח. בפעם הבאה הכול כבר ממולא." },
  { n: "02", t: "מוסיפים שורות", d: "תיאור, כמות ומחיר. הסכומים והמע״מ מחושבים לבד." },
  { n: "03", t: "מורידים PDF", d: "הצעת מחיר נקייה בעברית, מוכנה לשליחה בוואטסאפ או במייל." },
];

const features = [
  { t: "PDF מקצועי בעברית", d: "עימוד מימין לשמאל, טיפוגרפיה נקייה, נראה כמו של משרד גדול." },
  { t: "הלוגו והפרטים שלך", d: "שם העסק, טלפון, אימייל ומספר עוסק / ח.פ — על כל הצעה." },
  { t: "מע״מ 18% בלחיצה", d: "מפעילים או מכבים (למשל לעוסק פטור). החישוב מדויק עד האגורה." },
  { t: "תוקף והערות", d: "קובעים כמה ימים ההצעה בתוקף ומוסיפים תנאי תשלום או הערות." },
  { t: "כל ההצעות במקום אחד", d: "כל הצעה נשמרת. אפשר לערוך ולהוריד שוב מתי שרוצים." },
  { t: "מתאים לכל תחום", d: "מעצבים, הנדסאים, מאמנים, טכנאים, יועצים — כל עצמאי שנותן הצעת מחיר." },
];

const faq = [
  {
    q: "האם זו חשבונית מס?",
    a: "לא. BizBot מפיק הצעות מחיר בלבד. חשבוניות מס וקבלות מופקות במערכת שמאושרת על ידי רשות המסים.",
  },
  {
    q: "מה קורה אחרי 3 ההצעות החינמיות?",
    a: "אפשר להמשיך לצפות ולהוריד את ההצעות שכבר יצרת. כדי ליצור הצעות חדשות עוברים ל-PRO ב-119 ₪ לחודש.",
  },
  {
    q: "אפשר לבטל?",
    a: "כן. המסלולים בתשלום הם מנוי חודשי שאפשר לבטל בכל עת. הביטול נכנס לתוקף בסוף תקופת החיוב, ואפשר לבקש החזר תוך 14 יום לפי מדיניות ההחזרים.",
  },
  { q: "צריך כרטיס אשראי כדי להתחיל?", a: "לא. נרשמים עם אימייל וסיסמה ומתחילים מיד." },
];

export default async function Home() {
  const user = await getCurrentUser();
  const startHref = user ? "/quotes/new" : "/signup";
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_1fr] md:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-royal-600" />
              לעצמאים ולעסקים קטנים בישראל
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-[3.4rem]">
              הצעת מחיר מקצועית.
              <br />
              <span className="text-royal-600">בלי וורד, בלי אקסל.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              ממלאים את פרטי העבודה, BizBot מחשב סכומים ומע״מ ומפיק PDF מעוצב בעברית עם הלוגו שלכם — מוכן לשליחה ללקוח.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={startHref} className="btn-primary !px-7 !py-3.5 text-base">
                צור מסמך ראשון בחינם - 30 שניות
              </Link>
              <Link href="/pricing" className="btn-ghost !py-3.5">
                למחירים
              </Link>
            </div>
            <p className="mt-4 text-sm text-neutral-500">3 הצעות מחיר בחינם · בלי כרטיס אשראי · מסלולים בתשלום ניתנים לביטול בכל עת</p>
          </div>
          <QuotePreviewMock />
        </div>
      </section>

      <section id="how" className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight">שלושה צעדים, הצעה אחת מוכנה</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card p-7">
                <div className="num text-sm font-semibold text-royal-600">{s.n}</div>
                <div className="mt-3 text-lg font-semibold">{s.t}</div>
                <p className="mt-2 text-neutral-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">כל מה שצריך בהצעת מחיר. שום דבר מיותר.</h2>
          <p className="mt-3 text-neutral-600">לקוח שמקבל הצעה מסודרת סוגר מהר יותר. BizBot דואג שכל הצעה תיראה כך.</p>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="border-r-2 border-royal-600 pr-4">
              <div className="font-semibold">{f.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">מחיר פשוט</h2>
            <p className="mt-3 text-neutral-600">מתחילים בחינם. משדרגים כשזה משתלם. מבטלים בכל עת.</p>
          </div>
          <PricingCards />
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="text-3xl font-bold tracking-tight">שאלות נפוצות</h2>
          <div className="mt-8 divide-y divide-neutral-200">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="text-neutral-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">ההצעה הבאה שלך יכולה להיות מוכנה בעוד דקה.</h2>
            <p className="mt-2 text-neutral-400">3 הצעות ראשונות עלינו.</p>
          </div>
          <Link href={startHref} className="btn-primary !px-7 !py-3.5 text-base">
            צור מסמך ראשון בחינם - 30 שניות
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/PricingCards";
import { QuotePreviewMock } from "@/components/QuotePreviewMock";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getCurrentUser } from "@/lib/auth";
import { PLANS } from "@/lib/plans";
import {
  WEBSITE_AUDIENCES,
  WEBSITE_PACKAGES,
  WEBSITE_PRO_BONUS_MONTHS,
  formatShekel,
} from "@/lib/website-packages";

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;
const landing = WEBSITE_PACKAGES[0];

const description = `BizBot בונה אתר או דף נחיתה לעסק קטן בישראל תוך 48 שעות, וגם מפיק הצעות מחיר בעברית כ-PDF. אתרים מ-${formatShekel(landing.price)}. PRO לכלי ההצעות ב-${pro.price} ₪ לחודש.`;

export const metadata: Metadata = {
  title: { absolute: "BizBot — אתר מקצועי לעסק שלך תוך 48 שעות" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "אתר מקצועי לעסק שלך תוך 48 שעות",
    description,
    url: "/",
    locale: "he_IL",
    type: "website",
    siteName: "BizBot",
  },
  twitter: {
    card: "summary",
    title: "אתר מקצועי לעסק שלך תוך 48 שעות",
    description,
  },
};

const quoteSteps = [
  { n: "01", t: "ממלאים פרטים", d: "שם העסק, לוגו, פרטי הלקוח. בפעם הבאה הכול כבר ממולא." },
  { n: "02", t: "מוסיפים שורות", d: "תיאור, כמות ומחיר. הסכומים והמע״מ מחושבים לבד." },
  { n: "03", t: "מורידים PDF", d: "הצעת מחיר נקייה בעברית, מוכנה לשליחה בוואטסאפ או במייל." },
];

const quoteFaq = [
  {
    q: "האם זו חשבונית מס?",
    a: "לא. BizBot מפיק הצעות מחיר בלבד. חשבוניות מס וקבלות מופקות במערכת שמאושרת על ידי רשות המסים.",
  },
  {
    q: "מה קורה אחרי 3 ההצעות החינמיות?",
    a: `אפשר להמשיך לצפות ולהוריד את ההצעות שכבר יצרת. כדי ליצור הצעות חדשות עוברים ל-PRO ב-${pro.price} ₪ לחודש.`,
  },
  {
    q: "כמה עולה BUSINESS?",
    a: `${business.price} ₪ לחודש. כולל את מה שב-PRO, וגם תמיכה מועדפת. פריטים שמסומנים «בקרוב» עדיין אינם זמינים.`,
  },
  {
    q: "אפשר לבטל?",
    a: "כן. המסלולים בתשלום הם מנוי חודשי שאפשר לבטל בכל עת. הביטול נכנס לתוקף בסוף תקופת החיוב, ואפשר לבקש החזר תוך 14 יום לפי מדיניות ההחזרים.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();
  const startHref = user ? "/quotes/new" : "/signup";

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-royal-600" />
              לעסקים קטנים בישראל
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-[3.25rem]">
              אתר מקצועי לעסק שלך
              <br />
              <span className="text-royal-600">תוך 48 שעות.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              בונים דף נחיתה או אתר קטן: מותאם לנייד, עם וואטסאפ, טופס לידים, חיבור דומיין, <bdi>SEO</bdi> בסיסי ומפת <bdi>Google Maps</bdi> כשיש כתובת.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/websites" className="btn-primary !px-7 !py-3.5 text-base">
                לבניית אתר
              </Link>
              <Link href="/websites#examples" className="btn-ghost !py-3.5">
                לראות דוגמאות
              </Link>
              <WhatsAppLink text="היי, אשמח לשמוע על בניית אתר לעסק" className="btn-ghost !py-3.5" />
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              מ-<span className="num">{formatShekel(landing.price)}</span>
              {" · "}
              BizBot PRO ל-{WEBSITE_PRO_BONUS_MONTHS} חודשים עם כל אתר
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {WEBSITE_AUDIENCES.map((item) => (
              <div key={item.title} className="card p-4">
                <div className="font-semibold">{item.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">שלוש חבילות, מסירה תוך 48 שעות</h2>
            <p className="mt-2 text-neutral-600">דף נחיתה, אתר עד 5 עמודים, או אתר עם סבב קידום בסיסי.</p>
          </div>
          <Link href="/websites#packages" className="btn-dark">
            למחיר ולפרטים
          </Link>
        </div>
      </section>

      <section id="quotes" className="scroll-mt-20">
        <div id="how" className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold text-royal-600">גם ב-BizBot</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">הצעות מחיר ב-PDF, בלי וורד.</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              הכלי להצעות מחיר נשאר. ממלאים פרטי עבודה, BizBot מחשב סכומים ומע״מ, ומפיק PDF בעברית עם הלוגו שלכם.
              3 מסמכים בחינם. אחר כך PRO ב-<span className="num">{pro.price} ₪</span> לחודש, ו-BUSINESS ב-
              <span className="num">{business.price} ₪</span> לחודש.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={startHref} className="btn-primary">
                צור מסמך ראשון בחינם
              </Link>
              <Link href="/pricing" className="btn-ghost">
                למחירי ההצעות
              </Link>
            </div>
          </div>
          <QuotePreviewMock />
        </div>

        <div className="border-y border-neutral-100 bg-neutral-50/60">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h3 className="text-2xl font-bold tracking-tight">שלושה צעדים, הצעה אחת מוכנה</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {quoteSteps.map((step) => (
                <div key={step.n} className="card p-7">
                  <div className="num text-sm font-semibold text-royal-600">{step.n}</div>
                  <div className="mt-3 text-lg font-semibold">{step.t}</div>
                  <p className="mt-2 text-neutral-600">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold tracking-tight">מחירי כלי ההצעות</h3>
            <p className="mt-3 text-neutral-600">מתחילים בחינם. משדרגים כשזה משתלם. מבטלים בכל עת.</p>
          </div>
          <PricingCards />
        </div>

        <div className="border-t border-neutral-100">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <h3 className="text-2xl font-bold tracking-tight">שאלות על הצעות המחיר</h3>
            <div className="mt-6 divide-y divide-neutral-200">
              {quoteFaq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.q}
                    <span className="text-neutral-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-neutral-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">אתר לעסק, מוכן תוך 48 שעות.</h2>
            <p className="mt-2 text-neutral-400">משאירים פרטים, וחוזרים אליכם לשיחת אפיון קצרה.</p>
          </div>
          <Link href="/websites#lead" className="btn-primary !px-7 !py-3.5 text-base">
            השארת פרטים
          </Link>
        </div>
      </section>
    </>
  );
}

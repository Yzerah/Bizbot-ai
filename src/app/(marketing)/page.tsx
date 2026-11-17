import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PricingCards } from "@/components/PricingCards";
import { QuotePreviewMock } from "@/components/QuotePreviewMock";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { posts } from "@/content/blog/posts";
import { readingMinutes, postWordCount } from "@/content/blog/text";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { PLANS } from "@/lib/plans";
import { landings } from "@/content/seo/landings";
import { faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";
import { SITE_URL } from "@/lib/site";
import {
  WEBSITE_EXAMPLES,
  WEBSITE_HOSTED_PRO_BENEFIT,
  WEBSITE_HOSTING,
  WEBSITE_INCLUDED_HOSTING_MONTHS,
  WEBSITE_PACKAGES,
  WEBSITE_STEPS,
  formatShekel,
  websiteOffersJsonLd,
  websitePackageBenefits,
} from "@/lib/website-packages";

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;
const landing = WEBSITE_PACKAGES[0];

const description = `לא בונים לבד במערכת. BizBot מכין אתר או דף נחיתה לעסק קטן בישראל תוך 48 שעות, אחרי תוכן ואישור, וגם מפיק הצעות מחיר בעברית כ-PDF. אתרים מ-${formatShekel(landing.price)}, עם ${WEBSITE_INCLUDED_HOSTING_MONTHS} חודשי אחסון. PRO ב-${pro.price} ₪ לחודש, BUSINESS ב-${business.price} ₪ לחודש.`;

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
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "BizBot — אתר מקצועי לעסק שלך תוך 48 שעות" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "אתר מקצועי לעסק שלך תוך 48 שעות",
    description,
    images: ["/og/home.png"],
  },
};

const faq = [
  {
    q: "מתי מתחילות 48 השעות?",
    a: "מרגע שיש תוכן בסיסי, מה העסק עושה וטקסטים קצרים, ואישרתם את החבילה. לוגו, אם יש, מקצר את העבודה.",
  },
  {
    q: "מה כלול במחיר האתר?",
    a: `דף נחיתה ${formatShekel(landing.price)}, אתר עסקי ${formatShekel(WEBSITE_PACKAGES[1].price)}, או אתר + קידום ${formatShekel(WEBSITE_PACKAGES[2].price)}. כל חבילה כוללת ${WEBSITE_INCLUDED_HOSTING_MONTHS} חודשי ${WEBSITE_HOSTING.name}. מהחודש הרביעי זה ${formatShekel(WEBSITE_HOSTING.price)} לחודש. לא מצוין כאן אם המחיר כולל מע״מ.`,
  },
  {
    q: "האם 48 השעות הן התחייבות להחזר?",
    a: "לא. זה לוח הזמנים של המסירה אחרי שיש תוכן ואישור. מדיניות ההחזר של 14 יום חלה על מנוי ההצעות שמחויב ב-Paddle, והיא כתובה בעמוד ההחזרים. בניית אתר אינה הזמנה ב-Paddle.",
  },
  {
    q: "כמה עולה כלי ההצעות?",
    a: `3 מסמכים בחינם. אחר כך PRO ב-${pro.price} ₪ לחודש, או BUSINESS ב-${business.price} ₪ לחודש. באתר שמאוחסן אצלנו: ${WEBSITE_HOSTED_PRO_BENEFIT}, כל עוד האחסון פעיל.`,
  },
  {
    q: "האם ההצעה היא חשבונית מס?",
    a: "לא. BizBot מפיק הצעות מחיר בלבד. חשבוניות מס וקבלות מופקות במערכת שמאושרת על ידי רשות המסים.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();
  const startHref = user ? "/quotes/new" : "/signup";
  const latest = posts.slice(0, 3);

  return (
    <>
      <JsonLd data={organizationJsonLd(description)} />
      <JsonLd data={websiteOffersJsonLd("/")} />
      <JsonLd data={faqJsonLd(faq)} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-royal-700">לעסקים קטנים בישראל</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
              לא בונים לבד במערכת
              <span className="mt-2 block text-royal-600">מקבלים אתר מוכן תוך 48 שעות.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              בלי להרכיב את האתר לבד בבונה אתרים. דף נחיתה או אתר קטן: מותאם לנייד, עם וואטסאפ, טופס לידים, חיבור דומיין, <bdi>SEO</bdi> בסיסי ומפת <bdi>Google Maps</bdi> כשיש כתובת. 48 השעות נספרות אחרי שיש תוכן בסיסי ואישור לחבילה.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/websites#lead" className="btn-primary !px-7 !py-3.5 text-base">
                השארת פרטים לאתר
              </Link>
              <Link href="#examples" className="btn-ghost !py-3.5">
                דוגמאות
              </Link>
              <WhatsAppLink text="היי, אשמח לשמוע על בניית אתר לעסק" className="btn-ghost !py-3.5" />
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              מ-<span className="num">{formatShekel(landing.price)}</span>
              {" · "}
              {WEBSITE_INCLUDED_HOSTING_MONTHS} חודשי אחסון כלולים
              {" · "}
              אחר כך <span className="num">{formatShekel(WEBSITE_HOSTING.price)}</span> {WEBSITE_HOSTING.unit}
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">איך זה עובד</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">ארבעה צעדים. המסירה תוך 48 שעות נספרת אחרי תוכן בסיסי ואישור החבילה.</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {WEBSITE_STEPS.map((step) => (
              <li key={step.n} className="card p-6">
                <div className="num text-sm font-semibold text-royal-700">{step.n}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="packages" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight">חבילות לאתר</h2>
        <p className="mt-3 text-neutral-600">מחירים בשקלים, כתובים כאן כמו שהם. אפשר לעדכן אותם בקובץ אחד.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {WEBSITE_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col rounded-2xl border p-7 ${pkg.highlighted ? "border-ink bg-ink text-white" : "border-neutral-200 bg-white"}`}
            >
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className={`mt-2 text-sm ${pkg.highlighted ? "text-neutral-300" : "text-neutral-600"}`}>{pkg.summary}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="num text-4xl font-bold">{formatShekel(pkg.price)}</span>
                <span className={`text-sm ${pkg.highlighted ? "text-neutral-400" : "text-neutral-600"}`}>{pkg.unit}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {[...pkg.points, ...websitePackageBenefits()].map((point) => (
                  <li key={point} className={pkg.highlighted ? "text-neutral-200" : "text-neutral-700"}>{point}</li>
                ))}
              </ul>
              <Link
                href={`/websites?package=${pkg.id}#lead`}
                className={`mt-8 ${pkg.highlighted ? "btn bg-white text-ink hover:bg-neutral-100" : "btn-primary"}`}
              >
                בחירת {pkg.name}
              </Link>
            </article>
          ))}
        </div>
        <p className="card mt-5 p-5 text-sm leading-relaxed text-neutral-700">
          <strong className="text-ink">{WEBSITE_HOSTING.name}:</strong>{" "}
          <span className="num">{formatShekel(WEBSITE_HOSTING.price)}</span> {WEBSITE_HOSTING.unit}. {WEBSITE_HOSTING.summary}
        </p>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">לפי מה שמחפשים</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {landings.map((page) => (
              <li key={page.path}>
                <Link href={page.path} className="card block h-full p-5 transition hover:border-royal-200">
                  <h3 className="font-semibold">{page.navLabel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{page.card}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="examples" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">דוגמאות</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">שלושה אתרים של עסקים בדיוניים. כל אחד מסומן כדוגמה, ואין מאחוריו עסק אמיתי.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {WEBSITE_EXAMPLES.map((example) => (
              <Link key={example.href} href={example.href} className="card overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300">
                <div className="h-36" style={{ background: `linear-gradient(135deg, ${example.from}, ${example.to})` }} role="img" aria-label={`תצוגה גרפית לדוגמה: ${example.name}`} />
                <div className="p-5">
                  <div className="text-xs font-medium text-neutral-600">{example.kind} · עסק בדיוני</div>
                  <h3 className="mt-1 text-lg font-semibold">{example.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{example.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="quotes" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-semibold text-royal-700">גם ב-BizBot</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">הצעות מחיר ב-PDF</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              ממלאים פרטי עבודה, BizBot מחשב סכומים ומע״מ, ומפיק PDF בעברית עם הלוגו שלכם. 3 מסמכים בחינם. אחר כך PRO ב-
              <span className="num">{pro.price} ₪</span> לחודש, ו-BUSINESS ב-<span className="num">{business.price} ₪</span> לחודש.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={startHref} className="btn-primary">צור מסמך ראשון בחינם</Link>
              <Link href="/pricing" className="btn-ghost">למחירי ההצעות</Link>
            </div>
          </div>
          <QuotePreviewMock />
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16">
          <PricingCards />
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">מהבלוג</h2>
              <p className="mt-3 text-neutral-600">מדריכים לעצמאים. בלי מחירון מומצא ובלי הבטחות על סגירת עסקאות.</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-royal-700 hover:underline">לכל המדריכים</Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="card block h-full p-6 transition hover:border-royal-200">
                  <p className="text-sm text-neutral-600">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span aria-hidden> · </span>
                    {readingMinutes(postWordCount(post))} דקות קריאה
                  </p>
                  <h3 className="mt-3 text-lg font-bold tracking-tight">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight">מה כן כתוב כאן</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="card p-6">
            <h3 className="font-semibold">מחיר גלוי</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">חבילות האתר ומסלולי ההצעות מופיעים במספרים בעמוד הזה ובעמודי המחיר. אין כאן «החל מ» בלי סכום.</p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">תהליך כתוב</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">ארבעה צעדים, ומה צריך להיות מוכן לפני שסופרים 48 שעות. אין כאן התחייבות להחזר אם המסירה מתעכבת.</p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">החזר על מנוי ההצעות</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              14 יום על חיוב מנוי, דרך Paddle, לפי <Link href="/refund" className="font-medium text-royal-700 underline">מדיניות ההחזרים</Link>. זה לא חל אוטומטית על בניית אתר.
            </p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">מי מפעיל</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {SELLER_NAME}, עוסק עצמאי בישראל.{" "}
              <a dir="ltr" className="font-medium text-ink underline" href={`mailto:${SELLER_EMAIL}`}>{SELLER_EMAIL}</a>
              . מנוי ההצעות מחויב אצל Paddle, Merchant of Record.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">שאלות</h2>
          <div className="mt-8 divide-y divide-neutral-200">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="text-neutral-500 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">מוכנים לאתר לעסק?</h2>
            <p className="mt-2 max-w-xl text-neutral-300">משאירים שם וטלפון. חוזרים לשיחת אפיון קצרה. הפרטים נשמרים אצלנו, ב-{SITE_URL.replace("https://", "")}.</p>
          </div>
          <Link href="/websites#lead" className="btn-primary !px-7 !py-3.5 text-base">
            לטופס הפנייה
          </Link>
        </div>
      </section>
    </>
  );
}

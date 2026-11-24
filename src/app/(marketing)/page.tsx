import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LeadsPrice } from "@/components/LeadsPrice";
import { PhoneLink } from "@/components/PhoneLink";
import { QuotePreviewMock } from "@/components/QuotePreviewMock";
import { WebsiteLeadForm } from "@/components/WebsiteLeadForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { posts } from "@/content/blog/posts";
import { readingMinutes, postWordCount } from "@/content/blog/text";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { PLANS } from "@/lib/plans";
import { landings } from "@/content/seo/landings";
import { faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";
import {
  LEADS_AUDIENCES,
  LEADS_FAQ,
  LEADS_OFFER,
  LEADS_PARTS,
  LEADS_STEPS,
  WEBSITE_EXAMPLES,
  formatShekel,
  leadsPriceSummary,
  websiteOffersJsonLd,
} from "@/lib/website-packages";

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;

const description = `מערכת לידים מגוגל לקבלני שיפוצים בישראל: פרופיל Google, דף נחיתה, איסוף ביקורות ומחולל הצעות מחיר. ${leadsPriceSummary()} דמי ההקמה אחרי אישור, וחוזרים אם אין פנייה בתוך ${LEADS_OFFER.guaranteeDays} יום.`;

const whatsappText = "היי, אני קבלן שיפוצים ואשמח לשמוע על מערכת הלידים מגוגל";

export const metadata: Metadata = {
  title: { absolute: "BizBot — לידים מגוגל לקבלני שיפוצים" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "לידים מגוגל לקבלני שיפוצים",
    description,
    url: "/",
    locale: "he_IL",
    type: "website",
    siteName: "BizBot",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "BizBot — לידים מגוגל לקבלני שיפוצים" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "לידים מגוגל לקבלני שיפוצים",
    description,
    images: ["/og/home.png"],
  },
};

export default async function Home() {
  const user = await getCurrentUser();
  const startHref = user ? "/quotes/new" : "/signup";
  const latest = posts.slice(0, 3);

  return (
    <>
      <JsonLd data={organizationJsonLd(description)} />
      <JsonLd data={websiteOffersJsonLd("/")} />
      <JsonLd data={faqJsonLd([...LEADS_FAQ])} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-royal-700">לקבלני שיפוצים בישראל</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
              לקוחות שמתקשרים
              <span className="mt-2 block text-royal-600">מחיפוש בגוגל.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              BizBot מרכיב לקבלן שיפוצים מערכת שמביאה פניות: פרופיל Google לעסק, דף נחיתה שמבקש טלפון, דרך לאסוף ביקורות מלקוחות שכבר עבדו איתכם, ומחולל הצעות מחיר אחרי השיחה. מה שקונים כאן הוא שיחות ועבודות.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#lead" className="btn-primary !px-7 !py-3.5 text-base">
                השארת פרטים
              </Link>
              <Link href="#included" className="btn-ghost !py-3.5">
                מה כלול
              </Link>
              <PhoneLink className="btn-ghost !py-3.5" />
              <WhatsAppLink text={whatsappText} className="btn-ghost !py-3.5" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              <span className="num">{formatShekel(LEADS_OFFER.setupPrice)}</span> הקמה
              {" · "}
              <span className="num">{formatShekel(LEADS_OFFER.monthlyPrice)}</span> לחודש
              {" · "}
              משלמים את ההקמה אחרי אישור
            </p>
          </div>
        </div>
      </section>

      <section id="included" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">מה נבנה</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">ארבעה חלקים, חבילה אחת. הדף הוא החלק שבו משאירים טלפון. הוא לא המוצר לבד.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {LEADS_PARTS.map((part) => (
              <article key={part.title} className="card p-6">
                <h3 className="font-semibold">{part.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{part.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">איך זה מתקדם</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {LEADS_STEPS.map((step) => (
              <li key={step.n} className="card p-6">
                <div className="num text-sm font-semibold text-royal-700">{step.n}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">המחיר</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            מחיר אחד למערכת. הצעת ההשקה היא לחמשת הלקוחות הראשונים, והיא נסגרת בשיחה.
          </p>
          <div className="mt-8">
            <LeadsPrice ctaHref="#lead" />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">למי זה</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {LEADS_AUDIENCES.map((item) => (
              <article key={item.title} className="card p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="examples" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">הדגמה, לא תיק עבודות</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            שלושה עמודים של עסקים שלא קיימים. הם מראים מבנה של דף. אף אחד מהם אינו לקוח, ואין מאחוריהם עסק אמיתי.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {WEBSITE_EXAMPLES.map((example) => (
              <Link key={example.href} href={example.href} className="card overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300">
                <div className="h-36" style={{ background: `linear-gradient(135deg, ${example.from}, ${example.to})` }} role="img" aria-label={`הדגמה גרפית: ${example.name}`} />
                <div className="p-5">
                  <div className="text-xs font-semibold text-amber-800">הדגמה · עסק בדיוני</div>
                  <div className="mt-2 text-xs font-medium text-neutral-600">{example.kind}</div>
                  <h3 className="mt-1 text-lg font-semibold">{example.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{example.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
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

      <section id="quotes" className="scroll-mt-20 border-t border-neutral-100">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-semibold text-royal-700">כלול בחבילה, ואפשר גם לבד</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">הצעות מחיר ב-PDF</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              אחרי שיחה עם לקוח, ממלאים את העבודה ו-BizBot מוציא PDF בעברית. במערכת הלידים הכלי כלול. מי שרוצה רק אותו: 3 מסמכים בחינם, אחר כך PRO ב-
              <span className="num">{pro.price} ₪</span> לחודש, או BUSINESS ב-<span className="num">{business.price} ₪</span> לחודש.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={startHref} className="btn-ghost">למחולל ההצעות</Link>
              <Link href="/pricing#quotes" className="btn-ghost">מחירי הכלי לבד</Link>
            </div>
          </div>
          <QuotePreviewMock />
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">מהבלוג</h2>
              <p className="mt-3 text-neutral-600">מדריכים לעצמאים על הצעות מחיר ועל עמוד שמקבל פנייה.</p>
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
        <h2 className="text-3xl font-bold tracking-tight">מה כתוב כאן במפורש</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="card p-6">
            <h3 className="font-semibold">מחיר גלוי</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {formatShekel(LEADS_OFFER.setupPrice)} הקמה ו-{formatShekel(LEADS_OFFER.monthlyPrice)} לחודש. הצעת ההשקה לחמישה לקוחות ראשונים כתובה ליד.
            </p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">תשלום אחרי אישור</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">רואים את הפרופיל, את הדף ואת מסלול הביקורות. דמי ההקמה משולמים רק אחרי אישור.</p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">החזר על ההקמה</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              אם תוך {LEADS_OFFER.guaranteeDays} יום מהעלייה לאוויר לא נכנסת אף פנייה, דמי ההקמה חוזרים. הפירוט ב<Link href="/refund" className="font-medium text-royal-700 underline">מדיניות ההחזרים</Link>.
            </p>
          </article>
          <article className="card p-6">
            <h3 className="font-semibold">מי מפעיל</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {SELLER_NAME}, עוסק עצמאי בישראל.{" "}
              <a dir="ltr" className="font-medium text-ink underline" href={`mailto:${SELLER_EMAIL}`}>{SELLER_EMAIL}</a>
              .
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">שאלות</h2>
          <div className="mt-8 divide-y divide-neutral-200">
            {LEADS_FAQ.map((item) => (
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

      <section id="lead" className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">השארת פרטים</h2>
            <p className="mt-3 leading-relaxed text-neutral-600">
              שם, טלפון ותחום. נחזור לשיחה קצרה. אין חיוב בשליחה.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <PhoneLink />
              <WhatsAppLink label="או בוואטסאפ" text={whatsappText} />
            </div>
          </div>
          <WebsiteLeadForm />
        </div>
      </section>
    </>
  );
}

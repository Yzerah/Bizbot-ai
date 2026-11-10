import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { WebsiteLeadForm } from "@/components/WebsiteLeadForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  WEBSITE_AUDIENCES,
  WEBSITE_EXAMPLES,
  WEBSITE_HOSTING,
  WEBSITE_INCLUDES,
  WEBSITE_PACKAGES,
  WEBSITE_PRO_BONUS_MONTHS,
  WEBSITE_STEPS,
  formatShekel,
  isWebsitePackageId,
  websiteOffersJsonLd,
} from "@/lib/website-packages";

const landing = WEBSITE_PACKAGES[0];
const description = `בניית דף נחיתה או אתר לעסק קטן בישראל, תוך 48 שעות. עיצוב לנייד, וואטסאפ, טופס לידים, דומיין, SEO בסיסי ומפת Google Maps כשיש כתובת. מתחילים ב-${formatShekel(landing.price)}. כל לקוח אתר מקבל BizBot PRO ל-${WEBSITE_PRO_BONUS_MONTHS} חודשים.`;

export const metadata: Metadata = {
  title: "אתר לעסק תוך 48 שעות",
  description,
  alternates: { canonical: "/websites" },
  openGraph: {
    title: "אתר לעסק תוך 48 שעות",
    description,
    url: "/websites",
    locale: "he_IL",
    type: "website",
    siteName: "BizBot",
  },
  twitter: {
    card: "summary",
    title: "אתר לעסק תוך 48 שעות",
    description,
  },
};

const faq = [
  {
    q: "מתי מתחילות 48 השעות?",
    a: "מרגע שיש תוכן בסיסי, מה העסק עושה וטקסטים קצרים, ואישרתם את החבילה. לוגו, אם יש, מקצר את העבודה.",
  },
  {
    q: "מה צריך להכין?",
    a: "תיאור קצר, רשימת שירותים, ואזור או כתובת אם רוצים מפה. בלי תמונות של העסק האתר נבנה בעיצוב, בלי תמונות מלאי חיצוניות.",
  },
  {
    q: "האם הדומיין כלול במחיר?",
    a: "חיבור דומיין קיים כלול. אם אין דומיין, הרכישה עצמה משולמת לרשם הדומיינים.",
  },
  {
    q: "מה מקבלים עם BizBot PRO?",
    a: `כל מי שמזמין אתר מקבל את כלי ההצעות BizBot PRO בחינם ל-${WEBSITE_PRO_BONUS_MONTHS} חודשים.`,
  },
  {
    q: "איך משלמים על האתר?",
    a: "אחרי שיוצרים קשר וסוגרים את ההיקף. בניית האתר אינה מנוי Paddle של כלי ההצעות.",
  },
  {
    q: "אפשר בלי האחסון החודשי?",
    a: `כן. ${WEBSITE_HOSTING.name} ב-${formatShekel(WEBSITE_HOSTING.price)} ${WEBSITE_HOSTING.unit} הוא תוספת. אתר ששולם נמסר גם בלעדיו.`,
  },
];

export default async function WebsitesPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: packageId } = await searchParams;
  const selected = isWebsitePackageId(packageId) ? packageId : "business";
  const origin = (process.env.NEXT_PUBLIC_APP_URL || "https://bizbot-ai.co.il").replace(/\/$/, "");

  return (
    <>
      <JsonLd data={websiteOffersJsonLd(origin)} />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:pt-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-royal-600" />
              לעסקים קטנים בישראל
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-[3.25rem]">
              אתר לעסק
              <br />
              <span className="text-royal-600">תוך 48 שעות.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              דף נחיתה או אתר קטן, מותאם לנייד, עם כפתור וואטסאפ, טופס לידים, חיבור דומיין, <bdi>SEO</bdi> בסיסי ומפת <bdi>Google Maps</bdi> כשיש כתובת.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#lead" className="btn-primary !px-7 !py-3.5 text-base">
                השארת פרטים
              </Link>
              <Link href="#examples" className="btn-ghost !py-3.5">
                דוגמאות
              </Link>
              <WhatsAppLink text="היי, אשמח לשמוע על בניית אתר לעסק" className="btn-ghost !py-3.5" />
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              מתחילים ב-<span className="num">{formatShekel(landing.price)}</span>
              {" · "}
              BizBot PRO ל-{WEBSITE_PRO_BONUS_MONTHS} חודשים עם כל אתר
            </p>
          </div>
          <SitePreview />
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">למי זה</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WEBSITE_AUDIENCES.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">מה כלול בכל אתר</h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WEBSITE_INCLUDES.map((item) => (
            <div key={item.title} className="border-r-2 border-royal-600 pr-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">איך זה עובד</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {WEBSITE_STEPS.map((step) => (
              <li key={step.n} className="card p-6">
                <div className="num text-sm font-semibold text-royal-600">{step.n}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">דוגמאות</h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          שלושה אתרים של עסקים בדיוניים. הם מסומנים כדוגמה, ואין מאחוריהם עסק אמיתי.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {WEBSITE_EXAMPLES.map((example) => (
            <Link key={example.href} href={example.href} className="card overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300">
              <div
                className="h-36"
                style={{ background: `linear-gradient(135deg, ${example.from}, ${example.to})` }}
              />
              <div className="p-5">
                <div className="text-xs font-medium text-neutral-500">{example.kind} · עסק בדיוני</div>
                <h3 className="mt-1 text-lg font-semibold">{example.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{example.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="packages" className="border-t border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">חבילות</h2>
          <p className="mt-3 text-neutral-600">המחירים בשקלים. אפשר לעדכן אותם בקובץ אחד.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {WEBSITE_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`flex flex-col rounded-2xl border p-7 ${pkg.highlighted ? "border-ink bg-ink text-white" : "border-neutral-200 bg-white"}`}
              >
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <p className={`mt-2 text-sm ${pkg.highlighted ? "text-neutral-300" : "text-neutral-500"}`}>{pkg.summary}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="num text-4xl font-bold">{formatShekel(pkg.price)}</span>
                  <span className={`text-sm ${pkg.highlighted ? "text-neutral-400" : "text-neutral-500"}`}>{pkg.unit}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {pkg.points.map((point) => (
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
          <div className="card mt-5 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">{WEBSITE_HOSTING.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">{WEBSITE_HOSTING.summary}</p>
            </div>
            <div className="num text-2xl font-bold">
              {formatShekel(WEBSITE_HOSTING.price)} <span className="text-sm font-medium text-neutral-500">{WEBSITE_HOSTING.unit}</span>
            </div>
          </div>
          <p className="mt-5 rounded-2xl bg-royal-50 px-5 py-4 text-sm leading-relaxed text-royal-900">
            כל לקוח שבונה אתר מקבל את BizBot PRO בחינם ל-{WEBSITE_PRO_BONUS_MONTHS} חודשים. PRO הוא כלי ההצעות, בלי הגבלה על מספר המסמכים.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">שאלות</h2>
        <div className="mt-8 divide-y divide-neutral-200">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <span className="text-neutral-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="lead" className="border-t border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">השארת פרטים</h2>
            <p className="mt-3 leading-relaxed text-neutral-600">
              שם, טלפון, סוג העסק והחבילה. נחזור לתיאום שיחת אפיון קצרה.
            </p>
            <div className="mt-6">
              <WhatsAppLink label="או בוואטסאפ" text="היי, אשמח לשמוע על בניית אתר לעסק" />
            </div>
          </div>
          <WebsiteLeadForm key={selected} initialPackage={selected} />
        </div>
      </section>
    </>
  );
}

function SitePreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-royal-100 via-white to-white blur-2xl" />
      <div className="card overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,29,110,.35)]">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="ms-2 text-xs text-neutral-400">העסק שלכם</span>
        </div>
        <div className="bg-gradient-to-b from-royal-600 to-royal-700 px-6 py-8 text-white">
          <div className="text-xs text-royal-100">עסק קטן</div>
          <div className="mt-2 text-2xl font-bold leading-snug">שירות שמגיע עד הלקוח</div>
          <div className="mt-4 inline-flex rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-ink">וואטסאפ</div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4 text-center text-xs text-neutral-600">
          <div className="rounded-xl bg-neutral-50 px-2 py-3">שירותים</div>
          <div className="rounded-xl bg-neutral-50 px-2 py-3">מפה</div>
          <div className="rounded-xl bg-neutral-50 px-2 py-3">טופס</div>
        </div>
      </div>
    </div>
  );
}

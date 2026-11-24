import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LeadsPrice } from "@/components/LeadsPrice";
import { PhoneLink } from "@/components/PhoneLink";
import { WebsiteLeadForm } from "@/components/WebsiteLeadForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { landings } from "@/content/seo/landings";
import { faqJsonLd } from "@/lib/seo";
import {
  LEADS_AUDIENCES,
  LEADS_FAQ,
  LEADS_OFFER,
  LEADS_PARTS,
  LEADS_STEPS,
  WEBSITE_EXAMPLES,
  formatShekel,
  isWebsitePackageId,
  leadsPriceSummary,
  websiteOffersJsonLd,
} from "@/lib/website-packages";

const description = `מערכת לידים מגוגל לקבלני שיפוצים: פרופיל Google, דף נחיתה, איסוף ביקורות ומחולל הצעות מחיר. ${leadsPriceSummary()}`;
const whatsappText = "היי, אני קבלן שיפוצים ואשמח לשמוע על מערכת הלידים מגוגל";

export const metadata: Metadata = {
  title: "מערכת לידים מגוגל לקבלני שיפוצים",
  description,
  alternates: { canonical: "/websites" },
  openGraph: {
    title: "מערכת לידים מגוגל לקבלני שיפוצים",
    description,
    url: "/websites",
    locale: "he_IL",
    type: "website",
    siteName: "BizBot",
    images: [{ url: "/og/websites.png", width: 1200, height: 630, alt: "מערכת לידים מגוגל לקבלני שיפוצים" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "מערכת לידים מגוגל לקבלני שיפוצים",
    description,
    images: ["/og/websites.png"],
  },
};

export default async function WebsitesPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: packageId } = await searchParams;
  const selected = isWebsitePackageId(packageId) ? packageId : LEADS_OFFER.id;

  return (
    <>
      <JsonLd data={websiteOffersJsonLd("/websites")} />
      <JsonLd data={faqJsonLd([...LEADS_FAQ])} />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:pt-24">
          <div>
            <p className="text-sm font-medium text-royal-700">לקבלני שיפוצים בישראל</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
              מערכת לידים מגוגל
              <span className="mt-2 block text-royal-600">ששיחה יכולה לצאת ממנה.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
              פרופיל Google לעסק, דף אחד שמבקש טלפון, בקשת ביקורת מלקוחות שכבר סיימתם אצלם, ומחולל הצעות מחיר. זה מה שנבנה. אתר של כמה עמודים אינו המוצר.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#lead" className="btn-primary !px-7 !py-3.5 text-base">
                השארת פרטים
              </Link>
              <Link href="#price" className="btn-ghost !py-3.5">
                למחיר
              </Link>
              <PhoneLink className="btn-ghost !py-3.5" />
              <WhatsAppLink text={whatsappText} className="btn-ghost !py-3.5" />
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <span className="num">{formatShekel(LEADS_OFFER.setupPrice)}</span> הקמה
              {" · "}
              <span className="num">{formatShekel(LEADS_OFFER.monthlyPrice)}</span> לחודש
              {" · "}
              החזר דמי הקמה אם אין פנייה ב-{LEADS_OFFER.guaranteeDays} יום
            </p>
          </div>
          <SystemPreview />
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">למי זה</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {LEADS_AUDIENCES.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">מה כלול</h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {LEADS_PARTS.map((item) => (
            <div key={item.title} className="border-r-2 border-royal-600 pr-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">איך זה מתקדם</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {LEADS_STEPS.map((step) => (
              <li key={step.n} className="card p-6">
                <div className="num text-sm font-semibold text-royal-600">{step.n}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">הדגמה, לא תיק עבודות</h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          העמודים האלה הם עסקים בדיוניים. הם מראים מבנה. הם לא לקוחות, ואין בהם מספר טלפון אמיתי.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {WEBSITE_EXAMPLES.map((example) => (
            <Link key={example.href} href={example.href} className="card overflow-hidden transition hover:-translate-y-0.5 hover:border-neutral-300">
              <div className="h-36" style={{ background: `linear-gradient(135deg, ${example.from}, ${example.to})` }} role="img" aria-label={`הדגמה גרפית: ${example.name}`} />
              <div className="p-5">
                <div className="text-xs font-semibold text-amber-800">הדגמה · עסק בדיוני</div>
                <div className="mt-2 text-xs font-medium text-neutral-500">{example.kind}</div>
                <h3 className="mt-1 text-lg font-semibold">{example.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{example.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="price" className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">המחיר</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">הקמה אחת, ותשלום חודשי על המשך התפעול. ההקמה אחרי שאתם מאשרים.</p>
          <div className="mt-8">
            <LeadsPrice />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
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
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">שאלות</h2>
        <div className="mt-8 divide-y divide-neutral-200">
          {LEADS_FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <span className="text-neutral-400 transition group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="lead" className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50/60">
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
          <WebsiteLeadForm key={selected} initialPackage={selected} />
        </div>
      </section>
    </>
  );
}

function SystemPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-royal-100 via-white to-white blur-2xl" />
      <div className="card overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,29,110,.35)]">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          <span className="ms-2 text-xs text-neutral-400">הקבלן שלכם</span>
        </div>
        <div className="bg-gradient-to-b from-royal-600 to-royal-700 px-6 py-8 text-white">
          <div className="text-xs text-royal-100">קבלן שיפוצים</div>
          <div className="mt-2 text-2xl font-bold leading-snug">שיפוץ, ואז טלפון</div>
          <div className="mt-4 inline-flex rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-ink">התקשרו</div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4 text-center text-xs text-neutral-600">
          <div className="rounded-xl bg-neutral-50 px-2 py-3">פרופיל Google</div>
          <div className="rounded-xl bg-neutral-50 px-2 py-3">דף נחיתה</div>
          <div className="rounded-xl bg-neutral-50 px-2 py-3">ביקורות</div>
          <div className="rounded-xl bg-neutral-50 px-2 py-3">הצעת מחיר</div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/blog/RichText";
import { WebsiteLeadForm } from "@/components/WebsiteLeadForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SeoLanding } from "@/content/seo/landings";
import { landings } from "@/content/seo/landings";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import {
  WEBSITE_HOSTING,
  WEBSITE_PACKAGES,
  formatShekel,
  websiteOffersJsonLd,
  websitePackageBenefits,
} from "@/lib/website-packages";

export function SeoLandingView({ page }: { page: SeoLanding }) {
  const others = landings.filter((item) => item.path !== page.path);

  return (
    <>
      <JsonLd data={organizationJsonLd(page.description)} />
      <JsonLd data={websiteOffersJsonLd(page.path)} />
      <JsonLd data={faqJsonLd(page.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "דף הבית", path: "/" },
          { name: "אתרים לעסקים", path: "/websites" },
          { name: page.navLabel, path: page.path },
        ])}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,#dfe6ff_0%,transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-14 md:pt-20">
          <nav aria-label="מיקום בעמוד" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">דף הבית</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/websites" className="hover:text-ink">אתרים לעסקים</Link>
              </li>
            </ol>
          </nav>
          <p className="mt-6 text-sm font-medium text-royal-700">{page.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            {page.h1}
            <span className="mt-2 block text-royal-600">{page.h1Accent}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">{page.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#lead" className="btn-primary !px-7 !py-3.5 text-base">
              השארת פרטים
            </Link>
            <Link href="/websites" className="btn-ghost !py-3.5">
              לכל החבילות
            </Link>
            <WhatsAppLink text={`היי, אשמח לשמוע על ${page.navLabel}`} className="btn-ghost !py-3.5" />
          </div>
        </div>
      </section>

      {page.sections.map((section) => (
        <section key={section.id} className="border-t border-neutral-100">
          <div className="mx-auto max-w-3xl px-5 py-14">
            <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-neutral-700">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
            {section.points ? (
              <ul className="mt-6 space-y-2 border-r-2 border-royal-600 pr-4 text-sm leading-relaxed text-neutral-700">
                {section.points.map((point) => (
                  <li key={point}>
                    <RichText text={point} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section className="border-t border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h2 className="text-2xl font-bold tracking-tight">המחיר</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">{page.priceIntro}</p>
          <ul className="mt-6 space-y-4">
            {WEBSITE_PACKAGES.map((pkg) => (
              <li key={pkg.id} className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{pkg.name}</h3>
                  <p className="num text-2xl font-bold">
                    {formatShekel(pkg.price)} <span className="text-sm font-medium text-neutral-500">{pkg.unit}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{pkg.summary}</p>
                <ul className="mt-3 space-y-1 text-sm text-neutral-700">
                  {websitePackageBenefits().map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {WEBSITE_HOSTING.name}: {WEBSITE_HOSTING.summary}
          </p>
          <p className="mt-4 text-sm">
            <Link href="/websites#packages" className="font-medium text-royal-700 hover:underline">
              לפירוט המלא בעמוד האתרים
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-2xl font-bold tracking-tight">שאלות</h2>
        <div className="mt-6 divide-y divide-neutral-200">
          {page.faq.map((item) => (
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

      <section className="border-t border-neutral-100 bg-neutral-50/70">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h2 className="text-2xl font-bold tracking-tight">עוד לקריאה</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            מדריך קשור:{" "}
            <Link href={page.guide.href} className="font-medium text-royal-700 hover:underline">
              {page.guide.label}
            </Link>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {others.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="font-medium text-ink hover:text-royal-700">
                  {item.navLabel}
                </Link>
                <span className="text-neutral-600">. {item.card}</span>
              </li>
            ))}
            <li>
              <Link href="/websites#lead" className="font-medium text-royal-700 hover:underline">
                טופס הפנייה בעמוד האתרים
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="lead" className="scroll-mt-20 border-t border-neutral-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">השארת פרטים</h2>
            <p className="mt-3 leading-relaxed text-neutral-600">
              שם, טלפון, סוג העסק והחבילה. נחזור לתיאום שיחת אפיון קצרה. אותו טופס נמצא גם{" "}
              <Link href="/websites#lead" className="font-medium text-royal-700 hover:underline">
                בעמוד האתרים
              </Link>
              .
            </p>
            <div className="mt-6">
              <WhatsAppLink label="או בוואטסאפ" text={`היי, אשמח לשמוע על ${page.navLabel}`} />
            </div>
          </div>
          <WebsiteLeadForm initialPackage={page.packageId} />
        </div>
      </section>
    </>
  );
}

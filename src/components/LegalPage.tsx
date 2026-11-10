import Link from "next/link";
import { LegalNav } from "@/components/LegalNav";
import { POLICIES_UPDATED, SELLER_BRAND, SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 leading-relaxed text-neutral-700">
      <h1 className="text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        עודכן לאחרונה: {POLICIES_UPDATED} · {SELLER_NAME} / {SELLER_BRAND}
      </p>
      <div className="mt-8 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pr-5">
        {children}
      </div>
      <div className="mt-12 border-t border-neutral-100 pt-6 text-sm">
        <p>
          פניות:{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>
        </p>
        <LegalNav className="mt-4 flex flex-wrap gap-4 text-neutral-600" />
        <p className="mt-4">
          <Link href="/pricing" className="text-royal-600 hover:underline">
            למחירים
          </Link>
        </p>
      </div>
    </article>
  );
}

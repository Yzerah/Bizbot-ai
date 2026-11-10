import Link from "next/link";
import { LegalNav } from "@/components/LegalNav";
import { Logo } from "@/components/Logo";
import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-neutral-500">הצעות מחיר מקצועיות לעצמאים ולעסקים קטנים בישראל.</p>
          <p className="text-sm text-neutral-500">
            {SELLER_NAME} ·{" "}
            <a dir="ltr" className="hover:text-ink" href={`mailto:${SELLER_EMAIL}`}>
              {SELLER_EMAIL}
            </a>
          </p>
        </div>
        <div className="space-y-3">
          <nav className="flex flex-wrap gap-5 text-sm text-neutral-600">
            <Link href="/pricing" className="hover:text-ink">מחירים</Link>
            <LegalNav className="contents" />
          </nav>
          <p className="max-w-md text-xs leading-relaxed text-neutral-400">
            הזמנות בתשלום מעובדות על ידי Paddle.com, Merchant of Record.
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} BizBot · bizbot-ai.co.il · הצעת מחיר אינה חשבונית מס
      </div>
    </footer>
  );
}

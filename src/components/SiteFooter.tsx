import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-neutral-500">הצעות מחיר מקצועיות לעצמאים ולעסקים קטנים בישראל.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-neutral-600">
          <Link href="/pricing" className="hover:text-ink">מחירים</Link>
          <Link href="/terms" className="hover:text-ink">תנאי שימוש ופרטיות</Link>
          <Link href="/login" className="hover:text-ink">התחברות</Link>
        </nav>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} BizBot · bizbot-ai.co.il · הצעת מחיר אינה חשבונית מס
      </div>
    </footer>
  );
}

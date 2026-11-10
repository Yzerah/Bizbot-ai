import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { requireUser } from "@/lib/auth";
import { blocksNewCheckout } from "@/lib/paddle";
import { isPaid } from "@/lib/plans";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/70">
      <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-7">
            <Logo href="/dashboard" />
            <nav className="hidden items-center gap-5 text-sm text-neutral-600 sm:flex">
              <Link href="/dashboard" className="hover:text-ink">ההצעות שלי</Link>
              <Link href="/quotes/new" className="hover:text-ink">הצעה חדשה</Link>
              <Link href="/upgrade" className="hover:text-ink">
                {isPaid(user.plan) || blocksNewCheckout(user.subscriptionStatus) ? "המנוי שלי" : "שדרוג"}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline ${isPaid(user.plan) ? "bg-royal-600 text-white" : "bg-neutral-100 text-neutral-600"}`}>
              {user.plan === "FREE" ? "חינם" : user.plan}
            </span>
            <span dir="ltr" className="hidden max-w-48 truncate text-sm text-neutral-500 md:inline">{user.email}</span>
            <form action={logout}>
              <button type="submit" className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
                יציאה
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

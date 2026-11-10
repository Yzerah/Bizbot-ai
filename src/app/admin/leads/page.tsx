import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { businessTypeLabel, websitePackageName } from "@/lib/website-packages";

export const metadata: Metadata = {
  title: "פניות אתרים",
  robots: { index: false, follow: false },
};

function formatWhen(date: Date) {
  return new Intl.DateTimeFormat("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminLeadsPage() {
  const user = await requireAdmin();
  const leads = await db.websiteLead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="min-h-full bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="flex items-center gap-3 text-sm">
            <span dir="ltr" className="hidden text-neutral-500 sm:inline">{user.email}</span>
            <Link href="/websites" className="text-neutral-700 hover:text-ink">לאתרים</Link>
            <form action={logout}>
              <button type="submit" className="rounded-lg px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100">
                יציאה
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="text-2xl font-bold tracking-tight">פניות לבניית אתר</h1>
        <p className="mt-2 text-sm text-neutral-600">{leads.length === 0 ? "עדיין אין פניות." : `${leads.length} פניות אחרונות.`}</p>
        {leads.length > 0 && (
          <>
            <ul className="mt-6 space-y-3 md:hidden">
              {leads.map((lead) => (
                <li key={lead.id} className="card space-y-1 p-4 text-sm">
                  <div className="font-semibold">{lead.name}</div>
                  <div dir="ltr" className="text-right">{lead.phone}</div>
                  <div>{businessTypeLabel(lead.businessType)} · {websitePackageName(lead.packageId)}</div>
                  <div className="text-neutral-500">{lead.hosting ? "עם אחסון חודשי" : "בלי אחסון חודשי"}</div>
                  {lead.message && <p className="whitespace-pre-wrap text-neutral-700">{lead.message}</p>}
                  <div className="num text-xs text-neutral-400">{formatWhen(lead.createdAt)}</div>
                </li>
              ))}
            </ul>
            <div className="card mt-6 hidden overflow-x-auto md:block">
              <table className="w-full text-right text-sm">
                <thead className="border-b border-neutral-100 text-xs text-neutral-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">מתי</th>
                    <th className="px-4 py-3 font-medium">שם</th>
                    <th className="px-4 py-3 font-medium">טלפון</th>
                    <th className="px-4 py-3 font-medium">עסק</th>
                    <th className="px-4 py-3 font-medium">חבילה</th>
                    <th className="px-4 py-3 font-medium">אחסון</th>
                    <th className="px-4 py-3 font-medium">הודעה</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-neutral-50 align-top">
                      <td className="num whitespace-nowrap px-4 py-3 text-neutral-500">{formatWhen(lead.createdAt)}</td>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td dir="ltr" className="num px-4 py-3 text-right">{lead.phone}</td>
                      <td className="px-4 py-3">{businessTypeLabel(lead.businessType)}</td>
                      <td className="px-4 py-3">{websitePackageName(lead.packageId)}</td>
                      <td className="px-4 py-3">{lead.hosting ? "כן" : "לא"}</td>
                      <td className="max-w-xs whitespace-pre-wrap px-4 py-3 text-neutral-600">{lead.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

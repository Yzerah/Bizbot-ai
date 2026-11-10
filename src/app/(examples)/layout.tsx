import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeaderView } from "@/components/SiteHeaderView";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeaderView loggedIn={false} />
      <div className="sticky top-16 z-30 border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-950">
        אתר לדוגמה – עסק בדיוני
        <Link href="/websites#examples" className="ms-3 underline">
          לכל הדוגמאות
        </Link>
      </div>
      <div id="content" className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

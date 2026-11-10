import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeaderView } from "@/components/SiteHeaderView";

export const dynamic = "force-static";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* No session lookup here: cookies() would opt the blog out of static generation. */}
      <SiteHeaderView loggedIn={false} />
      <main id="content" lang="he" dir="rtl" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

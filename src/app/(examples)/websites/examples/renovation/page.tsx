import type { Metadata } from "next";
import { RenovationSite } from "@/components/examples/RenovationSite";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "אתר לדוגמה: דקל שיפוצים",
  description: "אתר הדגמה של עסק בדיוני, דקל שיפוצים. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
  path: "/websites/examples/renovation",
  image: "/og/websites.png",
});

export default function RenovationExamplePage() {
  return <RenovationSite />;
}

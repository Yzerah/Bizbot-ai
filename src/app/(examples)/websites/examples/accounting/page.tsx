import type { Metadata } from "next";
import { AccountingSite } from "@/components/examples/AccountingSite";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "אתר לדוגמה: משרד נועם",
  description: "אתר הדגמה של עסק בדיוני, משרד נועם להנהלת חשבונות. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
  path: "/websites/examples/accounting",
  image: "/og/websites.png",
});

export default function AccountingExamplePage() {
  return <AccountingSite />;
}

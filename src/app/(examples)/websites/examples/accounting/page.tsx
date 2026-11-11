import type { Metadata } from "next";
import { AccountingSite } from "@/components/examples/AccountingSite";

export const metadata: Metadata = {
  title: "אתר לדוגמה: משרד נועם",
  description: "אתר הדגמה של עסק בדיוני, משרד נועם להנהלת חשבונות. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
};

export default function AccountingExamplePage() {
  return <AccountingSite />;
}

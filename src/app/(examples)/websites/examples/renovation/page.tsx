import type { Metadata } from "next";
import { RenovationSite } from "@/components/examples/RenovationSite";

export const metadata: Metadata = {
  title: "אתר לדוגמה: דקל שיפוצים",
  description: "אתר הדגמה של עסק בדיוני, דקל שיפוצים. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
};

export default function RenovationExamplePage() {
  return <RenovationSite />;
}

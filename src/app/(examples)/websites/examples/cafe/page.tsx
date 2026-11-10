import type { Metadata } from "next";
import { CafeSite } from "@/components/examples/CafeSite";

export const metadata: Metadata = {
  title: "אתר לדוגמה: קפה תמר",
  description: "אתר הדגמה של עסק בדיוני, קפה תמר. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
  robots: { index: false, follow: false },
};

export default function CafeExamplePage() {
  return <CafeSite />;
}

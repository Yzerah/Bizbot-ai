import type { Metadata } from "next";
import { CafeSite } from "@/components/examples/CafeSite";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "אתר לדוגמה: קפה תמר",
  description: "אתר הדגמה של עסק בדיוני, קפה תמר. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
  path: "/websites/examples/cafe",
  image: "/og/websites.png",
});

export default function CafeExamplePage() {
  return <CafeSite />;
}

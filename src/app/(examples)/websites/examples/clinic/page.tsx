import type { Metadata } from "next";
import { ClinicSite } from "@/components/examples/ClinicSite";

export const metadata: Metadata = {
  title: "אתר לדוגמה: קליניקת אלה",
  description: "אתר הדגמה של עסק בדיוני, קליניקת אלה. העסק אינו קיים. הדוגמה שייכת ל-BizBot.",
};

export default function ClinicExamplePage() {
  return <ClinicSite />;
}

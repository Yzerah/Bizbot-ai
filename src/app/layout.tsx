import type { Metadata } from "next";
import localFont from "next/font/local";
import { googleVerification } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { leadsPriceSummary } from "@/lib/website-packages";
import "./globals.css";

const plex = localFont({
  variable: "--font-plex",
  display: "swap",
  src: [
    { path: "../../assets/fonts/IBMPlexSansHebrew-Regular.ttf", weight: "400" },
    { path: "../../assets/fonts/IBMPlexSansHebrew-Medium.ttf", weight: "500" },
    { path: "../../assets/fonts/IBMPlexSansHebrew-SemiBold.ttf", weight: "600" },
    { path: "../../assets/fonts/IBMPlexSansHebrew-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BizBot — לידים מגוגל לקבלני שיפוצים",
    template: "%s | BizBot",
  },
  description: `מערכת לידים מגוגל לקבלני שיפוצים: פרופיל Google, דף נחיתה, איסוף ביקורות ומחולל הצעות מחיר. ${leadsPriceSummary()}`,
  openGraph: {
    siteName: SITE_NAME,
    locale: "he_IL",
    type: "website",
  },
  ...(googleVerification ? { verification: googleVerification } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${plex.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="skip-link"
        >
          דילוג לתוכן
        </a>
        {children}
      </body>
    </html>
  );
}

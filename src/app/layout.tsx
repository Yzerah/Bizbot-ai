import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteUrl } from "@/lib/site";
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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "BizBot — הצעות מחיר מקצועיות לעצמאים תוך 30 שניות",
    template: "%s | BizBot",
  },
  description:
    "BizBot מייצר הצעות מחיר מקצועיות בעברית, עם הלוגו שלך, חישוב מע״מ אוטומטי והורדה כ-PDF. 3 הצעות ראשונות בחינם.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${plex.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

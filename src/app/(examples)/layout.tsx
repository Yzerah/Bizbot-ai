import Link from "next/link";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-50 border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-950">
        אתר לדוגמה – עסק בדיוני
        <Link href="/websites#examples" className="ms-3 underline">
          לכל הדוגמאות
        </Link>
      </div>
      {children}
    </div>
  );
}

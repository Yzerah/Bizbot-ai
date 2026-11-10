// Static illustration of a finished quote for the landing page (sample data, clearly an example).
const rows = [
  { d: "אפיון ועיצוב דף נחיתה", q: 1, p: 3200 },
  { d: "התאמה למובייל", q: 1, p: 900 },
  { d: "שעות תיקונים", q: 4, p: 250 },
];

function ils(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2 }) + " ₪";
}

export function QuotePreviewMock() {
  const sub = rows.reduce((s, r) => s + r.q * r.p, 0);
  const vat = Math.round(sub * 0.18 * 100) / 100;
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-royal-100 via-white to-white blur-2xl" />
      <div className="card overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,29,110,.35)]">
        <div className="flex items-start justify-between border-b border-neutral-100 p-6">
          <div>
            <div className="text-xs font-medium text-royal-600">הצעת מחיר</div>
            <div className="mt-1 text-xl font-bold">מס׳ <span className="num">1024</span></div>
            <div className="mt-1 text-xs text-neutral-500">בתוקף 30 יום</div>
          </div>
          <div className="text-left">
            <div className="ml-auto grid h-10 w-10 place-items-center rounded-lg bg-ink text-sm font-bold text-white">נ</div>
            <div className="mt-2 text-sm font-semibold">נועה סטודיו</div>
            <div className="text-xs text-neutral-500">עוסק מורשה</div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4 text-sm">
            <span className="text-neutral-500">לכבוד: </span>
            <span className="font-medium">קפה הגפן בע״מ</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-neutral-100">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-500">
              <span>תיאור</span><span>כמות</span><span className="w-20 text-left">סה״כ</span>
            </div>
            {rows.map((r) => (
              <div key={r.d} className="grid grid-cols-[1fr_auto_auto] gap-4 border-t border-neutral-100 px-4 py-2.5 text-sm">
                <span>{r.d}</span>
                <span className="num text-neutral-600">{r.q}</span>
                <span className="num w-20 text-left">{ils(r.q * r.p)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-neutral-600"><span>סכום ביניים</span><span className="num">{ils(sub)}</span></div>
            <div className="flex justify-between text-neutral-600"><span>מע״מ 18%</span><span className="num">{ils(vat)}</span></div>
            <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-bold"><span>סה״כ לתשלום</span><span className="num text-royal-700">{ils(sub + vat)}</span></div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 right-6 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium shadow-lg">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> PDF מוכן להורדה
      </div>
    </div>
  );
}

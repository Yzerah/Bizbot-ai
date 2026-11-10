"use client";

import { useState } from "react";
import Link from "next/link";

export function DemoInquiry({ buttonClass }: { buttonClass: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-current/15 bg-white/80 p-5 text-sm leading-relaxed">
        <p className="font-semibold">זהו אתר לדוגמה. לא נשלחה פנייה.</p>
        <p className="mt-2">
          העסק בדיוני, ואין כאן מספר טלפון. לאתר לעסק שלך{" "}
          <Link href="/websites#lead" className="font-semibold underline">
            משאירים פרטים ב-BizBot
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label className="block text-sm font-medium">
        שם
        <input required name="demo-name" className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5" />
      </label>
      <label className="block text-sm font-medium">
        טלפון
        <input required name="demo-phone" type="tel" dir="ltr" className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-right" />
      </label>
      <button type="submit" className={buttonClass}>
        שליחה לדוגמה
      </button>
      <p className="text-xs leading-relaxed opacity-70">
        הטופס לא שומר כלום. באתר אמיתי הפנייה מגיעה לעסק.
      </p>
    </form>
  );
}

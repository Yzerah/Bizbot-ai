"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup, type AuthState } from "@/app/actions/auth";

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(mode === "login" ? login : signup, undefined);
  const isSignup = mode === "signup";
  const q = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{isSignup ? "יצירת חשבון חינם" : "התחברות"}</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {isSignup ? "3 הצעות מחיר ראשונות בחינם. בלי כרטיס אשראי." : "ברוכים השבים ל-BizBot."}
      </p>
      <form action={action} className="mt-8 space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        {isSignup && (
          <div>
            <label htmlFor="name" className="label">שם מלא <span className="text-neutral-400">(רשות)</span></label>
            <input id="name" name="name" className="input" autoComplete="name" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="label">אימייל</label>
          <input id="email" name="email" type="email" required dir="ltr" className="input text-right" autoComplete="email" defaultValue={state?.email} />
        </div>
        <div>
          <label htmlFor="password" className="label">סיסמה</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={isSignup ? 8 : undefined}
            dir="ltr"
            className="input text-right"
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
          {isSignup && <p className="mt-1.5 text-xs text-neutral-500">לפחות 8 תווים</p>}
        </div>
        {state?.error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {state.error}
          </div>
        )}
        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "רגע..." : isSignup ? "יצירת חשבון והתחלה" : "התחברות"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600">
        {isSignup ? (
          <>כבר יש לך חשבון? <Link href={`/login${q}`} className="font-medium text-royal-600 hover:underline">התחברות</Link></>
        ) : (
          <>אין לך חשבון? <Link href={`/signup${q}`} className="font-medium text-royal-600 hover:underline">הרשמה בחינם</Link></>
        )}
      </p>
      {isSignup && (
        <p className="mt-4 text-center text-xs text-neutral-400">
          בהרשמה את/ה מסכים/ה ל<Link href="/terms" className="underline">תנאי השימוש</Link>.
        </p>
      )}
    </div>
  );
}

"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession } from "@/lib/auth";
import { db } from "@/lib/db";

export type AuthState = { error?: string; email?: string } | undefined;

const signupSchema = z.object({
  name: z.string().trim().max(80).optional(),
  email: z.string().trim().toLowerCase().email("כתובת אימייל לא תקינה"),
  password: z.string().min(8, "הסיסמה צריכה להכיל לפחות 8 תווים").max(200),
});

function safeNext(next: FormDataEntryValue | null) {
  const v = typeof next === "string" ? next : "";
  return v.startsWith("/") && !v.startsWith("//") ? v : "/dashboard";
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const email = String(formData.get("email") ?? "");
  if (!parsed.success) return { error: parsed.error.issues[0].message, email };

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { error: "כבר קיים חשבון עם האימייל הזה. אפשר להתחבר.", email };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await db.user.create({
    data: { email: parsed.data.email, passwordHash, name: parsed.data.name || null },
  });
  await createSession(user.id);
  redirect(safeNext(formData.get("next")) === "/dashboard" ? "/quotes/new" : safeNext(formData.get("next")));
}

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "יש למלא אימייל וסיסמה", email };

  const user = await db.user.findUnique({ where: { email } });
  const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!user || !ok) return { error: "אימייל או סיסמה שגויים", email };

  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  await destroySession();
  redirect("/");
}

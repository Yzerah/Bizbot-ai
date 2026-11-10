import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-ink md:block">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_20%,rgba(61,90,254,.55)_0%,transparent_70%)]" />
        <div className="relative flex h-full flex-col justify-end p-14 text-white">
          <p className="text-3xl font-semibold leading-snug">
            הצעה מסודרת עם לוגו
            <br />
            וסכומים מדויקים —
            <br />
            והלקוח כבר רציני יותר.
          </p>
          <p className="mt-6 text-sm text-neutral-400">BizBot · הצעות מחיר לעצמאים</p>
        </div>
      </div>
    </div>
  );
}

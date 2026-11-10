import { PADDLE_MOR_EN } from "@/lib/seller";

export function MerchantOfRecordNotice({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p>
        ההזמנות מעובדות על ידי <span dir="ltr">Paddle.com</span>, שפועלת כמוכרת המקוונת ומפעילת הסליקה (Merchant of Record)
        של BizBot. Paddle מטפלת בחיוב, בחשבונית ובהחזרים. פרטי כרטיס האשראי לא נשמרים אצלנו.
      </p>
      <p lang="en" dir="ltr" className="mt-2 text-left text-xs text-neutral-500">
        {PADDLE_MOR_EN}
      </p>
    </div>
  );
}

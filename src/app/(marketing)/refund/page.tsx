import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PLANS } from "@/lib/plans";
import { publicMetadata } from "@/lib/seo";
import { PADDLE_MOR_EN, SELLER_BRAND, SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";
import { WEBSITE_HOSTING, WEBSITE_INCLUDED_HOSTING_MONTHS, formatShekel } from "@/lib/website-packages";

export const metadata: Metadata = publicMetadata({
  title: "מדיניות החזרים",
  description:
    "מדיניות ההחזרים של BizBot: 14 יום על חיוב מנוי הצעות מחיר דרך Paddle. בניית אתר אינה הזמנה ב-Paddle.",
  path: "/refund",
});

const pro = PLANS.find((plan) => plan.id === "PRO")!;
const business = PLANS.find((plan) => plan.id === "BUSINESS")!;

export default function RefundPage() {
  return (
    <LegalPage title="מדיניות החזרים וביטול">
      <section>
        <h2>חלון החזר של 14 יום</h2>
        <p className="mt-2">
          אפשר לבקש החזר מלא על חיוב של מנוי {SELLER_BRAND} תוך 14 יום ממועד החיוב. החלון חל על החיוב הראשון וגם על כל
          חידוש חודשי, ומספיקה בקשה בגלל שינוי דעה. אין צורך להוכיח תקלה.
        </p>
        <p className="mt-2">
          ההחזר מכסה את הסכום ש-Paddle חייבה באותה עסקה, בשקלים חדשים (ILS), כולל מס ש-Paddle גבתה באותה עסקה אם היא
          מחזירה אותו. מחירי המסלול הם {pro.price} ₪ לחודש ל-{pro.name} ו-{business.price} ₪ לחודש ל-{business.name}.
        </p>
      </section>

      <section>
        <h2>איך מבקשים החזר</h2>
        <p className="mt-2">
          ההחזר מעובד על ידי Paddle.com, שהיא Merchant of Record של ההזמנה. אפשר לבקש החזר באחת מהדרכים:
        </p>
        <ul className="mt-2">
          <li>
            דרך Paddle, בקישור שבקבלת התשלום או בפורטל הקונים:{" "}
            <a dir="ltr" className="text-royal-600 hover:underline" href="https://paddle.net">
              paddle.net
            </a>
          </li>
          <li>
            באימייל אל{" "}
            <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
              {SELLER_EMAIL}
            </a>{" "}
            עם כתובת החשבון ותאריך החיוב. נעביר את הבקשה ל-Paddle
          </li>
        </ul>
        <p className="mt-3">
          Paddle מחזירה את הכסף לאמצעי התשלום המקורי. אחרי שההחזר מאושר, הגישה למסלול בתשלום מסתיימת. מסלול החינם, עד
          שלוש הצעות מחיר, נשאר זמין לפי תנאי השימוש.
        </p>
      </section>

      <section>
        <h2>ביטול בלי החזר של התקופה הנוכחית</h2>
        <p className="mt-2">
          ביטול מנוי עוצר את החידוש הבא. הוא אינו אותו דבר כמו החזר. אם מבטלים אחרי 14 הימים, המסלול נשאר פעיל עד סוף
          התקופה שכבר שולמה ולא יחויב שוב.         אפשר לבטל מהאזור האישי או דרך פורטל הלקוחות של Paddle. פירוט נוסף נמצא ב<Link href="/terms" className="text-royal-600 hover:underline">תנאי השימוש</Link>.
        </p>
      </section>

      <section>
        <h2>אחרי 14 הימים</h2>
        <p className="mt-2">
          אחרי 14 הימים ממועד החיוב, אותו חיוב אינו מוחזר אוטומטית. עדיין אפשר לבטל את המנוי כדי לעצור את החיוב הבא,
          ואפשר לפנות אלינו או אל Paddle ונבדוק בקשה חריגה. אין כאן תנאי של «כל המכירות סופיות» ואין סירוב גורף להחזרים.
        </p>
      </section>

      <section>
        <h2>מי מעבדת את ההזמנה</h2>
        <p className="mt-2">
          {SELLER_NAME} מפעיל את {SELLER_BRAND}. תהליך ההזמנה של מנוי ההצעות מתבצע באמצעות המשווקת המקוונת Paddle.com,
          שהיא Merchant of Record של הזמנות המנוי ומטפלת בהחזרים שלהן. בניית אתר אינה הזמנה ב-Paddle, וחלון 14 הימים
          כאן לא חל עליה אוטומטית. תנאי ההזמנה של האתר נקבעים לפני תחילת העבודה. כל חבילה כוללת{" "}
          {WEBSITE_INCLUDED_HOSTING_MONTHS} חודשי {WEBSITE_HOSTING.name}. מהחודש הרביעי האחסון הוא{" "}
          <span className="num">{formatShekel(WEBSITE_HOSTING.price)}</span> {WEBSITE_HOSTING.unit}, אם ממשיכים לאחסן
          אצלנו. כל עוד האחסון פעיל, מחולל הצעות המחיר PRO כלול בחינם. המחירים המלאים כתובים ב<Link href="/terms" className="text-royal-600 hover:underline">תנאי השימוש</Link>.
        </p>
        <p lang="en" dir="ltr" className="mt-2 text-left text-sm text-neutral-600">
          {PADDLE_MOR_EN}
        </p>
      </section>
    </LegalPage>
  );
}

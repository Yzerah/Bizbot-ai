import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PLANS } from "@/lib/plans";
import { LEADS_OFFER, formatShekel } from "@/lib/website-packages";
import { publicMetadata } from "@/lib/seo";
import { PADDLE_MOR_EN, SELLER_BRAND, SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export const metadata: Metadata = publicMetadata({
  title: "תנאי שימוש",
  description: "תנאי השימוש של BizBot: מערכת לידים לקבלני שיפוצים, ומנוי נפרד למחולל הצעות המחיר.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="תנאי שימוש">
      <section>
        <h2>מי מפעיל את השירות</h2>
        <p className="mt-2">
          {SELLER_BRAND} מופעל על ידי {SELLER_NAME}, עוסק עצמאי בישראל. בשימוש בשירות אתם מתקשרים עם {SELLER_NAME} לגבי
          המוצר עצמו. השם המסחרי של השירות הוא {SELLER_BRAND}, והאתר הוא bizbot-ai.co.il. פניות:{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>הסכמה</h2>
        <p className="mt-2">
          יצירת חשבון או המשך שימוש בשירות הם הסכמה לתנאים אלה ול<Link href="/privacy" className="text-royal-600 hover:underline">מדיניות הפרטיות</Link>.
          רכישת מנוי היא גם הסכמה ל<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link> ולתנאי הקונה של Paddle, שמוצגים בקופה לפני התשלום.
        </p>
      </section>

      <section>
        <h2>השירות</h2>
        <p className="mt-2">
          {SELLER_BRAND} הוא כלי ליצירת, שמירה והורדה של הצעות מחיר בעברית. המסמך שנוצר הוא הצעת מחיר בלבד. הוא אינו
          חשבונית מס, קבלה, חוזה או ייעוץ מס, משפטי או חשבונאי. האחריות לתוכן ההצעה, למחירים, לפרטי הלקוח ולחישובי המס
          חלה על המשתמש. להפקת חשבוניות מס יש להשתמש במערכת שמאושרת על ידי רשות המסים.
        </p>
      </section>

      <section>
        <h2>חשבון</h2>
        <p className="mt-2">
          ההרשמה היא באימייל ובסיסמה. אתם אחראים לשמור על הסיסמה ולכל פעילות שמתבצעת בחשבון. אפשר לבקש מחיקת חשבון
          בפנייה לאימייל למעלה.
        </p>
      </section>

      <section>
        <h2>מסלולים ומחירים</h2>
        <p className="mt-2">
          המחירים נקובים בשקלים חדשים (ILS) לחודש. מסלול בתשלום הוא מנוי חודשי שמתחדש אוטומטית עד לביטול. מס שחל על
          העסקה, אם חל, מחושב ומוצג על ידי Paddle בקופה לפני אישור התשלום.
        </p>
        <ul className="mt-3">
          {PLANS.map((plan) => (
            <li key={plan.id}>
              <strong className="text-ink">{plan.name}</strong>
              {": "}
              {plan.price === 0 ? "0 ₪" : <><span className="num">{plan.price} ₪</span> לחודש</>}
              {". "}
              {plan.tagline}. כולל: {plan.features.join(" · ")}.
            </li>
          ))}
        </ul>
        <p className="mt-3">
          פריטים שמסומנים «בקרוב» בתוך מסלול BUSINESS (מספר משתמשים לעסק ותבניות מותאמות) עדיין אינם זמינים ואינם חלק
          מההתחייבות בתשלום. המסלול כולל היום את מה שכלול ב-PRO וגם תמיכה מועדפת.
        </p>
      </section>

      <section>
        <h2>מערכת לידים לקבלני שיפוצים</h2>
        <p className="mt-2">
          בנוסף למסלולי המחולל, BizBot מציעה לקבלני שיפוצים מערכת לידים: פרופיל Google לעסק, דף נחיתה, איסוף ביקורות
          מלקוחות עבר, ומחולל הצעות המחיר. זה שירות נפרד ממנוי המחולל. המחירים בשקלים, כפי שמופיעים בעמוד המחיר:
        </p>
        <ul className="mt-3">
          <li>
            הקמה: <span className="num">{formatShekel(LEADS_OFFER.setupPrice)}</span>. משולמת אחרי שהלקוח מאשר את מה שנבנה.
            שליחת טופס הפנייה אינה חיוב.
          </li>
          <li>
            תפעול: <span className="num">{formatShekel(LEADS_OFFER.monthlyPrice)}</span> לחודש, מרגע שהמערכת באוויר.
          </li>
          <li>
            הצעת השקה לחמשת הלקוחות הראשונים: <span className="num">{formatShekel(LEADS_OFFER.launchSetupPrice)}</span> הקמה
            ו-<span className="num">{formatShekel(LEADS_OFFER.launchMonthlyPrice)}</span> לחודש. אם חמשת המקומות נתפסו, חל המחיר הרגיל.
          </li>
        </ul>
        <p className="mt-3">
          אם בתוך {LEADS_OFFER.guaranteeDays} יום מהיום שהמערכת עלתה לאוויר לא נכנסה אף פנייה, דמי ההקמה חוזרים. פנייה היא
          שיחת טלפון, או שם וטלפון שהושאירו מהדף או מפרופיל הגוגל. ההחזר אינו כולל את התשלום החודשי. אין התחייבות למספר
          שיחות, לכמות עבודות, או למקום מסוים בתוצאות החיפוש. לא מצוין כאן אם הסכומים כוללים מע״מ. פירוט בעמוד המערכת.
        </p>
      </section>

      <section>
        <h2>תשלום ו-Paddle</h2>
        <p className="mt-2">
          תהליך ההזמנה של מנוי ההצעות מתבצע באמצעות המשווקת המקוונת שלנו, Paddle.com. Paddle.com היא Merchant of Record
          (המוכרת הרשומה) של הזמנות מנוי המחולל. Paddle מספקת את פניות שירות הלקוחות הקשורות להזמנת המנוי ומטפלת בהחזרים שלה.
          מערכת הלידים אינה הזמנה ב-Paddle.
        </p>
        <p lang="en" dir="ltr" className="mt-2 text-left text-sm text-neutral-600">
          {PADDLE_MOR_EN}
        </p>
        <p className="mt-2">
          BizBot לא שומרת פרטי כרטיס אשראי. שאלות על השימוש בכלי עצמו אפשר לשלוח אל{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>
          . חיוב, חשבוניות והחזרים מטופלים על ידי Paddle לפי{" "}
          <a dir="ltr" className="text-royal-600 hover:underline" href="https://www.paddle.com/legal/checkout-buyer-terms">
            תנאי הקונה של Paddle
          </a>
          .
        </p>
      </section>

      <section>
        <h2>ביטול מנוי</h2>
        <p className="mt-2">
          אפשר לבטל מנוי חודשי בכל עת, בלי דמי ביטול, מתוך האזור האישי (פורטל הלקוחות של Paddle) או בפנייה לאימייל.
          הביטול נכנס לתוקף בסוף תקופת החיוב שכבר שולמה. עד המועד הזה המסלול נשאר פעיל, ואחריו לא יבוצע חיוב נוסף.
          ביטול לבדו אינו מחזיר את התשלום של התקופה הנוכחית. להחזר כספי ראו את{" "}
          <Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link>.
        </p>
      </section>

      <section>
        <h2>שימוש אסור</h2>
        <p className="mt-2">אסור להשתמש בשירות לצורך:</p>
        <ul className="mt-2">
          <li>הפרת דין, הונאה, התחזות או הטעיה</li>
          <li>דואר זבל או פנייה בלתי רצויה</li>
          <li>הפרת זכויות יוצרים, סימני מסחר או פרטיות של אחרים</li>
          <li>פגיעה באבטחה, לרבות נוזקה, ניסיונות חדירה, סריקה פולשנית או עקיפת מגבלות הגישה</li>
        </ul>
      </section>

      <section>
        <h2>קניין רוחני</h2>
        <p className="mt-2">
          השירות, העיצוב והתוכנה הם של {SELLER_NAME}. התוכן שאתם מזינים להצעות המחיר נשאר שלכם. אתם נותנים לנו רישיון
          מוגבל לאחסן ולהציג את התוכן רק כדי להפעיל את השירות עבורכם.
        </p>
      </section>

      <section>
        <h2>זמינות</h2>
        <p className="mt-2">
          השירות ניתן כמות שהוא. אין התחייבות שהשירות יפעל בלי הפרעות או בלי שגיאות, או שכל פלט יהיה מדויק. תוצאות
          החישוב הן עזר למשתמש, והאחריות לבדוק אותן לפני שליחה ללקוח היא של המשתמש.
        </p>
      </section>

      <section>
        <h2>השעיה וסיום</h2>
        <p className="mt-2">
          אפשר להשעות או לסגור חשבון במקרה של הפרה מהותית של התנאים, אי-תשלום, סיכון אבטחה או הונאה, או הפרות חמורות
          או חוזרות. אתם יכולים להפסיק להשתמש בשירות ולבקש מחיקת חשבון בכל עת.
        </p>
      </section>

      <section>
        <h2>אחריות</h2>
        <p className="mt-2">
          במידה שהדין מתיר זאת, האחריות של {SELLER_NAME} בקשר לשירות מוגבלת לסכום ששולם עבור המנוי בשלושת החודשים שקדמו
          לאירוע, או ל-100 ₪, לפי הגבוה מביניהם. ההגבלה אינה חלה על אחריות שאי אפשר להגביל לפי דין.
        </p>
      </section>

      <section>
        <h2>שינויים</h2>
        <p className="mt-2">
          התנאים עשויים להתעדכן. הגרסה העדכנית מתפרסמת בעמוד זה עם תאריך העדכון. המשך שימוש אחרי העדכון הוא הסכמה לנוסח
          החדש. שינוי מהותי במחיר של מנוי פעיל יחול מהחידוש הבא, והמחיר יוצג בקופה של Paddle לפני החיוב.
        </p>
      </section>

      <section>
        <h2>דין</h2>
        <p className="mt-2">על תנאים אלה חלים דיני מדינת ישראל. סמכות השיפוט היא לבתי המשפט המוסמכים בישראל.</p>
      </section>
    </LegalPage>
  );
}

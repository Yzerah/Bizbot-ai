import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { SELLER_BRAND, SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

export default function PrivacyPage() {
  return (
    <LegalPage title="מדיניות פרטיות">
      <section>
        <h2>מי אחראי על המידע</h2>
        <p className="mt-2">
          {SELLER_NAME}, עוסק עצמאי בישראל, המפעיל את {SELLER_BRAND}, הוא הגורם שאליו פונים בנושא פרטיות. אימייל לפניות
          פרטיות:{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>
          . כתובת רחוב אינה מפורסמת בעמוד זה. לפנייה רשמית כתבו לאימייל ונשיב אליה.
        </p>
      </section>

      <section>
        <h2>איזה מידע נשמר</h2>
        <ul className="mt-2">
          <li>פרטי חשבון: אימייל, סיסמה בגיבוב (bcrypt) ושם אם מסרתם אותו</li>
          <li>פרטי עסק שאתם מזינים להצעה: שם, טלפון, אימייל, מספר עוסק או ח.פ ולוגו</li>
          <li>תוכן הצעות המחיר: פרטי הלקוח, שורות, סכומים, הערות ותאריכים</li>
          <li>פנייה לבניית אתר: שם, טלפון, אימייל אם נמסר, סוג העסק, החבילה, אם ביקשתם אחסון חודשי, והודעה אם כתבתם אחת</li>
          <li>עוגיית סשן בשם bizbot_session, מסומנת httpOnly, כדי להשאיר אתכם מחוברים</li>
          <li>
            פרטי מנוי שמגיעים מ-Paddle אחרי תשלום מאומת: מזהה לקוח, מזהה מנוי, סטטוס, מזהה מחיר ומועד סיום התקופה.
            אנחנו לא שומרים מספר כרטיס אשראי, תוקף או קוד אבטחה
          </li>
        </ul>
      </section>

      <section>
        <h2>למה המידע משמש</h2>
        <ul className="mt-2">
          <li>פתיחת חשבון, התחברות והפעלת השירות שביקשתם</li>
          <li>שמירה, עריכה והורדה של הצעות המחיר</li>
          <li>אכיפת מגבלת שלוש ההצעות במסלול החינם והפעלת מסלול PRO או BUSINESS אחרי תשלום</li>
          <li>טיפול בפניות תמיכה ופרטיות, וחזרה אליכם לגבי בניית אתר</li>
          <li>אבטחת החשבון ומניעת שימוש לרעה</li>
        </ul>
        <p className="mt-3">
          הבסיס לעיבוד הוא ההתקשרות בינינו לבין המשתמש לצורך אספקת השירות, וכן הצורך להפעיל את השירות בצורה מאובטחת.
          איננו מוכרים מידע אישי.
        </p>
      </section>

      <section>
        <h2>עם מי המידע משותף</h2>
        <ul className="mt-2">
          <li>
            <strong className="text-ink">Paddle.com</strong>, Merchant of Record והמשווקת המקוונת של ההזמנות. Paddle
            מקבלת את האימייל ואת פרטי התשלום כדי לחייב, להפיק חשבונית, לנהל את המנוי ולטפל בהחזרים. מדיניות הפרטיות של
            Paddle:{" "}
            <a dir="ltr" className="text-royal-600 hover:underline" href="https://www.paddle.com/legal/privacy">
              paddle.com/legal/privacy
            </a>
          </li>
          <li>Vercel, שמארחת את האתר</li>
          <li>Neon, שמפעילה את מסד הנתונים PostgreSQL</li>
          <li>רשויות, אם הדין מחייב זאת</li>
        </ul>
      </section>

      <section>
        <h2>עוגיות</h2>
        <p className="mt-2">
          אנחנו משתמשים בעוגיית סשן הכרחית אחת, httpOnly, כדי לזהות משתמש מחובר. אין עוגיות פרסום ואין מעקב שיווקי של
          צד שלישי מטעמנו. קופת התשלום של Paddle פועלת אצל Paddle ועשויה להשתמש בעוגיות שלה לפי המדיניות שלהם.
        </p>
      </section>

      <section>
        <h2>שמירת מידע</h2>
        <p className="mt-2">
          פרטי החשבון וההצעות נשמרים כל עוד החשבון פעיל. פנייה לבניית אתר נשמרת כדי לטפל בבקשה, ואפשר לבקש למחוק אותה. אחרי בקשת מחיקה נמחק את החשבון ואת תוכן ההצעות, למעט מידע שחובה
          לשמור לפי דין או שנדרש לטיפול בחיוב שכבר בוצע אצל Paddle. מזהי המנוי נשמרים כדי לדעת איזה מסלול פעיל וכדי
          לאפשר ביטול.
        </p>
      </section>

      <section>
        <h2>אבטחה</h2>
        <p className="mt-2">
          הסיסמה נשמרת כגיבוב בלבד. החיבור לאתר מוצפן (HTTPS). עוגיית הסשן אינה נגישה לסקריפטים בדפדפן. פרטי הכרטיס
          מוזנים בקופה של Paddle ולא אצלנו. אין שיטת אבטחה שמבטיחה הגנה מוחלטת, ואנחנו פועלים בצורה סבירה כדי לצמצם
          סיכון.
        </p>
      </section>

      <section>
        <h2>זכויות</h2>
        <p className="mt-2">
          לפי חוק הגנת הפרטיות, התשמ״א-1981, אפשר לבקש לעיין במידע אישי, לתקן אותו או למחוק אותו. פנו אל{" "}
          <a dir="ltr" className="font-medium text-royal-600 hover:underline" href={`mailto:${SELLER_EMAIL}`}>
            {SELLER_EMAIL}
          </a>{" "}
          ונשיב תוך זמן סביר. מחיקת חשבון אינה מוחקת אוטומטית רישומי חיוב שנמצאים אצל Paddle. בבקשות כאלה Paddle היא
          הגורם שמחזיק בפרטי התשלום.
        </p>
      </section>

      <section>
        <h2>עיבוד מחוץ לישראל</h2>
        <p className="mt-2">
          Paddle, ספק האחסון וספק מסד הנתונים עשויים לעבד מידע מחוץ לישראל, בין היתר בבריטניה, באיחוד האירופי או
          בארצות הברית. תשלום מתבצע לפי מדיניות הפרטיות של Paddle. אנחנו מעבירים לספקים האלה רק את מה שנדרש כדי להפעיל
          את השירות ואת החיוב.
        </p>
      </section>

      <section>
        <h2>ילדים</h2>
        <p className="mt-2">השירות מיועד לעצמאים ולעסקים, ולא לילדים.</p>
      </section>

      <section>
        <p className="mt-2">
          תנאי השימוש נמצאים ב<Link href="/terms" className="text-royal-600 hover:underline">עמוד התנאים</Link>, ומדיניות
          ההחזרים ב<Link href="/refund" className="text-royal-600 hover:underline">עמוד ההחזרים</Link>.
        </p>
      </section>
    </LegalPage>
  );
}

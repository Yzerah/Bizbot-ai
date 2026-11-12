# BizBot — הצעות מחיר מקצועיות לעצמאים

גרסה ראשונה (v1) של BizBot, מיקרו-SaaS בעברית מלאה (RTL) לעצמאים ולעסקים קטנים בישראל.
הדומיין המיועד: **bizbot-ai.co.il**

## מה יש בגרסה הזו
- דף בית ושירות בניית אתרים (`/websites`): דף נחיתה 990 ₪, אתר עסקי 1,990 ₪, אתר + קידום 2,990 ₪. כל חבילה כוללת 3 חודשי אחסון ועדכונים, ומהחודש הרביעי 49 ₪ לחודש. כל עוד האתר מאוחסן אצלנו, מחולל הצעות המחיר PRO כלול בחינם. טופס פניות נשמר ב-`WebsiteLead`.
- דף מחירים לכלי ההצעות (חינם: 3 מסמכים · PRO: ‏29 ₪ לחודש · BUSINESS: ‏59 ₪ לחודש)
- הרשמה והתחברות אמיתיות: אימייל + סיסמה (bcrypt), עוגיית סשן httpOnly, יציאה
- אזור אישי עם רשימת ההצעות
- מחולל הצעות מחיר: פרטי העסק (שם, לוגו, טלפון, אימייל, עוסק/ח.פ), פרטי הלקוח, שורות (תיאור/כמות/מחיר) עם הוספה והסרה, מע״מ 18% להפעלה/כיבוי, תוקף בימים, הערות, חישוב סכומים באגורות
- PDF מקצועי בעברית (‎@react-pdf/renderer, גופן IBM Plex Sans Hebrew) להורדה ולתצוגה
- שמירה במסד נתונים, עריכה והורדה חוזרת, מחיקה
- פרטי העסק נזכרים אוטומטית להצעה הבאה
- מגבלת מסלול חינם: אחרי 3 הצעות נחסמת יצירת הצעות חדשות ומוצג דף שדרוג ל-PRO
- שדרוג בתשלום דרך Paddle Billing (Merchant of Record): כפתורי PRO ו-BUSINESS פותחים את קופת ה-overlay של Paddle.js עם מזהה המשתמש והאימייל ב-`customData`. בלי משתני Paddle הכפתורים מוצגים כ«בקרוב» ולא מתבצע חיוב
- Webhook חתום ב-`/api/paddle/webhook` שמעדכן על המשתמש מזהה מנוי, מזהה לקוח, סטטוס, מסלול וסוף תקופת החיוב. מסלול החינם נשאר 3 מסמכים; PRO ו-BUSINESS לפי הלוגיקה הקיימת
- ניהול וביטול מנוי למנויים: פורטל הלקוחות של Paddle, וגם ביטול לסוף התקופה דרך ה-API
- עמודי תנאי שימוש (`/terms`), פרטיות (`/privacy`), החזרים (`/refund`) ויצירת קשר (`/contact`)

> BizBot מפיק **הצעות מחיר בלבד** — לא חשבוניות מס, קבלות או חוזים.

## טכנולוגיה
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Prisma 6 · PostgreSQL (פרודקשן) · SQLite (פיתוח מקומי) · ‎@react-pdf/renderer · bcryptjs · zod

## הרצה מקומית
דרישות: Node.js 22 (‏`engines: 22.x`, כמו ב-Vercel; גם 20 ומעלה עובד).

```bash
npm install
cp .env.example .env            # ועדכנו AUTH_SECRET:  openssl rand -base64 32
npm run db:deploy               # מחיל מיגרציות על prisma/dev.db (SQLite)
npm run db:seed                 # אופציונלי: משתמש דמו
npm run dev                     # http://localhost:3000
```

### SQLite מקומית מול PostgreSQL
מקור האמת הוא `prisma/schema.prisma` (provider ‏`postgresql`) עם המיגרציות ב-`prisma/migrations` — זה מה שרץ בפרודקשן.
כל הפקודות עוברות דרך `scripts/prisma.mjs`, שבוחר סכמה לפי `DATABASE_URL`:

| `DATABASE_URL` | סכמה | מיגרציות |
|---|---|---|
| `file:../dev.db` | `prisma/sqlite/schema.prisma` (נוצרת אוטומטית מהסכמה הראשית, ב-gitignore) | `prisma/sqlite/migrations` |
| `postgresql://...` | `prisma/schema.prisma` | `prisma/migrations` |
| לא מוגדר | Postgres: ‏`prisma generate` בלבד, המיגרציות מדולגות עם אזהרה | — |

- נתיב SQLite יחסי לתיקייה `prisma/sqlite/`, לכן `file:../dev.db` = ‏`prisma/dev.db` (הקובץ הקיים). מי שהיה לו ‎`file:./dev.db`‎ ב-`.env` צריך לעדכן ל-‎`file:../dev.db`‎.
- `npm run dev` ו-`npm install` מריצים `prisma generate` לספק הנכון, כך שמעבר בין SQLite ל-Postgres = שינוי `DATABASE_URL` בלבד.
- מיגרציית `WebsiteLead` נמצאת ב-`prisma/migrations/20261110180000_website_leads` (Postgres) וב-`prisma/sqlite/migrations/20261110180000_website_leads` (SQLite). `npm run db:deploy` מחיל אותה. ב-Vercel זה קורה בתוך `npm run build`.
- **שינוי מודל:** עורכים רק את `prisma/schema.prisma`, ואז יוצרים מיגרציה לשני הספקים:
  `DATABASE_URL="postgresql://..." npm run db:migrate -- --name <שם>` (מול Postgres מקומי או ענף Neon לפיתוח — לא מול פרודקשן),
  ו-`npm run db:migrate -- --name <שם>` עם ה-SQLite המקומי.
- אפשר לעבוד מקומית גם מול Postgres בלבד (Docker,‏ `npx prisma dev`, או ענף Neon) — פשוט שמים את ה-URL שלו ב-`.env`.

גרסת production מקומית:
```bash
npm run build && npm run start
```

משתמש דמו (רק אם הרצתם `npm run db:seed`, לפיתוח בלבד):
`demo@example.com` / `Demo12345!`

> הערה ל-npm 11 ומעלה: סקריפטי ההתקנה של Prisma כבר מאושרים ב-`package.json`. אם `prisma generate` לא רץ אוטומטית, הריצו `npx prisma generate`.

## משתני סביבה
| משתנה | חובה | תיאור |
|---|---|---|
| `DATABASE_URL` | כן | מקומית: `file:../dev.db`. בפרודקשן: מחרוזת חיבור ל-Postgres (ב-Neon: ה-URL עם `-pooler`) |
| `DIRECT_URL` | לא | חיבור ישיר (ללא pooler) למיגרציות. ברירת מחדל: `DATABASE_URL_UNPOOLED` → `POSTGRES_URL_NON_POOLING` → `DATABASE_URL` |
| `AUTH_SECRET` | כן | סוד לחתימת טוקני הסשן (לפחות 16 תווים). `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | כן בפרודקשן | `https://bizbot-ai.co.il`. כתובות קנוניות, מפת אתר, robots ו-JSON-LD נלקחות מ-`https://bizbot-ai.co.il` ב-`src/lib/site.ts`, גם אם כאן יש כתובת של תצוגה מקדימה |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | לא | תוכן תג האימות של Google Search Console (הערך של `content`, בלי התג עצמו). אימות בקובץ כבר נמצא ב-`/google30a65c06550bbcc7.html` |
| `NEXT_PUBLIC_PADDLE_ENV` | לא | `sandbox` או `production`. בלי כל משתני Paddle הציבוריים, כפתורי השדרוג נשארים «בקרוב» |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | לא | טוקן צד-לקוח של Paddle (`test_...` / `live_...`). מיועד להיות פומבי |
| `NEXT_PUBLIC_PADDLE_PRICE_PRO` | לא | מזהה מחיר חודשי `pri_...` למסלול PRO, ‏29 ₪ |
| `NEXT_PUBLIC_PADDLE_PRICE_BUSINESS` | לא | מזהה מחיר חודשי `pri_...` למסלול BUSINESS, ‏59 ₪ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | לא | מספר וואטסאפ בספרות, עם קידומת מדינה. בלי הערך כפתור הוואטסאפ מוסתר |
| `ADMIN_EMAILS` | לא | אימיילים מופרדים בפסיק שיכולים לראות את `/admin/leads`. חייב להיות משתמש מחובר |
| `PADDLE_API_KEY` | לא | מפתח API של השרת. לא לחשוף בדפדפן. נדרש לפורטל הלקוחות ולביטול |
| `PADDLE_WEBHOOK_SECRET` | לא | מפתח החתימה של יעד ההתראות. בלי המפתח ה-webhook מחזיר 503 ולא מעדכן מסלול |

## פריסה ל-Vercel
SQLite לא מתאים ל-Vercel (מערכת הקבצים זמנית), ולכן בפרודקשן משתמשים ב-PostgreSQL (Neon). הקוד כבר מוכן — אין צורך לשנות provider.

- פרויקט: `bizbot-ai-co-il`, דומיין: `bizbot-ai.co.il`.
- `vercel.json` קובע `installCommand: npm install` ו-`buildCommand: npm run build`.
- `npm run build` = ‏`node scripts/prisma.mjs setup && next build`, כלומר `prisma migrate deploy` (מול `DIRECT_URL`) → `prisma generate` → `next build`.
  - אם `DATABASE_URL` חסר: מקומית/Preview — המיגרציות מדולגות עם אזהרה וה-build ממשיך; ב-Production (`VERCEL_ENV=production`) ה-build נכשל במכוון.
  - אם מיגרציה נכשלת — ה-build נכשל, והגרסה הקודמת נשארת באוויר.
- Node: ‏`engines.node = "22.x"`.

משתני סביבה ב-Vercel → Settings → Environment Variables (Production, ובמידת הצורך Preview):
1. `DATABASE_URL` — Postgres pooled (אינטגרציית Neon מגדירה אותו אוטומטית, יחד עם `DATABASE_URL_UNPOOLED`).
2. `AUTH_SECRET` — `openssl rand -base64 32` (חובה; בלעדיו ההתחברות לא תעבוד).
3. `NEXT_PUBLIC_APP_URL=https://bizbot-ai.co.il`. כתובות קנוניות נשארות על הדומיין הזה גם בפריסה אחרת.
4. אופציונלי: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` עם ערך תג האימות של Search Console. אימות בקובץ כבר מוגש מ-`/google30a65c06550bbcc7.html`.
5. כשמוכנים לסליקה, גם את משתני Paddle מהטבלה למעלה (Production ו-Preview). אחרי שמירה צריך פריסה מחדש. ב-Paddle → Notifications יוצרים יעד כתובת:

   `https://bizbot-ai.co.il/api/paddle/webhook`

   ומסמנים את האירועים: `subscription.created`, `subscription.updated`, `subscription.activated`, `subscription.canceled`, `subscription.past_due`, `subscription.paused`, `subscription.resumed`, `subscription.trialing`.

גופני ה-PDF נכללים אוטומטית בפונקציה (`outputFileTracingIncludes` ב-`next.config.ts`).
`.vercelignore` מונע העלאה של `node_modules`,‏ `.next`,‏ `.env`,‏ `*.db`,‏ `prisma/sqlite` ו-`screenshots` בפריסה דרך ה-CLI.

## מבנה הפרויקט
```
src/app/(marketing)     דף הבית, בניית אתרים, מחירים, תנאי שימוש, פרטיות, החזרים, יצירת קשר
src/app/(examples)      שלושה אתרי דוגמה בדיוניים תחת /websites/examples
src/app/admin/leads     רשימת פניות אתר, רק לאימיילים שב-ADMIN_EMAILS
src/app/(auth)          הרשמה, התחברות
src/app/(app)           אזור אישי, הצעות (חדשה/צפייה/עריכה), שדרוג — מוגן בהתחברות
src/app/api/quotes/[id]/pdf   יצירת ה-PDF בצד השרת
src/app/api/paddle/webhook    אימות חתימת Paddle ועדכון המנוי
src/app/actions         Server Actions: הרשמה/התחברות, שמירת הצעה, בקשת שדרוג, פורטל וביטול
src/lib                 auth (סשנים), db, חישובי הצעה, פורמט ₪ ותאריכים, מסמך ה-PDF
prisma/schema.prisma    User, Session, Quote, UpgradeRequest, WebsiteLead (PostgreSQL — מקור האמת)
prisma/migrations       מיגרציות PostgreSQL (פרודקשן)
prisma/sqlite           מיגרציות SQLite לפיתוח מקומי (+ סכמה נגזרת, לא ב-git)
scripts/prisma.mjs      בחירת סכמה לפי DATABASE_URL, migrate/generate
assets/fonts            IBM Plex Sans Hebrew (רישיון OFL)
screenshots/            צילומי מסך ודוגמת PDF
```

## מה הלאה
1. וידוא חידוש אוטומטי של הדומיין bizbot-ai.co.il אצל הרשם.
2. **הפעלת הסליקה ב-Paddle**: ליצור שני מחירים חודשיים ב-ILS (PRO ‏29, BUSINESS ‏59), להגדיר את משתני הסביבה, ולחבר את ה-webhook `https://bizbot-ai.co.il/api/paddle/webhook` לאירועי המנוי שמפורטים בסעיף הפריסה. בלי המשתנים האתר נשאר במצב «בקרוב». מזהי המחיר (`pri_...`) מוחלפים ב-Paddle; הקוד לא קובע את הסכום שנגבה.
3. **התחברות עם Google** (Auth.js או OAuth ישיר) לצד אימייל וסיסמה.
4. איפוס סיסמה ואימות אימייל.
5. העברת לוגואים לאחסון קבצים (Vercel Blob / S3) במקום שמירה במסד.
6. שליחת ההצעה ישירות ללקוח (וואטסאפ/מייל) ותבניות שורות שמורות.

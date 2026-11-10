# BizBot — הצעות מחיר מקצועיות לעצמאים

גרסה ראשונה (v1) של BizBot, מיקרו-SaaS בעברית מלאה (RTL) לעצמאים ולעסקים קטנים בישראל.
הדומיין המיועד: **bizbot-ai.co.il**

## מה יש בגרסה הזו
- דף נחיתה ודף מחירים (חינם: 3 מסמכים · PRO: ‏119 ₪ לחודש · BUSINESS: ‏249 ₪ לחודש)
- הרשמה והתחברות אמיתיות: אימייל + סיסמה (bcrypt), עוגיית סשן httpOnly, יציאה
- אזור אישי עם רשימת ההצעות
- מחולל הצעות מחיר: פרטי העסק (שם, לוגו, טלפון, אימייל, עוסק/ח.פ), פרטי הלקוח, שורות (תיאור/כמות/מחיר) עם הוספה והסרה, מע״מ 18% להפעלה/כיבוי, תוקף בימים, הערות, חישוב סכומים באגורות
- PDF מקצועי בעברית (‎@react-pdf/renderer, גופן IBM Plex Sans Hebrew) להורדה ולתצוגה
- שמירה במסד נתונים, עריכה והורדה חוזרת, מחיקה
- פרטי העסק נזכרים אוטומטית להצעה הבאה
- מגבלת מסלול חינם: אחרי 3 הצעות נחסמת יצירת הצעות חדשות ומוצג דף שדרוג ל-PRO
- דף שדרוג/תשלום: **לא מבצע חיוב ולא מסמן תשלום כהצלחה**. הוא שומר בקשת שדרוג (טבלת `UpgradeRequest`) ומסביר שהסליקה תחובר בשלב הבא

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
| `NEXT_PUBLIC_APP_URL` | כן בפרודקשן | `https://bizbot-ai.co.il` (משמש ל-metadataBase; ברירת המחדל בקוד זהה) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_BUSINESS` | בהמשך | שמורים לחיבור Stripe |
| `GROW_PAGE_CODE`, `GROW_USER_ID`, `GROW_API_KEY` | בהמשך | שמורים לחיבור Grow (משולם) |

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
3. `NEXT_PUBLIC_APP_URL=https://bizbot-ai.co.il`.

גופני ה-PDF נכללים אוטומטית בפונקציה (`outputFileTracingIncludes` ב-`next.config.ts`).
`.vercelignore` מונע העלאה של `node_modules`,‏ `.next`,‏ `.env`,‏ `*.db`,‏ `prisma/sqlite` ו-`screenshots` בפריסה דרך ה-CLI.

## מבנה הפרויקט
```
src/app/(marketing)     דף נחיתה, מחירים, תנאי שימוש
src/app/(auth)          הרשמה, התחברות
src/app/(app)           אזור אישי, הצעות (חדשה/צפייה/עריכה), שדרוג — מוגן בהתחברות
src/app/api/quotes/[id]/pdf   יצירת ה-PDF בצד השרת
src/app/actions         Server Actions: הרשמה/התחברות, שמירת הצעה, בקשת שדרוג
src/lib                 auth (סשנים), db, חישובי הצעה, פורמט ₪ ותאריכים, מסמך ה-PDF
prisma/schema.prisma    User, Session, Quote, UpgradeRequest (PostgreSQL — מקור האמת)
prisma/migrations       מיגרציות PostgreSQL (פרודקשן)
prisma/sqlite           מיגרציות SQLite לפיתוח מקומי (+ סכמה נגזרת, לא ב-git)
scripts/prisma.mjs      בחירת סכמה לפי DATABASE_URL, migrate/generate
assets/fonts            IBM Plex Sans Hebrew (רישיון OFL)
screenshots/            צילומי מסך ודוגמת PDF
```

## מה הלאה
1. וידוא חידוש אוטומטי של הדומיין bizbot-ai.co.il אצל הרשם.
2. **סליקה — Stripe או Grow**: יצירת Checkout למסלול PRO (119 ₪/חודש), webhook שמעדכן `User.plan` ל-PRO רק אחרי תשלום מאושר, דף ניהול מנוי וביטול. נקודת החיבור: `src/app/actions/upgrade.ts`.
3. **התחברות עם Google** (Auth.js או OAuth ישיר) לצד אימייל וסיסמה.
4. איפוס סיסמה ואימות אימייל.
5. העברת לוגואים לאחסון קבצים (Vercel Blob / S3) במקום שמירה במסד.
6. שליחת ההצעה ישירות ללקוח (וואטסאפ/מייל) ותבניות שורות שמורות.

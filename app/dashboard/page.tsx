'use client'
import { useState } from 'react'

export default function Dashboard(){
 const [client,setClient] = useState('משפחת כהן - רחוב הרצל 15')
 const [price,setPrice] = useState('1850')
 const [address,setAddress] = useState('ראש העין')

 const createQuote = () => {
   const win = window.open('','','width=900,height=800')
   if(!win) return
   win.document.write(`
<div dir="rtl" style="font-family:system-ui;padding:50px;max-width:800px;margin:auto;color:#0f172a;line-height:1.6">
  <div style="display:flex;justify-content:space-between;border-bottom:4px solid #0f172a;padding-bottom:20px">
    <div><h1 style="margin:0;font-size:30px;font-weight:900">הצעת מחיר - אינסטלציה</h1><p style="margin:0;color:#64748b">טיפול חירום: סתימה + פיצוץ צנרת</p></div>
    <div style="text-align:left"><b>BizBot-AI.co.il</b><br/>אינסטלטור מוסמך<br/>אחריות מלאה | זמינות 24/6</div>
  </div>

  <div style="margin-top:30px;background:#f8fafc;padding:16px;border-radius:12px;display:flex;justify-content:space-between">
    <div><b>לקוח:</b> ${client}<br/><b>כתובת:</b> ${address}</div>
    <div style="text-align:left"><b>תאריך:</b> ${new Date().toLocaleDateString('he-IL')}<br/><b>תוקף:</b> 7 ימים<br/><b>סטטוס:</b> <span style="color:#dc2626;font-weight:900">דחוף - סכנת הצפה</span></div>
  </div>

  <h3 style="margin-top:30px">1. אבחון הבעיה</h3>
  <p>סתימה קשה בקו ביוב ראשי הגורמת ללחץ ופיצוץ בחיבור הצנרת. ללא טיפול מיידי קיימת סכנת הצפת ביוב, נזק לריצוף וריח קשה. נדרש פתיחה מכנית + איטום והחלפת מקטע פגום.</p>

  <h3>2. מה כולל הטיפול</h3>
  <ul>
    <li>הגעה עד 3 שעות - כולל איתור מדויק עם מצלמה תרמית</li>
    <li>פתיחת סתימה עם ביובית / ספירלה חשמלית מקצועית</li>
    <li>חיתוך והחלפת 1-2 מטר צנרת פגומה + מחברים תקניים</li>
    <li>בדיקת לחץ ואיטום, ניקיון ופינוי פסולת</li>
    <li>צילום אחרי + אחריות 12 חודשים על העבודה</li>
  </ul>

  <table style="width:100%;margin-top:30px;border-collapse:collapse">
    <tr style="background:#0f172a;color:#fff"><th style="padding:12px;text-align:right">פריט</th><th style="padding:12px">סכום</th></tr>
    <tr><td style="padding:12px;border-bottom:1px solid #eee">עבודת חירום + פתיחת סתימה</td><td style="padding:12px;border-bottom:1px solid #eee">750 ₪</td></tr>
    <tr><td style="padding:12px;border-bottom:1px solid #eee">החלפת צנרת, חומרים ואיטום</td><td style="padding:12px;border-bottom:1px solid #eee">800 ₪</td></tr>
    <tr><td style="padding:12px;border-bottom:1px solid #eee">אחריות, בדיקה ופינוי</td><td style="padding:12px;border-bottom:1px solid #eee">300 ₪</td></tr>
    <tr style="font-weight:900;font-size:18px"><td style="padding:12px">סה"כ כולל מע"מ</td><td style="padding:12px">${price} ₪</td></tr>
  </table>

  <div style="margin-top:24px;padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:13px"><b>שימו לב:</b> דחיית טיפול עלולה לגרום להצפה, עובש ונזק לתשתית הבניין בעלות גבוהה פי 3-4. המחיר כולל הכל - אין הפתעות.</div>

  <div style="margin-top:40px;display:flex;gap:20px"><div style="flex:1;border:1px solid #000;padding:20px;border-radius:12px;text-align:center">חתימת לקוח<br/><br/><br/>__________</div><div style="flex:1;border:1px dashed #94a3b8;padding:20px;border-radius:12px;text-align:center;color:#64748b">לאישור בוואטסאפ שלחו: מאשר/ת ${price}₪</div></div>
  <p style="margin-top:30px;color:#94a3b8;font-size:11px;text-align:center">המסמך הופק ב-BizBot-AI.co.il | אינסטלטור מורשה | אחריות כתובה</p>
  <script>window.print()</script>
</div>
   `)
 }

 return(
  <main dir="rtl" style={{padding:24,maxWidth:650,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>מחולל הצעות לאינסטלטור</h1>
   <p style={{color:'#64748b'}}>תמלא 3 שדות - תקבל הצעה שסוגרת, לא טבלה מוורד</p>
   <div style={{marginTop:20,border:'2px solid #000',borderRadius:16,padding:20,display:'grid',gap:10}}>
     <input value={client} onChange={e=>setClient(e.target.value)} placeholder="שם לקוח" style={{padding:12,border:'1px solid #000',borderRadius:8}}/>
     <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="כתובת" style={{padding:12,border:'1px solid #000',borderRadius:8}}/>
     <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="מחיר כולל" style={{padding:12,border:'1px solid #000',borderRadius:8}}/>
     <button onClick={createQuote} style={{padding:14,background:'#000',color:'#fff',borderRadius:10,fontWeight:800,marginTop:8}}>צור הצעת מחיר שמוכרת →</button>
   </div>
  </main>
 )
}
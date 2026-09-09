'use client'
import { useState } from 'react'

export default function Dashboard(){
 const [form,setForm] = useState({ profession:'', client:'', issue:'', price:'' })
 const [out,setOut] = useState('')

 const create = () => {
   if(!form.profession || !form.client || !form.issue) return alert('תמלא מקצוע, שם לקוח ומה הבעיה')
   
   const text = `הצעת מחיר - ${form.profession} מקצועי
לכבוד: ${form.client}

1. אבחון:
הבנתי שאתה צריך: ${form.issue}

2. הפתרון שלי כ-${form.profession}:
• אפיון וייעוץ מקצועי בתחום ה-${form.profession}
• ביצוע מלא ומדויק של: ${form.issue}
• שימוש בחומרים / כלים / ידע ברמה הגבוהה ביותר
• בדיקה, ליטוש וסיום מושלם עד שאתה מרוצה 100%

3. למה דווקא עכשיו:
דחייה של ${form.issue} רק תעלה יותר ותגרום לעוגמת נפש. טיפול מקצועי היום חוסך זמן, כסף וכאב ראש.

4. השקעה:
${form.price} ₪ כולל מע"מ - סופי, אין הפתעות.
כולל אחריות מלאה וליווי אישי.

BizBot-AI.co.il | ${form.profession} מומלץ`

   setOut(text)
 }

 const print = () => {
   const w = window.open('','','width=900,height=800')
   w?.document.write(`<div dir="rtl" style="font-family:system-ui;padding:40px;white-space:pre-wrap;line-height:1.8">${out}<script>window.print()</script></div>`)
 }

 return(
  <main dir="rtl" style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:24,fontWeight:900}}>BizBot - כל מקצוע בעולם</h1>
   <p style={{color:'#666'}}>תכתוב איזה מקצוע שאתה רוצה</p>
   
   <input placeholder="איזה מקצוע? למשל: מעצב גרפי" value={form.profession} onChange={e=>setForm({...form, profession:e.target.value})} style={{width:'100%',padding:12,marginTop:12,border:'2px solid #000',borderRadius:8}}/>
   <input placeholder="שם לקוח" value={form.client} onChange={e=>setForm({...form, client:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <textarea placeholder="מה הבעיה / מה הלקוח צריך? למשל: צריך לוגו ומיתוג לעסק חדש" value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8,minHeight:90}}/>
   <input placeholder="מחיר" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   
   <button onClick={create} style={{width:'100%',padding:14,marginTop:12,background:'#000',color:'#fff',borderRadius:10,fontWeight:800}}>צור הצעה לפי המקצוע →</button>
   
   {out && <><div style={{marginTop:16,background:'#f4f4f5',padding:14,borderRadius:10,whiteSpace:'pre-wrap'}}>{out}</div><button onClick={print} style={{width:'100%',padding:14,marginTop:8,border:'2px solid #000',borderRadius:10,fontWeight:800}}>הורד PDF</button></>}
  </main>
 )
}
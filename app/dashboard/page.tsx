'use client'
import { useState } from 'react'

export default function Dashboard(){
 const [form,setForm] = useState({ profession:'אינסטלטור', client:'', issue:'', price:'' })
 const [out,setOut] = useState('')

 const create = () => {
   if(!form.client || !form.issue) return alert('תמלא שם לקוח ומה הבעיה')
   const t = `הצעת מחיר - ${form.profession}\nלקוח: ${form.client}\n\nאבחון: ${form.issue}\n\nמה כולל: טיפול מקצועי מלא ב-${form.issue}, כולל חומרים, עבודה, בדיקה וסיום מושלם.\nלמה דחוף: דחיית הטיפול תגרום לנזק גדול יותר ועלות גבוהה יותר.\nאחריות: אחריות מלאה 12 חודשים.\n\nסה"כ: ${form.price} ₪ כולל מע"מ`
   setOut(t)
 }

 const print = () => {
   const w = window.open('','','width=900,height=800')
   w?.document.write(`<div dir="rtl" style="font-family:system-ui;padding:40px"><pre style="white-space:pre-wrap;font-family:system-ui;line-height:1.7">${out}</pre><script>window.print()</script></div>`)
 }

 return(
  <main dir="rtl" style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:24,fontWeight:900}}>BizBot - לכל המקצועות</h1>
   <select value={form.profession} onChange={e=>setForm({...form, profession:e.target.value})} style={{width:'100%',padding:12,marginTop:16,border:'2px solid #000',borderRadius:8}}>
     <option>אינסטלטור</option><option>חשמלאי</option><option>שיפוצניק</option><option>טכנאי מזגנים</option><option>נגר</option><option>מעצב/בונה אתרים</option><option>עו"ד</option><option>רו"ח</option><option>מאמן/מטפל</option><option>אחר</option>
   </select>
   <input placeholder="שם לקוח" value={form.client} onChange={e=>setForm({...form, client:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <textarea placeholder="מה הבעיה של הלקוח? למשל: פיצוץ בצנרת במטבח" value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8,minHeight:90}}/>
   <input placeholder="מחיר" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <button onClick={create} style={{width:'100%',padding:14,marginTop:12,background:'#000',color:'#fff',borderRadius:10,fontWeight:800}}>צור הצעה לפי הבעיה →</button>
   {out && <><div style={{marginTop:16,background:'#f4f4f5',padding:14,borderRadius:10,whiteSpace:'pre-wrap'}}>{out}</div><button onClick={print} style={{width:'100%',padding:14,marginTop:8,border:'2px solid #000',borderRadius:10,fontWeight:800}}>הורד PDF</button></>}
  </main>
 )
}
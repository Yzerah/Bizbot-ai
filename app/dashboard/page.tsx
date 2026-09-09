'use client'
import { useState } from 'react'

const PROFESSIONS = ["אינסטלטור","חשמלאי","שיפוצניק","טכנאי מזגנים","נגר","מעצב/בונה אתרים","עו״ד","רו״ח","מאמן/מטפל","אחר"]

export default function Dashboard(){
 const [form,setForm] = useState({ profession:'אינסטלטור', client:'', issue:'', price:'' })
 const [aiText,setAiText] = useState('')
 const [loading,setLoading] = useState(false)

 const generate = async () => {
   if(!form.client ||!form.issue) return alert('מלא שם לקוח ותיאור עבודה')
   setLoading(true)
   const res = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
   const data = await res.json()
   setAiText(data.result)
   setLoading(false)
 }

 const printPDF = () => {
   const win = window.open('','','width=900,height=800')
   win?.document.write(`
<div dir="rtl" style="font-family:system-ui;padding:50px;max-width:800px;margin:auto">
  <div style="display:flex;justify-content:space-between;border-bottom:4px solid #000;padding-bottom:16px"><div><h1 style="margin:0">הצעת מחיר - ${form.profession}</h1><p style="color:#666">BizBot-AI.co.il</p></div><div style="text-align:left"><b>${form.client}</b><br/>${new Date().toLocaleDateString('he-IL')}</div></div>
  <div style="margin-top:30px;white-space:pre-wrap;line-height:1.7">${aiText}</div>
  <div style="margin-top:30px;padding:16px;background:#111;color:#fff;border-radius:12px;text-align:center;font-size:20px;font-weight:900">סה"כ: ${form.price} ₪ כולל מע"מ</div>
  <div style="margin-top:20px;padding:12px;background:#f1f5f9;border-radius:8px;font-size:12px">מסמך זה הופק אוטומטית ב-BizBot-AI | כולל אחריות | תקף ל-7 ימים</div>
  <script>window.print()</script>
</div>`)
 }

 return(
  <main dir="rtl" style={{padding:24,maxWidth:650,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:28,fontWeight:900}}>BizBot AI - לכל בעלי המקצוע</h1>
   <p style={{color:'#666'}}>הלקוח ממלא, ה-AI מאחורה כותב הצעה שמוכרת</p>
   <div style={{marginTop:20,border:'2px solid #000',borderRadius:16,padding:20,display:'grid',gap:10}}>
     <select value={form.profession} onChange={e=>setForm({...form, profession:e.target.value})} style={{padding:12,border:'1px solid #000',borderRadius:8}}>
       {PROFESSIONS.map(p=><option key={p}>{p}</option>)}
     </select>
     <input placeholder="שם לקוח" value={form.client} onChange={e=>setForm({...form, client:e.target.value})} style={{padding:12,border:'1px solid #000',borderRadius:8}}/>
     <textarea placeholder="תאר מה צריך לעשות במילים שלך... למשל: פיצוץ בצנרת במטבח, צריך החלפת צינור ופתיחת סתימה" value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} style={{padding:12,border:'1px solid #000',borderRadius:8,minHeight:90}}/>
     <input placeholder="מחיר כולל" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} style={{padding:12,border:'1px solid #000',borderRadius:8}}/>
     <button onClick={generate} style={{padding:14,background:'#000',color:'#fff',borderRadius:10,fontWeight:800}}>{loading? 'ה-AI כותב הצעה...' : 'צור הצעה עם AI →'}</button>
     {aiText && <><div style={{background:'#f8fafc',padding:14,borderRadius:10,whiteSpace:'pre-wrap'}}>{aiText}</div><button onClick={printPDF} style={{padding:14,border:'2px solid #000',borderRadius:10,fontWeight:800}}>הורד PDF ושלח ללקוח</button></>}
   </div>
  </main>
 )
}
'use client'
import { useState } from 'react'

export default function Dashboard(){
 const [name,setName] = useState('יניב')
 const [amount,setAmount] = useState('13000')

 const createPDF = () => {
   const win = window.open('','','width=900,height=700')
   if(!win) return
   win.document.write(`
     <div dir="rtl" style="font-family:system-ui;padding:60px;max-width:750px;margin:auto;color:#111">
       <div style="display:flex;justify-content:space-between;border-bottom:3px solid #000;padding-bottom:20px">
         <div><h1 style="margin:0;font-size:34px;font-weight:900">הצעת מחיר</h1><p style="margin:4px 0 0;color:#666">BizBot-AI.co.il</p></div>
         <div style="text-align:left;line-height:1.6">לכבוד: <b>${name}</b><br/>תאריך: ${new Date().toLocaleDateString('he-IL')}<br/>מס' הצעה: #${Math.floor(Math.random()*9000)+1000}</div>
       </div>
       <table style="width:100%;margin-top:40px;border-collapse:collapse">
         <tr style="background:#111;color:#fff"><th style="padding:14px;text-align:right">תיאור שירות</th><th style="padding:14px">סכום</th></tr>
         <tr><td style="padding:14px;border-bottom:1px solid #eee">שירותי עסק עבור ${name}</td><td style="padding:14px;border-bottom:1px solid #eee">${amount} ₪</td></tr>
         <tr><td style="padding:14px;font-weight:900;font-size:18px">סה"כ לתשלום</td><td style="padding:14px;font-weight:900;font-size:18px">${amount} ₪</td></tr>
       </table>
       <div style="margin-top:60px;padding:16px;background:#f6f6f6;border-radius:12px;font-size:13px;color:#555">המסמך הופק אוטומטית ב-BizBot-AI | לתשלום בהעברה בנקאית | בתוקף ל-14 יום</div>
       <script>window.print()</script>
     </div>
   `)
 }

 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>ברוך הבא! בוא ניצור מסמך</h1>
   <div style={{marginTop:24,border:'2px solid #000',borderRadius:16,padding:20}}>
     <input value={name} onChange={e=>setName(e.target.value)} placeholder="שם לקוח" style={{width:'100%',padding:12,border:'1px solid #000',borderRadius:8}}/>
     <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="סכום" style={{width:'100%',padding:12,marginTop:10,border:'1px solid #000',borderRadius:8}}/>
     <button onClick={createPDF} style={{width:'100%',marginTop:12,padding:14,background:'#000',color:'#fff',borderRadius:10,fontWeight:700}}>צור הצעת מחיר PDF →</button>
   </div>
  </main>
 )
}
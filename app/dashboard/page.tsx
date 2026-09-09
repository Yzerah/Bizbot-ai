'use client'
import { useState } from 'react'

export default function Dashboard(){
 const [name,setName] = useState('יניב')
 const [amount,setAmount] = useState('13000')
 const [done,setDone] = useState(false)

 const createPDF = () => {
   if(!name || !amount) return alert('תמלא שם וסכום')
   setDone(true)
   // מדפיס הצעת מחיר - הלקוח רואה שזה עובד
   setTimeout(()=>{
     const win = window.open('','','width=800,height=600')
     if(!win) return
     win.document.write(`
       <div dir="rtl" style="font-family:system-ui;padding:40px">
         <h1>הצעת מחיר - BizBot-AI</h1>
         <p>לכבוד: ${name}</p>
         <p>סכום: ${amount} ₪</p>
         <p>תאריך: ${new Date().toLocaleDateString('he-IL')}</p>
         <hr/>
         <p>המסמך הופק אוטומטית ב-BizBot-AI.co.il</p>
         <script>window.print()</script>
       </div>
     `)
   }, 300)
 }

 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>ברוך הבא! בוא ניצור מסמך</h1>
   <p style={{color:'#666'}}>זה מה שהלקוח יראה אחרי תשלום</p>
   
   <div style={{marginTop:24,border:'2px solid #000',borderRadius:16,padding:20}}>
     <input value={name} onChange={e=>setName(e.target.value)} placeholder="שם לקוח" style={{width:'100%',padding:12,border:'1px solid #000',borderRadius:8}}/>
     <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="סכום" style={{width:'100%',padding:12,marginTop:10,border:'1px solid #000',borderRadius:8}}/>
     
     <button onClick={createPDF} style={{width:'100%',marginTop:12,padding:14,background:'#000',color:'#fff',borderRadius:10,fontWeight:700,cursor:'pointer'}}>
       צור הצעת מחיר PDF →
     </button>

     {done && <p style={{marginTop:12,color:'green',fontWeight:700,textAlign:'center'}}>✅ נוצר! חלון ההדפסה נפתח - שמור כ-PDF</p>}
   </div>

   <a href="/" style={{display:'block',marginTop:24,textAlign:'center',color:'#888'}}>← חזרה לדף הבית</a>
  </main>
 )
}
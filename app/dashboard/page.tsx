'use client'
import { useState } from 'react'
export default function Dashboard(){
 const [f,setF] = useState({pro:'', client:'', city:'', price:''})
 const [out,setOut] = useState('')
 const go = () => {
   if(!f.pro) return alert('תכתוב מקצוע - למשל מעצב גרפי')
   setOut(`הצעת מחיר - ${f.pro}\nלקוח: ${f.client}\nעיר: ${f.city}\n\nהבנתי שאתה צריך: עבודה בתחום ${f.pro}\n\nמה כולל:\n- ייעוץ ואפיון מקצועי כ-${f.pro}\n- ביצוע מלא עד לשביעות רצון מלאה\n- ליווי אישי ואחריות\n\nמחיר: ${f.price} ₪ כולל מע"מ`)
 }
 return(
  <main dir="rtl" style={{padding:20,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>מחולל הצעות לכל מקצוע</h1>
   <p style={{color:'#666'}}>תכתוב איזה מקצוע שאתה רוצה - לא רק אינסטלטור</p>
   <input placeholder="איזה מקצוע? מעצב גרפי / מאלף כלבים / כל דבר" value={f.pro} onChange={e=>setF({...f, pro:e.target.value})} style={{width:'100%',padding:12,marginTop:12,border:'2px solid #000',borderRadius:8}}/>
   <input placeholder="שם לקוח" value={f.client} onChange={e=>setF({...f, client:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <input placeholder="עיר" value={f.city} onChange={e=>setF({...f, city:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <input placeholder="מחיר" value={f.price} onChange={e=>setF({...f, price:e.target.value})} style={{width:'100%',padding:12,marginTop:8,border:'2px solid #000',borderRadius:8}}/>
   <button onClick={go} style={{width:'100%',padding:14,marginTop:12,background:'#000',color:'#fff',borderRadius:10,fontWeight:800}}>צור הצעה לכל מקצוע →</button>
   {out && <div style={{marginTop:16,background:'#f4f4f5',padding:14,borderRadius:10,whiteSpace:'pre-wrap'}}>{out}</div>}
  </main>
 )
}
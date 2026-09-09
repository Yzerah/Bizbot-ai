import Link from 'next/link'

export default function Page(){
 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto'}}>
   <h1 style={{fontSize:36,fontWeight:900}}>BizBot-AI.co.il</h1>
   <p>מכונת מסמכים אוטומטית - הצעות מחיר, חוזים, חשבוניות ב-30 שניות</p>
   <div style={{marginTop:24,border:'2px solid #000',borderRadius:16,padding:16}}>
     <b>PRO - 119₪/חודש</b>
     <Link href="/login" style={{marginTop:12,background:'#000',color:'#fff',padding:12,borderRadius:8,textAlign:'center',display:'block',textDecoration:'none'}}>התחל עכשיו →</Link>
   </div>
   <p style={{marginTop:20,fontSize:12,color:'#666'}}>bizbot-ai.co.il הדומיין שלך מוכן לחיבור</p>
  </main>
 )
}
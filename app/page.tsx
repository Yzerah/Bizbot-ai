import Link from 'next/link'

export default function Page(){
 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:36,fontWeight:900,lineHeight:1.1}}>BizBot-AI.co.il</h1>
   
   <p style={{marginTop:12,fontSize:18,color:'#222'}}>
    מכונת מסמכים אוטומטית - הצעות מחיר, חוזים, חשבוניות ב-30 שניות
   </p>

   <div style={{marginTop:32,border:'2px solid #000',borderRadius:16,padding:20}}>
     <b style={{fontSize:18}}>PRO - 119₪/חודש</b>
     
     <Link href="/login" style={{
       marginTop:16,
       background:'#000',
       color:'#fff',
       padding:'14px 16px',
       borderRadius:10,
       textAlign:'center',
       display:'block',
       textDecoration:'none',
       fontWeight:700,
       fontSize:16
     }}>
       התחל עכשיו →
     </Link>
   </div>

   <p style={{marginTop:32,fontSize:13,color:'#999',textAlign:'center'}}>
    © 2026 BizBot-AI
   </p>
  </main>
 )
}
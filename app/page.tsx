import Link from 'next/link'

export default function Page(){
 return(
  <main dir="rtl" className="min-h-screen bg-white text-black" style={{fontFamily:'system-ui'}}>
    <div style={{maxWidth:900, margin:'0 auto', padding:'60px 24px'}}>
      <h1 style={{fontSize:52, fontWeight:900, lineHeight:0.9}}>מסמכים עסקיים<br/>ב-30 שניות.</h1>
      <p style={{marginTop:20, fontSize:20, color:'#555', maxWidth:500}}>BizBot יוצר לך הצעות מחיר, חוזים וחשבוניות שנראות כמו משרד עו"ד - בלי וורד, בלי עיצוב, בלי כאב ראש.</p>
      
      <div style={{marginTop:40, display:'flex', gap:12}}>
        <Link href="/dashboard" style={{background:'#000', color:'#fff', padding:'16px 28px', borderRadius:100, fontWeight:700, textDecoration:'none'}}>התחל עכשיו - 119₪/חודש →</Link>
        <div style={{padding:'16px', color:'#666'}}>✓ ביטול בכל רגע</div>
      </div>

      <div style={{marginTop:60, border:'1px solid #eee', borderRadius:24, padding:24, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16}}>
        <div><b>הצעת מחיר</b><br/><span style={{color:'#666'}}>מעוצבת, עם לוגו וטבלה</span></div>
        <div><b>חוזה עבודה</b><br/><span style={{color:'#666'}}>מוכן לחתימה דיגיטלית</span></div>
        <div><b>חשבונית</b><br/><span style={{color:'#666'}}>עם מע"מ ופרטי עוסק</span></div>
      </div>
    </div>
  </main>
 )
}
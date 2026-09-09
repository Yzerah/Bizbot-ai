'use client'
export default function Dashboard(){
 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>✅ זה עובד! ברוך הבא לדשבורד</h1>
   <p style={{marginTop:8,color:'#666'}}>המייל נשמר בהצלחה, מכאן הלקוח מתחיל להשתמש</p>
   
   <div style={{marginTop:24,border:'2px solid #000',borderRadius:16,padding:16}}>
     <b>צור מסמך חדש</b>
     <input placeholder="שם לקוח" style={{width:'100%',padding:12,marginTop:12,border:'1px solid #ccc',borderRadius:8}}/>
     <input placeholder="סכום" style={{width:'100%',padding:12,marginTop:8,border:'1px solid #ccc',borderRadius:8}}/>
     <button style={{width:'100%',marginTop:12,padding:12,background:'#000',color:'#fff',borderRadius:8,fontWeight:700}}>צור הצעת מחיר PDF →</button>
   </div>

   <a href="/" style={{display:'block',marginTop:20,textAlign:'center',color:'#888'}}>← חזרה לדף הבית</a>
  </main>
 )
}
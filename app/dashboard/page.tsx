'use client'
export default function Dashboard(){
 return(
  <main dir="rtl" style={{padding:24,maxWidth:600,margin:'0 auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:26,fontWeight:900}}>ברוך הבא! בוא ניצור מסמך</h1>
   <p style={{color:'#666'}}>זה מה שהלקוח יראה אחרי תשלום</p>
   <div style={{marginTop:24,border:'1px solid #ddd',borderRadius:16,padding:16}}>
     <input placeholder="שם לקוח" style={{width:'100%',padding:12,border:'1px solid #ccc',borderRadius:8}}/>
     <input placeholder="סכום" style={{width:'100%',padding:12,marginTop:8,border:'1px solid #ccc',borderRadius:8}}/>
     <button style={{width:'100%',marginTop:12,padding:12,background:'#000',color:'#fff',borderRadius:8}}>צור הצעת מחיר PDF</button>
   </div>
  </main>
 )
}
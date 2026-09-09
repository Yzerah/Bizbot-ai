export default function LoginPage(){
 return(
  <main dir="rtl" style={{padding:24,maxWidth:400,margin:'50px auto'}}>
   <h1 style={{fontSize:28,fontWeight:900}}>התחברות ל-BizBot</h1>
   <p style={{marginTop:12,color:'#666'}}>כאן יהיה הלוגין / הרשמה</p>
   <input placeholder="אימייל" style={{width:'100%',padding:12,marginTop:16,border:'1px solid #000',borderRadius:8}} />
   <button style={{width:'100%',padding:12,marginTop:12,background:'#000',color:'#fff',borderRadius:8}}>כניסה</button>
   <a href="/" style={{display:'block',marginTop:20,textAlign:'center',color:'#666'}}>← חזרה לדף הבית</a>
  </main>
 )
}
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
 const [email,setEmail] = useState('')
 const router = useRouter()
 
 return(
  <main dir="rtl" style={{padding:24,maxWidth:400,margin:'60px auto',fontFamily:'system-ui'}}>
   <h1 style={{fontSize:28,fontWeight:900}}>התחברות ל-BizBot</h1>
   <p style={{marginTop:8,color:'#666'}}>הכנס אימייל ונפתח לך את מכונת המסמכים</p>
   
   <input 
     value={email} 
     onChange={e=>setEmail(e.target.value)}
     placeholder="אימייל" 
     style={{width:'100%',padding:14,marginTop:24,border:'1px solid #000',borderRadius:10}} 
   />
   
   <button 
     onClick={()=>{
       if(!email) return alert('תכניס אימייל')
       localStorage.setItem('bizbot_email', email)
       router.push('/dashboard')
     }}
     style={{width:'100%',padding:14,marginTop:12,background:'#000',color:'#fff',borderRadius:10,fontWeight:700}}>
     כניסה
   </button>
   
   <a href="/" style={{display:'block',marginTop:20,textAlign:'center',color:'#888'}}>← חזרה לדף הבית</a>
  </main>
 )
}
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Meteors } from "@/components/ui/meteors";

function LoginPage() {

  const router = useRouter();

  const [user,setUser] = useState({
    email:"",
    password:"",
    
  })

  const [buttonDisabled,setButtonDisabled] = useState(true);

  const [loading,setLoading] = useState(false);

  const onLogin = async () => {
     try{
         setLoading(true);
         const response = await axios.post("/api/users/login",user);
         console.log("Login success",response.data);
         toast.success("Login success");
         router.push("/profile");
         setLoading(false);
     }
     catch(error:any){
      console.log("Login failed",error.message);
      toast.error(error.message);
     }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0){
         setButtonDisabled(false);
      }  
      else{
          setButtonDisabled(true);
      }
  },[user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "LOGIN"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input 
        type='email'
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user,email:e.target.value})}
        placeholder="email"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />
      <label htmlFor="password">Password</label>
      <input 
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user,password:e.target.value})}
        placeholder="password"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />
      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisabled ? "No login" : "Login"}</button>
      <Link href="/forgotpassword">Forgot Password</Link>
      <Link href="/signup">Visit Signup page</Link>

      <Meteors number={50} />
    </div>
  )
}

export default LoginPage


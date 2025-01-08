"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Link from 'next/link';
import { Meteors } from "@/components/ui/meteors";

function ForgotPasswordPage() {
  
  

  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Forgot password success", response.data);

      // Set the success message here
      setSuccessMessage("A password reset link has been sent to your email.");
      toast.success("Forgot password success");
      
      setLoading(false);
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type='email'
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />

      <button
        onClick={onForgotPassword}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisabled ? "" : "Submit"}</button>

      {/* Display success message */}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}

      <Link href="/login">Visit login page</Link>
      <Meteors number={50} />
    </div>
  )
}

export default ForgotPasswordPage

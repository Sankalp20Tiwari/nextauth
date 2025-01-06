"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import { Meteors } from "@/components/ui/meteors";
function ProfilePage() {
  const router = useRouter();

  const [data,setData] = useState("nothing");

  const getUserData = async () =>{
    try {
        const res = await axios .get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id)
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-gray-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-gray-500 mt-4 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserData}
        className="bg-gray-800 mt-4 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded"
        >GetUser Details</button>

        <Meteors number={50} />
        </div>
  )
}

export default ProfilePage

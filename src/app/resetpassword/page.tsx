"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";

function ResetPasswordPage() {
  const [user, setUser] = useState({
    password: "",
    token: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; // Extract the token
    const decodedToken = decodeURIComponent(urlToken); // Decode the token
    setUser((prev) => ({ ...prev, token: decodedToken || "" })); // Set the token
  }, []);

  useEffect(() => {
    if (user.password.length > 0 && confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  const onResetPassword = async () => {
    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      console.log("Reset password success", response.data);
      setSuccessMessage("Your password has been reset successfully");
      toast.success("Reset password success");
      setLoading(false);
    } catch (error) {
      console.log("Reset password failed", error);
      toast.error("Password reset failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Reset your password"}</h1>
      <hr />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter new password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <label htmlFor="password"> Confirm Password</label>
      <input
        type="password"
        id="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder=" Confirm new password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <button
        onClick={onResetPassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Submit" : "Reset Password"}
      </button>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      <Link href="/login">Visit login page</Link>
      <Meteors number={50} />
    </div>
  );
}

export default ResetPasswordPage;

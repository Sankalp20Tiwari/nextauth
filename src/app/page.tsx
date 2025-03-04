'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LandingPage() {

  const paragraph = " Seamless authentication for modern web applications"
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Image src="https://next-auth.js.org/img/logo/logo-sm.png" alt="NextAuth Logo" width={150} height={150} className="mx-auto" />
        <h1 className="text-5xl font-bold text-white mt-4">Secure Authentication</h1>
        <p className="mt-4 text-lg text-gray-400">{paragraph.split("").map((char, index) => 
          <motion.span                   initial={{
            opacity: 0,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.05 * index,
            ease: "easeInOut"
          }}
          key={char + index}>
            {char}
          </motion.span>)}
        </p>
      </motion.div>
      
      {/* Buttons */}
      <div className="mt-8 flex gap-6">
        <Link href="/login" passHref>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Login
          </motion.button>
        </Link>
        <Link href="/signup" passHref>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
      
      {/* Features */}
      <motion.div 
       initial={{
        opacity: 0,
        y: 50,
       }}
       animate={{
        opacity: 1,
        y: 0,
       }}
       transition={{
        duration: 1,
        delay: 0.2,
        ease: "easeInOut",
       }}
      className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl">
        <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">📧 Email Verification</h2>
          <p className="mt-2 text-gray-400">Verify user emails to enhance security and trust.</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">🔑 Forgot Password</h2>
          <p className="mt-2 text-gray-400">Allow users to recover their accounts securely.</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">🔄 Reset Password</h2>
          <p className="mt-2 text-gray-400">Enable users to reset passwords with secure links.</p>
        </motion.div>
      </motion.div>
      
      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} NextAuth App Powered by NextAuth.</p>
      </footer>
    </div>
  );
}




// src/app/login/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <Image src="/assets/logo.svg" alt="Logo" width={32} height={25} />

      <div className="bg-blue p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-white text-text1 mb-8">Login</h1>
        <form className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent border-b border-lightBlue/50 text-white p-2 focus:outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-b border-lightBlue/50 text-white p-2 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="bg-red text-white p-4 rounded-md mt-4 hover:bg-white hover:text-black transition-colors"
          >
            Sign In to your account
          </button>
        </form>
        <p className="text-center mt-6 text-white">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-red">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

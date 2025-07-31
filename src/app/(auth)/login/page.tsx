"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your email and password.");
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        login(token);
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <Image src="/assets/logo.svg" alt="Logo" width={32} height={25} />

      <div className="bg-blue p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-white text-text1 mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border-b border-lightBlue/50 text-white p-2 focus:outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent border-b border-lightBlue/50 text-white p-2 focus:outline-none focus:border-white"
          />
          {error && <p className="text-red mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-red text-white p-4 rounded-md mt-4 hover:bg-white hover:text-black transition-colors"
          >
            Login to your account
          </button>
        </form>
        <p className="text-center mt-6 text-white">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-red">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

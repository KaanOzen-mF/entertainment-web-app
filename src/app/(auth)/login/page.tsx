// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

/**
 * The login page component. It provides a form for users to enter their credentials
 * and handles the authentication process by communicating with the backend API.
 */
const LoginPage = () => {
  // 1. State management for the form fields and error messages.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 2. Get the 'login' function from our global AuthContext.
  const { login } = useAuth();

  /**
   * Handles the form submission event.
   * @param e The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission which reloads the page.
    setError(""); // Clear any previous error messages on a new submission attempt.

    try {
      // 3. Send a POST request to the backend's login endpoint.
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // If the response is not successful (e.g., 403 Forbidden for wrong credentials), throw an error.
      if (!response.ok) {
        throw new Error("Login failed. Please check your email and password.");
      }

      // 4. If the response is successful, parse the JSON to get the token.
      const data = await response.json();
      const token = data.token;

      if (token) {
        // 5. Call the 'login' function from our AuthContext.
        //    This will store the token, update the global state, and handle redirection.
        login(token);
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err: unknown) {
      // 6. Catch any errors (from the fetch call or thrown manually) and display them.
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error(err);
    }
  };

  // 7. Render the login form UI.
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
          {/* Display the error message if one exists. */}
          {error && <p className="text-red mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-red text-white p-4 rounded-md mt-4 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            Login to your account
          </button>
        </form>
        <p className="text-center mt-6 text-white">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-red">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

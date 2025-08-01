// src/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/**
 * The sign-up page component. It provides a form for new users to register
 * and handles the registration process by communicating with the backend API.
 */
const SignUpPage = () => {
  // 1. State management for the form fields and error messages.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  // 2. Get the Next.js router instance to handle redirection after successful registration.
  const router = useRouter();

  /**
   * Handles the form submission event.
   * @param e The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission which reloads the page.
    setError(""); // Clear any previous error messages.

    // 3. Basic client-side validation to check if passwords match.
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return; // Stop the function if passwords don't match.
    }

    try {
      // 4. Send a POST request to the backend's register endpoint.
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // If the response is not successful (e.g., 409 Conflict for existing email),
      // parse the error message from the backend and throw an error.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // 5. If registration is successful, redirect the user to the login page.
      router.push("/login");
    } catch (err: unknown) {
      // 6. Catch any errors and display them to the user.
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error(err);
    }
  };

  // 7. Render the sign-up form UI.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <Image src="/assets/logo.svg" alt="Logo" width={32} height={25} />
      <div className="bg-blue p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-white text-text1 mb-8">Sign Up</h1>

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
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="bg-transparent border-b border-lightBlue/50 text-white p-2 focus:outline-none focus:border-white"
          />

          {/* Display the error message if one exists. */}
          {error && <p className="text-red mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-red text-white p-4 rounded-md mt-4 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            Create an account
          </button>
        </form>
        <p className="text-center mt-6 text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-red">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

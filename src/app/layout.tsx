// src/app/layout.tsx

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Load the 'Outfit' font from Google Fonts with specified weights.
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500"] });

/**
 * Defines the metadata for the application, which is used for SEO and
 * browser tab information (like title and description).
 */
export const metadata: Metadata = {
  title: "Entertainment Web App",
  description: "A full-stack entertainment web application.",
};

/**
 * This is the Root Layout for the entire application.
 * Every page in the app will be wrapped by this component.
 * It sets up the global font, background color, and the top-level context provider.
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered inside this layout (the actual pages).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The 'suppressHydrationWarning' prop is added to the <html> tag to prevent a common
    // warning that can occur when browser extensions modify the initial HTML.
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${outfit.className} bg-darkBlue text-white`}>
        {/* The AuthProvider wraps the entire application, making authentication state
            (like whether the user is logged in) available to every single component. */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

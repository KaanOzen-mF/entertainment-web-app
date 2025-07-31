import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata: Metadata = {
  title: "Entertainment Web App",
  description: "A full-stack entertainment web application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${outfit.className} bg-darkBlue text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

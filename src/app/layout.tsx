// app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <html lang="en">
      <body className={`${outfit.className} bg-darkBlue text-white`}>
        <div className="md:flex md:h-screen">
          <header>
            <Navbar />
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

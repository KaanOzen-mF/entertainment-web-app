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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} flex min-h-screen items-center justify-center bg-darkBlue text-white`}
      >
        <div className="h-[90vh] w-full">
          <div className="flex h-full flex-col md:flex-row">
            <Navbar />
            <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

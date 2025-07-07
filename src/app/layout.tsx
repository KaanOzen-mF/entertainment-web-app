import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entertainment Web App",
  description: "Frontend for the Entertainment Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-[#10141E] text-white`}>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Navbar />

          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

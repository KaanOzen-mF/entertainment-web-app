// src/app/(main)/layout.tsx (ANA UYGULAMANIN LAYOUT'U)

import Navbar from "@/components/Navbar";
import { BookmarkProvider } from "@/context/BookmarkContext";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. BookmarkProvider, sadece ana uygulama sayfalarını saracak.
    <BookmarkProvider>
      {/* 2. Tüm layout ve kaydırma sorunlarını çözen en son doğru yapı. */}
      <div className="md:flex md:h-screen bg-darkBlue text-white overflow-auto md:overflow-hidden">
        <header>
          <Navbar />
        </header>

        <main className="flex-1 md:overflow-y-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </BookmarkProvider>
  );
}

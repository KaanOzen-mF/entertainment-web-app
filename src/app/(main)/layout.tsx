import Navbar from "@/components/Navbar";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { TrailerProvider } from "@/context/TrailerContext";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookmarkProvider>
      <TrailerProvider>
        <div className="md:flex md:h-screen bg-darkBlue text-white overflow-auto md:overflow-hidden">
          <header>
            <Navbar />
          </header>

          <main className="flex-1 md:overflow-y-auto">
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </div>
      </TrailerProvider>
    </BookmarkProvider>
  );
}

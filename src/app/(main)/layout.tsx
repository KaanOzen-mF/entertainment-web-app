// src/app/(main)/layout.tsx

import Navbar from "@/components/Navbar";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { TrailerProvider } from "@/context/TrailerContext";

/**
 * This is the layout component specifically for the main part of the application
 * (i.e., all pages inside the '(main)' route group). It does NOT apply to
 * authentication pages like login or signup.
 *
 * It wraps the main pages with necessary context providers and sets up the
 * primary visual structure (sidebar + main content area).
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The actual page component to be rendered (e.g., Home, Movies).
 */
export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Context Providers: Wrap the application with providers that need to be
    //    available only to logged-in users or within the main app interface.
    //    - BookmarkProvider: Manages the global state for bookmarked items.
    //    - TrailerProvider: Manages the global state for the trailer modal.
    <BookmarkProvider>
      <TrailerProvider>
        {/* 2. Main Layout Container */}
        {/* - On mobile (default): Behaves like a normal block, so header and main are stacked vertically.
            - On medium screens and up ('md:'): Becomes a flex container ('md:flex') to place the
              sidebar and main content side-by-side. It also takes up the full screen height ('md:h-screen').
        */}
        <div className="md:flex md:h-screen bg-darkBlue text-white overflow-auto md:overflow-hidden">
          {/* Sidebar Area */}
          <header>
            <Navbar />
          </header>

          {/* Main Content Area */}
          {/* - 'flex-1': Takes up all available remaining space next to the sidebar.
              - 'md:overflow-y-auto': On desktop, if the content is too long, only this
                main area will scroll, keeping the sidebar fixed.
          */}
          <main className="flex-1 md:overflow-y-auto">
            {/* Inner padding for the content of all pages. */}
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </div>
      </TrailerProvider>
    </BookmarkProvider>
  );
}

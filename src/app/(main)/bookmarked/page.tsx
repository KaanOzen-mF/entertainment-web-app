// src/app/(main)/bookmarked/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import BookmarkedContext from "@/components/BookmarkedContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

const BookmarkedPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      {isAuthenticated ? (
        <BookmarkedContext />
      ) : (
        <div>
          <h2 className="text-xl font-light text-white mb-4">
            Bookmarked Shows
          </h2>
          <div className="bg-blue p-8 rounded-lg text-center">
            <p className="text-white/75">
              To see your bookmarked shows, please{" "}
              <Link
                href="/login"
                className="text-red underline hover:text-white transition-colors"
              >
                log in
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookmarkedPage;

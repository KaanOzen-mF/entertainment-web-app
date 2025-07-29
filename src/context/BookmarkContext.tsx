// src/context/BookmarkContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { addBookmark, deleteBookmark, fetchBookmarks } from "@/lib/api";
import { MediaContent } from "../../types";

interface BookmarkContextType {
  bookmarkedTmdbIds: number[];
  toggleBookmark: (item: MediaContent) => Promise<void>;
  isLoading: boolean;
  logout: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedTmdbIds, setBookmarkedTmdbIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getBookmarks = async () => {
    if (!localStorage.getItem("authToken")) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const bookmarkIds = await fetchBookmarks();
      console.log(
        "[BookmarkContext] Fetched bookmark IDs from backend:",
        bookmarkIds
      );
      setBookmarkedTmdbIds(bookmarkIds);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      setBookmarkedTmdbIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  const toggleBookmark = async (itemToToggle: MediaContent) => {
    const isCurrentlyBookmarked = bookmarkedTmdbIds.includes(itemToToggle.id);
    const originalBookmarks = [...bookmarkedTmdbIds];

    try {
      if (isCurrentlyBookmarked) {
        setBookmarkedTmdbIds((prev) =>
          prev.filter((id) => id !== itemToToggle.id)
        );
        await deleteBookmark(itemToToggle.id);
      } else {
        setBookmarkedTmdbIds((prev) => [...prev, itemToToggle.id]);
        await addBookmark(itemToToggle.id);
      }

      const updatedBookmarks = await fetchBookmarks();
      setBookmarkedTmdbIds(updatedBookmarks);
    } catch (error) {
      console.error("Failed to toggle bookmark, reverting UI.", error);
      setBookmarkedTmdbIds(originalBookmarks);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setBookmarkedTmdbIds([]);
    router.push("/login");
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedTmdbIds, toggleBookmark, isLoading, logout }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

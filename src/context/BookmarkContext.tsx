// src/context/BookmarkContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { addBookmark, deleteBookmark, fetchBookmarks } from "@/lib/api";
import { MediaContent } from "../../types";

interface BookmarkContextType {
  bookmarkedTmdbIds: number[]; // Artık sadece TMDB ID'lerini (sayı) tutuyoruz.
  toggleBookmark: (item: MediaContent) => Promise<void>;
  isLoading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedTmdbIds, setBookmarkedTmdbIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBookmarks = async () => {
      // Token yoksa istek atma, bu logic'i burada yönetmek daha doğru.
      if (!localStorage.getItem("authToken")) {
        setIsLoading(false);
        return;
      }
      try {
        const bookmarkIds = await fetchBookmarks();
        setBookmarkedTmdbIds(bookmarkIds);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
        setBookmarkedTmdbIds([]);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarks();
  }, []);

  const toggleBookmark = async (itemToToggle: MediaContent) => {
    const isCurrentlyBookmarked = bookmarkedTmdbIds.includes(itemToToggle.id);

    try {
      if (isCurrentlyBookmarked) {
        await deleteBookmark(itemToToggle.id);
        setBookmarkedTmdbIds((prev) =>
          prev.filter((id) => id !== itemToToggle.id)
        );
      } else {
        await addBookmark(itemToToggle.id);
        setBookmarkedTmdbIds((prev) => [...prev, itemToToggle.id]);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedTmdbIds, toggleBookmark, isLoading }}
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

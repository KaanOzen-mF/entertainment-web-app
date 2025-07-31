// src/context/BookmarkContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { addBookmark, deleteBookmark, fetchBookmarks } from "@/lib/api";
import { MediaContent } from "../../types";
import { useAuth } from "./AuthContext";

interface BookmarkContextType {
  bookmarkedTmdbIds: number[];
  toggleBookmark: (item: MediaContent) => Promise<void>;
  isLoading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedTmdbIds, setBookmarkedTmdbIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const getBookmarks = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setBookmarkedTmdbIds([]);
      return;
    }
    setIsLoading(true);
    try {
      const bookmarkIds = await fetchBookmarks();
      setBookmarkedTmdbIds(bookmarkIds);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      setBookmarkedTmdbIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // useCallback'in bağımlılığı

  useEffect(() => {
    getBookmarks();
  }, [isAuthenticated, getBookmarks]);

  const toggleBookmark = async (itemToToggle: MediaContent) => {
    if (!isAuthenticated) {
      return;
    }

    const isCurrentlyBookmarked = bookmarkedTmdbIds.includes(itemToToggle.id);
    try {
      if (isCurrentlyBookmarked) {
        await deleteBookmark(itemToToggle.id);
      } else {
        await addBookmark(itemToToggle.id);
      }
      await getBookmarks();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      await getBookmarks();
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

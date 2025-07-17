// src/context/BookmarkContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface BookmarkContextType {
  bookmarkedTitles: string[];
  toggleBookmark: (title: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

type BookmarkProviderProps = {
  children: ReactNode;
};

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [bookmarkedTitles, setBookmarkedTitles] = useState<string[]>([]);

  const toggleBookmark = (title: string) => {
    setBookmarkedTitles((prevBookmarks) => {
      if (prevBookmarks.includes(title)) {
        return prevBookmarks.filter((b) => b !== title);
      } else {
        return [...prevBookmarks, title];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedTitles, toggleBookmark }}>
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

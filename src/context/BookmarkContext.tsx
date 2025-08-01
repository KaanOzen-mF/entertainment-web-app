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

/**
 * Defines the shape of the data that will be available through the BookmarkContext.
 */
interface BookmarkContextType {
  bookmarkedTmdbIds: number[]; // An array of TMDB IDs for the user's bookmarked items.
  toggleBookmark: (item: MediaContent) => Promise<void>; // Function to add or remove a bookmark.
  isLoading: boolean; // Is the bookmark list currently being fetched from the backend?
}

// Create the context with an initial undefined value.
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

/**
 * The BookmarkProvider component is a wrapper that provides bookmark state
 * and functions to all child components. It syncs the bookmark state with the backend.
 */
export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the list of bookmarked TMDB IDs.
  const [bookmarkedTmdbIds, setBookmarkedTmdbIds] = useState<number[]>([]);
  // State to track the loading status of bookmark data.
  const [isLoading, setIsLoading] = useState(true);
  // Get the user's authentication status from the AuthContext.
  const { isAuthenticated } = useAuth();

  /**
   * Fetches the user's bookmarks from the backend API.
   * This function is wrapped in useCallback to prevent it from being recreated on every render,
   * which optimizes performance and satisfies the exhaustive-deps ESLint rule for useEffect.
   */
  const getBookmarks = useCallback(async () => {
    // If the user is not authenticated, there's no need to fetch bookmarks.
    if (!isAuthenticated) {
      setIsLoading(false);
      setBookmarkedTmdbIds([]); // Ensure the list is empty for logged-out users.
      return;
    }
    setIsLoading(true);
    try {
      const bookmarkIds = await fetchBookmarks();
      setBookmarkedTmdbIds(bookmarkIds);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      setBookmarkedTmdbIds([]); // Clear bookmarks on error.
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // This function will only be recreated if 'isAuthenticated' changes.

  // This effect runs whenever the user's authentication status changes.
  // It fetches the bookmarks when a user logs in and clears them when they log out.
  useEffect(() => {
    getBookmarks();
  }, [isAuthenticated, getBookmarks]);

  /**
   * Adds or removes a media item from the user's bookmarks.
   * @param itemToToggle The full MediaContent object of the item to be bookmarked/unbookmarked.
   */
  const toggleBookmark = async (itemToToggle: MediaContent) => {
    // Prevent bookmarking if the user is not logged in.
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
      // After the backend operation is complete, refetch the list to ensure UI is in sync.
      await getBookmarks();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // If an error occurs, refetch to revert to the last known correct state from the backend.
      await getBookmarks();
    }
  };

  // Provide the state and functions to all children of this provider.
  return (
    <BookmarkContext.Provider
      value={{ bookmarkedTmdbIds, toggleBookmark, isLoading }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

/**
 * A custom hook for easily accessing the BookmarkContext from any component.
 */
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

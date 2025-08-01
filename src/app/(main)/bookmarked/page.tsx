// src/app/(main)/bookmarked/page.tsx
"use client";

import { useEffect, useState } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";
import { fetchMediaDetails } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * The page component for displaying the user's bookmarked shows.
 * It fetches the full details for each bookmarked item from the TMDB API.
 */
const BookmarkedPage = () => {
  // 1. Get the list of bookmarked TMDB IDs and the context's loading status.
  const { bookmarkedTmdbIds, isLoading: areBookmarksLoading } = useBookmarks();

  // 2. State to store the full MediaContent objects after fetching their details.
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaContent[]>([]);
  // 3. State to manage the local loading status for fetching details from TMDB.
  const [isLoading, setIsLoading] = useState(true);

  // This effect is responsible for fetching the full details of bookmarked items.
  // It runs whenever the list of bookmarked IDs from the context changes.
  useEffect(() => {
    const fetchBookmarkedDetails = async () => {
      // If the main BookmarkContext is still loading the initial list of IDs, wait.
      if (areBookmarksLoading) return;

      // If the user has no bookmarks, there's nothing to fetch.
      if (bookmarkedTmdbIds.length === 0) {
        setBookmarkedItems([]);
        setIsLoading(false);
        return;
      }

      try {
        // 4. Create an array of promises. Each promise will fetch the details for one bookmarked ID.
        const promises = bookmarkedTmdbIds.map(async (id) => {
          // Since the backend only stores the ID, we don't know if it's a movie or a TV show.
          // First, try to fetch it as a movie.
          let details = await fetchMediaDetails("movie", id);
          if (details) {
            // If successful, enrich the data with the correct media_type and return it.
            return { ...details, media_type: "movie" as const };
          }
          // If fetching as a movie fails, try fetching it as a TV show.
          details = await fetchMediaDetails("tv", id);
          if (details) {
            // If successful, enrich the data with the correct media_type and return it.
            return { ...details, media_type: "tv" as const };
          }
          // If both attempts fail (e.g., the item was removed from TMDB), log a warning and return null.
          console.warn(`Could not fetch details for ID: ${id}`);
          return null;
        });

        // 5. Wait for all the detail-fetching promises to complete.
        const results = await Promise.all(promises);

        // 6. Filter out any null results (from failed fetches) to get a clean list of valid items.
        const validItems = results.filter(
          (item): item is MediaContent => item !== null
        );
        setBookmarkedItems(validItems);
      } catch (error) {
        console.error(
          "An unexpected error occurred while fetching bookmarked details:",
          error
        );
        setBookmarkedItems([]); // Clear items on an unexpected error.
      } finally {
        setIsLoading(false); // Mark loading as complete.
      }
    };

    fetchBookmarkedDetails();
  }, [bookmarkedTmdbIds, areBookmarksLoading]);

  // 7. Display a loading spinner if either the context or the local detail fetching is in progress.
  if (isLoading || areBookmarksLoading) {
    return <LoadingSpinner />;
  }

  // 8. Once loading is complete, render the MediaGrid with the fetched bookmarked items.
  return (
    <MediaGrid
      initialData={bookmarkedItems}
      pageTitle="Bookmarked Shows"
      searchPlaceholder="Search in your bookmarked shows"
    />
  );
};

export default BookmarkedPage;

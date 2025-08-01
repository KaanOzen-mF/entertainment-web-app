"use client";

import { useEffect, useState } from "react";
import { MediaContent } from "../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";
import { fetchMediaDetails } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * This component is responsible for fetching and displaying the full details
 * of all media items that the user has bookmarked.
 */
const BookmarkedContent = () => {
  // 1. Get the list of bookmarked TMDB IDs and the loading status from the global BookmarkContext.
  const { bookmarkedTmdbIds, isLoading: areBookmarksLoading } = useBookmarks();

  // 2. State to store the full MediaContent objects of the bookmarked items after fetching their details.
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaContent[]>([]);
  // 3. State to manage the loading status for fetching the details from TMDB.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs whenever the list of bookmarked IDs changes.

    // If the main context is still loading the initial list of IDs, wait.
    if (areBookmarksLoading) {
      return;
    }

    const fetchBookmarkedDetails = async () => {
      // If the user has no bookmarks, set the items to an empty array and stop loading.
      if (bookmarkedTmdbIds.length === 0) {
        setBookmarkedItems([]);
        setIsLoading(false);
        return;
      }

      try {
        // 4. Create an array of promises. Each promise will fetch the details for one bookmarked ID.
        const promises = bookmarkedTmdbIds.map((id) =>
          // We don't know if the ID is a movie or a TV show, so we try fetching as a movie first.
          fetchMediaDetails("movie", id)
            // If it fails (e.g., returns 404), we try fetching it as a TV show.
            .catch(() => fetchMediaDetails("tv", id))
            // If both attempts fail, we return null to prevent crashing Promise.all.
            .catch(() => {
              return null;
            })
        );

        // 5. Wait for all the detail-fetching promises to complete.
        const results = await Promise.all(promises);

        // 6. Filter out any null results (from failed fetches) to get a clean list of valid items.
        const validItems = results.filter(
          (item): item is MediaContent => item !== null
        );
        setBookmarkedItems(validItems);
      } catch (error) {
        console.error(error);
        setBookmarkedItems([]); // Clear items on an unexpected error.
      } finally {
        setIsLoading(false); // Mark loading as complete.
      }
    };

    fetchBookmarkedDetails();
  }, [bookmarkedTmdbIds, areBookmarksLoading]); // Re-run this effect if the bookmark list changes.

  // 7. Display a loading spinner while fetching data.
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

export default BookmarkedContent;

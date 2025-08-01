// src/app/(main)/bookmarked/page.tsx
"use client";

import { useEffect, useState } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";
import { fetchMediaDetails } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const BookmarkedPage = () => {
  const { bookmarkedTmdbIds, isLoading: areBookmarksLoading } = useBookmarks();
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedDetails = async () => {
      if (areBookmarksLoading) return;
      if (bookmarkedTmdbIds.length === 0) {
        setBookmarkedItems([]);
        setIsLoading(false);
        return;
      }

      try {
        const promises = bookmarkedTmdbIds.map(async (id) => {
          let details = await fetchMediaDetails("movie", id);
          if (details) {
            return { ...details, media_type: "movie" as const };
          }
          details = await fetchMediaDetails("tv", id);
          if (details) {
            return { ...details, media_type: "tv" as const };
          }
          console.warn(`Could not fetch details for ID: ${id}`);
          return null;
        });

        const results = await Promise.all(promises);
        const validItems = results.filter(
          (item): item is MediaContent => item !== null
        );
        setBookmarkedItems(validItems);
      } catch (error) {
        console.error(
          "An unexpected error occurred while fetching bookmarked details:",
          error
        );
        setBookmarkedItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedDetails();
  }, [bookmarkedTmdbIds, areBookmarksLoading]);

  if (isLoading || areBookmarksLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MediaGrid
      initialData={bookmarkedItems}
      pageTitle="Bookmarked Shows"
      searchPlaceholder="Search in your bookmarked shows"
    />
  );
};

export default BookmarkedPage;

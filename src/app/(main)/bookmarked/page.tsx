// src/app/(main)/bookmarked/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";
import { useAuth } from "@/context/AuthContext";
import { fetchMediaDetails } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * The page component for displaying the user's bookmarked shows.
 * It conditionally renders the content based on the user's authentication status.
 */
const BookmarkedPage = () => {
  // 1. Get state from both Auth and Bookmark contexts.
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { bookmarkedTmdbIds, isLoading: areBookmarksLoading } = useBookmarks();

  // 2. Local state for this page to store the full details of bookmarked items.
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaContent[]>([]);
  // 3. Local state to manage the loading status of fetching details from TMDB.
  const [isLoading, setIsLoading] = useState(true);

  // This effect fetches the full details for each bookmarked item ID.
  // It runs when the authentication or bookmark ID list changes.
  useEffect(() => {
    // Only proceed if the user is authenticated.
    if (!isAuthLoading && isAuthenticated) {
      const fetchBookmarkedDetails = async () => {
        // If the main context is still loading the IDs, wait.
        if (areBookmarksLoading) return;
        // If there are no bookmarked IDs, there's nothing to fetch.
        if (bookmarkedTmdbIds.length === 0) {
          setBookmarkedItems([]);
          setIsLoading(false);
          return;
        }

        try {
          // 4. Create an array of promises to fetch details for each ID concurrently.
          const promises = bookmarkedTmdbIds.map(async (id) => {
            // Since we only store the ID, we don't know if it's a movie or TV show.
            // First, try to fetch it as a movie.
            let details = await fetchMediaDetails("movie", id);
            if (details) {
              // If successful, enrich the data with the correct media_type.
              return { ...details, media_type: "movie" as const };
            }
            // If it fails, try fetching it as a TV show.
            details = await fetchMediaDetails("tv", id);
            if (details) {
              return { ...details, media_type: "tv" as const };
            }
            // If both fail, log a warning and return null to prevent crashing.
            console.warn(`Could not fetch details for ID: ${id}`);
            return null;
          });

          // 5. Wait for all fetch requests to complete.
          const results = await Promise.all(promises);
          // 6. Filter out any null results from failed fetches.
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
    } else if (!isAuthLoading && !isAuthenticated) {
      // If the user is not logged in, stop the loading process.
      setIsLoading(false);
    }
  }, [bookmarkedTmdbIds, areBookmarksLoading, isAuthenticated, isAuthLoading]);

  // 7. Show a loading spinner if any of the necessary data is still loading.
  if (isLoading || isAuthLoading) {
    return <LoadingSpinner />;
  }

  // 8. Conditional Rendering: Show content based on authentication status.
  return (
    <section>
      {isAuthenticated ? (
        // If the user is logged in, display the grid of bookmarked items.
        <MediaGrid
          initialData={bookmarkedItems}
          pageTitle="Bookmarked Shows"
          searchPlaceholder="Search in your bookmarked shows"
        />
      ) : (
        // If the user is not logged in, display a prompt to log in.
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

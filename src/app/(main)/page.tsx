// src/app/(main)/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../types";
import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import ShowCard from "@/components/ShowCard";
import { fetchTrendingAllWeek, fetchDiscoverMovies } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

/**
 * The main Home page component.
 * It fetches and displays trending and recommended content, handles search functionality,
 * and shows different content based on the user's authentication status.
 */
export default function Home() {
  // 1. Get the user's authentication status from the global AuthContext.
  const { isAuthenticated } = useAuth();

  // 2. State management for the page.
  const [trendingData, setTrendingData] = useState<MediaContent[]>([]);
  const [recommendedData, setRecommendedData] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounced search term for performance.

  // 3. This effect fetches the initial data for the page when it first mounts.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.all to fetch both trending and recommended data concurrently for better performance.
        const [trending, recommended] = await Promise.all([
          fetchTrendingAllWeek(),
          fetchDiscoverMovies(),
        ]);

        // Enrich the recommended data with 'media_type' because the '/discover/movie' endpoint doesn't provide it.
        // This is crucial for the 'playTrailer' function to work correctly.
        const enrichedRecommended = recommended.map(
          (item: MediaContent): MediaContent => ({
            ...item,
            media_type: "movie" as const,
          })
        );

        setTrendingData(trending);
        setRecommendedData(enrichedRecommended);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // The empty dependency array ensures this runs only once on mount.

  /**
   * Updates the search term state as the user types.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 4. Search logic.
  const isSearching = debouncedSearchTerm.length > 0;
  // Combine both lists to create a comprehensive list to search through.
  const allDataForSearch = [...trendingData, ...recommendedData];

  const searchResults = isSearching
    ? allDataForSearch.filter((item) =>
        // Safely check both 'title' (for movies) and 'name' (for TV shows).
        (item.title || item.name || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  // 5. Display a loading spinner while the initial data is being fetched.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 6. Render the main page content.
  return (
    <main>
      <SearchInput
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {isSearching ? (
        // If the user is searching, display the search results.
        <section>
          <h1 className="text-xl font-light text-white my-6">
            Found {searchResults.length} results for &apos;{debouncedSearchTerm}
            &apos;
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {searchResults.map(
              (item) => item && <ShowCard key={item.id} item={item} />
            )}
          </div>
        </section>
      ) : (
        // If not searching, display the default content (Trending and Recommended).
        <>
          <Trending data={trendingData} />

          {isAuthenticated ? (
            // If the user is logged in, show the Recommended component.
            <Recommended data={recommendedData} />
          ) : (
            // If not logged in, show a prompt to log in instead.
            <div className="mt-6">
              <h2 className="text-xl font-light text-white mb-4">
                Recommended for you
              </h2>
              <div className="bg-blue p-8 rounded-lg text-center">
                <p className="text-white/75">
                  To see personalized recommendations, please{" "}
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
        </>
      )}
    </main>
  );
}

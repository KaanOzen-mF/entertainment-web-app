"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../types";
import ShowCard from "@/components/ShowCard";
import SearchInput from "@/components/SearchInput";
import useDebounce from "@/hooks/useDebounce";
import { searchMovies, searchTvShows } from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Defines the props accepted by the MediaGrid component.
 */
type Props = {
  initialData: MediaContent[]; // The initial list of media to display when the page loads.
  pageTitle: string; // The main title for the page (e.g., "Movies", "Bookmarked Shows").
  searchPlaceholder: string; // The placeholder text for the search input.
  mediaType?: "movie" | "tv"; // Optional: The type of media to search for via API. If not provided, search will be local.
};

/**
 * A reusable component that displays a grid of media content (movies/TV shows)
 * and includes a search functionality. It can perform live API searches or local filtering
 * based on the provided props.
 */
const MediaGrid = ({
  initialData,
  pageTitle,
  searchPlaceholder,
  mediaType,
}: Props) => {
  // State to hold the data currently being displayed in the grid.
  const [displayedData, setDisplayedData] = useState(initialData);
  // State for the user's current input in the search bar.
  const [searchTerm, setSearchTerm] = useState("");
  // State to show a loading indicator specifically during an API search.
  const [isSearching, setIsSearching] = useState(false);
  // Debounced version of the search term to optimize performance.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // This effect handles the search logic whenever the debounced search term changes.
  useEffect(() => {
    const performSearch = async () => {
      // Condition for performing a live API search (only if a search term and mediaType are present).
      if (debouncedSearchTerm && mediaType) {
        setIsSearching(true);
        let results = [];
        if (mediaType === "movie") {
          results = await searchMovies(debouncedSearchTerm);
        } else if (mediaType === "tv") {
          results = await searchTvShows(debouncedSearchTerm);
        }
        setDisplayedData(results);
        setIsSearching(false);
      }
      // Condition for performing a local filter (e.g., on the Bookmarked page).
      else if (debouncedSearchTerm) {
        const results = initialData.filter((item) =>
          (item.title || item.name || "")
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        );
        setDisplayedData(results);
      }
      // If there is no search term, revert to showing the initial data.
      else {
        setDisplayedData(initialData);
      }
    };
    performSearch();
  }, [debouncedSearchTerm, initialData, mediaType]); // Re-run effect if these values change.

  /**
   * Updates the search term state as the user types in the input.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Enriches the displayed data by ensuring each item has a 'media_type'.
   * Some TMDB endpoints don't provide this, so we add it manually based on the page context.
   * This is crucial for the 'playTrailer' function to work correctly.
   */
  const dataWithEnrichedMediaType = displayedData.map((item) => ({
    ...item,
    media_type: item.media_type || mediaType,
  }));

  return (
    <section>
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h1 className="text-xl font-light text-white mb-6">
        {debouncedSearchTerm
          ? `Found ${dataWithEnrichedMediaType.length} results for '${debouncedSearchTerm}'`
          : pageTitle}
      </h1>

      {/* Show a loading spinner during live API searches. */}
      {isSearching ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {dataWithEnrichedMediaType.map(
            (item) => item && item.id && <ShowCard key={item.id} item={item} />
          )}
        </div>
      )}
    </section>
  );
};

export default MediaGrid;

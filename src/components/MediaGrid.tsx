// src/components/MediaGrid.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../types";
import ShowCard from "@/components/ShowCard";
import SearchInput from "@/components/SearchInput";
import useDebounce from "@/hooks/useDebounce";
import { searchMovies, searchTvShows } from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  initialData: MediaContent[];
  pageTitle: string;
  searchPlaceholder: string;
  mediaType?: "movie" | "tv";
};

const MediaGrid = ({
  initialData,
  pageTitle,
  searchPlaceholder,
  mediaType,
}: Props) => {
  const [displayedData, setDisplayedData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        let results = [];

        if (mediaType === "movie") {
          results = await searchMovies(debouncedSearchTerm);
        } else if (mediaType === "tv") {
          results = await searchTvShows(debouncedSearchTerm);
        } else {
          results = initialData.filter((item) =>
            (item.title || item.name || "")
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          );
        }
        setDisplayedData(results);
        setIsSearching(false);
      } else {
        setDisplayedData(initialData);
      }
    };
    performSearch();
  }, [debouncedSearchTerm, initialData, mediaType]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section>
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h1 className="text-xl font-light text-white mb-6">
        {debouncedSearchTerm
          ? `Found ${displayedData.length} results for '${debouncedSearchTerm}'`
          : pageTitle}
      </h1>

      {isSearching ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {displayedData.map(
            (item) => item && <ShowCard key={item.id} item={item} />
          )}
        </div>
      )}
    </section>
  );
};

export default MediaGrid;

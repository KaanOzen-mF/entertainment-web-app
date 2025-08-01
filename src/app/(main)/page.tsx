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

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [trendingData, setTrendingData] = useState<MediaContent[]>([]);
  const [recommendedData, setRecommendedData] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [trending, recommended] = await Promise.all([
          fetchTrendingAllWeek(),
          fetchDiscoverMovies(),
        ]);
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
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isSearching = debouncedSearchTerm.length > 0;
  const allDataForSearch = [...trendingData, ...recommendedData];

  const searchResults = isSearching
    ? allDataForSearch.filter((item) =>
        (item.title || item.name || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <SearchInput
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {isSearching ? (
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
        <>
          <Trending data={trendingData} />

          {isAuthenticated ? (
            <Recommended data={recommendedData} />
          ) : (
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

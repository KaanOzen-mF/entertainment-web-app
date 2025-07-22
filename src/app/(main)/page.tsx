// src/app/(main)/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../types";
import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import ShowCard from "@/components/ShowCard";

export default function Home() {
  const [allData, setAllData] = useState<MediaContent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/media");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data: MediaContent[] = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const isSearching = debouncedSearchTerm.length > 0;
  const filteredData = isSearching
    ? allData.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : allData;
  const trendingData = filteredData.filter((item) => item.isTrending);
  const recommendedData = filteredData.filter((item) => !item.isTrending);

  if (allData.length === 0) {
    return (
      <main>
        <SearchInput
          placeholder="Search for movies or TV series"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p className="text-white">Loading content...</p>
      </main>
    );
  }

  return (
    <main>
      <SearchInput
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {!isSearching && <Trending data={trendingData} />}

      {isSearching ? (
        <section>
          <h1 className="text-xl font-light text-white mb-6">
            Found {filteredData.length} results for &apos;{debouncedSearchTerm}
            &apos;
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filteredData.map((item) => (
              <ShowCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      ) : (
        <Recommended data={recommendedData} />
      )}
    </main>
  );
}

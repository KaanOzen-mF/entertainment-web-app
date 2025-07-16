// src/app/page.tsx
"use client";

import { useState } from "react";
import data from "../../data.json";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import SearchInput from "@/components/SearchInput";
import { MediaContent } from "../../types";
import ShowCard from "@/components/ShowCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isSearching = searchTerm.length > 0;

  const filteredData = isSearching
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const trendingData = filteredData.filter(
    (item) => item.isTrending
  ) as MediaContent[];
  const recommendedData = filteredData.filter(
    (item) => !item.isTrending
  ) as MediaContent[];

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
            Found {filteredData.length} results for &apos;{searchTerm}&apos;
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filteredData.map((item) => (
              <ShowCard key={item.title} item={item as MediaContent} />
            ))}
          </div>
        </section>
      ) : (
        <Recommended data={recommendedData} />
      )}
    </main>
  );
}

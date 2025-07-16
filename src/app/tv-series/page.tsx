// src/app/tv-series/page.tsx
"use client";
import data from "../../../data.json";
import { MediaContent } from "../../../types";
import ShowCard from "@/components/ShowCard";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";

const TvSeriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const tvSeries = data.filter(
    (item) => item.category === "TV Series"
  ) as MediaContent[];

  const filteredTvSeries = searchTerm
    ? tvSeries.filter((series) =>
        series.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tvSeries;

  return (
    <section>
      <SearchInput
        placeholder="Search for TV series"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h1 className="text-xl font-light text-white mb-6">
        {searchTerm
          ? `Found ${filteredTvSeries.length} results for '${searchTerm}'`
          : "TV Series"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {filteredTvSeries.map((series) => (
          <ShowCard key={series.title} item={series} />
        ))}
      </div>
    </section>
  );
};

export default TvSeriesPage;

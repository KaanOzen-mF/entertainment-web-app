// src/app/movies/page.tsx
"use client"; // State ve event handling için client component yapıyoruz.

import { useState } from "react";
import data from "../../../data.json";
import { MediaContent } from "../../../types";
import ShowCard from "@/components/ShowCard";
import SearchInput from "@/components/SearchInput";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const movies = data.filter(
    (item) => item.category === "Movie"
  ) as MediaContent[];

  const filteredMovies = searchTerm
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;

  return (
    <section>
      <SearchInput
        placeholder="Search for movies"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h1 className="text-xl font-light text-white mb-6">
        {searchTerm
          ? `Found ${filteredMovies.length} results for '${searchTerm}'`
          : "Movies"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {filteredMovies.map((movie) => (
          <ShowCard key={movie.title} item={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesPage;

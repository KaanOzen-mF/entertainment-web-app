// src/app/(main)/movies/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { fetchDiscoverMovies } from "@/lib/api"; // Correct function imported

const MoviesPage = () => {
  const [movies, setMovies] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await fetchDiscoverMovies(); // Correct function called
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  if (isLoading) {
    return <p className="text-white p-6">Loading movies...</p>;
  }

  return (
    <MediaGrid
      data={movies}
      pageTitle="Movies"
      searchPlaceholder="Search for movies"
    />
  );
};

export default MoviesPage;

"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { fetchDiscoverMovies } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await fetchDiscoverMovies();
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
    return <LoadingSpinner />;
  }

  return (
    <MediaGrid
      initialData={movies}
      pageTitle="Movies"
      searchPlaceholder="Search for movies"
      mediaType="movie"
    />
  );
};

export default MoviesPage;

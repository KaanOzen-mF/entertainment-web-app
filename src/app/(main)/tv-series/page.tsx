// src/app/(main)/tv-series/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { fetchDiscoverTv } from "@/lib/api"; // Correct function imported

const TvSeriesPage = () => {
  const [tvSeries, setTvSeries] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTvSeries = async () => {
      try {
        const tvSeriesData = await fetchDiscoverTv(); // Correct function called
        setTvSeries(tvSeriesData);
      } catch (error) {
        console.error("Failed to fetch TV series:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getTvSeries();
  }, []);

  if (isLoading) {
    return <p className="text-white p-6">Loading TV series...</p>;
  }

  return (
    <MediaGrid
      data={tvSeries}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV series"
    />
  );
};

export default TvSeriesPage;

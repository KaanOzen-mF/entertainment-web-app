"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { fetchDiscoverTv } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const TvSeriesPage = () => {
  const [tvSeries, setTvSeries] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTvSeries = async () => {
      try {
        const tvSeriesData = await fetchDiscoverTv();
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
    return <LoadingSpinner />;
  }

  return (
    <MediaGrid
      initialData={tvSeries}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV series"
      mediaType="tv"
    />
  );
};

export default TvSeriesPage;

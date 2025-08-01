// src/app/(main)/tv-series/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";
import { fetchDiscoverTv } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * The page component for displaying a list of popular TV series.
 * It fetches data from the TMDB API on the client-side and uses the
 * reusable MediaGrid component to display and handle searching.
 */
const TvSeriesPage = () => {
  // 1. State to store the list of TV series fetched from the API.
  const [tvSeries, setTvSeries] = useState<MediaContent[]>([]);
  // 2. State to manage the loading status while data is being fetched.
  const [isLoading, setIsLoading] = useState(true);

  // 3. This effect runs once when the component first mounts.
  //    Its purpose is to fetch the initial data for the page.
  useEffect(() => {
    const getTvSeries = async () => {
      try {
        // Fetch popular TV series using our dedicated API helper function.
        const tvSeriesData = await fetchDiscoverTv();
        setTvSeries(tvSeriesData);
      } catch (error) {
        console.error("Failed to fetch TV series:", error);
      } finally {
        // Once the fetch is complete (either success or failure), stop showing the loader.
        setIsLoading(false);
      }
    };
    getTvSeries();
  }, []); // The empty dependency array ensures this runs only once.

  // 4. While the data is being fetched, display the loading spinner.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 5. Once loading is complete, render the MediaGrid component with the fetched data.
  return (
    <MediaGrid
      initialData={tvSeries}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV series"
      mediaType="tv" // Specify the media type for live API searching.
    />
  );
};

export default TvSeriesPage;

import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";

async function getTvSeries() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/media?category=TV%20Series",
      {
        cache: "no-store",
      }
    );
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("Failed to fetch TV series:", error);
    return [];
  }
}

export default async function TvSeriesPage() {
  const tvSeries: MediaContent[] = await getTvSeries();

  return (
    <MediaGrid
      data={tvSeries}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV series"
    />
  );
}

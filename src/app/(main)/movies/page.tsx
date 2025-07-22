import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";

async function getMovies() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/media?category=Movie",
      {
        cache: "no-store",
      }
    );
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

export default async function MoviesPage() {
  const movies: MediaContent[] = await getMovies();

  return (
    <MediaGrid
      data={movies}
      pageTitle="Movies"
      searchPlaceholder="Search for movies"
    />
  );
}

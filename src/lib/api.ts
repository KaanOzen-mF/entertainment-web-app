import { MediaContent, VideoResult } from "../../types";

const API_PROXY_URL = "/api/tmdb";

const fetchFromTmdb = async (path: string) => {
  try {
    const response = await fetch(`${API_PROXY_URL}/${path}`);
    if (!response.ok) {
      throw new Error("Proxy request failed: " + response.statusText);
    }
    const data = await response.json();
    if (data.results) {
      return data.results.filter(
        (item: MediaContent) => item.media_type !== "person"
      );
    }

    return data;
  } catch (error) {
    console.error(`[TMDB Fetch] CATCH BLOK. Path: ${path}, Hata:`, error);
    return null;
  }
};

const BACKEND_API_BASE_URL = "http://localhost:8080/api/v1";

const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BACKEND_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An API error occurred");
    }
    throw new Error(response.statusText);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return;
};

export const fetchTrendingAllWeek = () => fetchFromTmdb("trending/all/week");
export const fetchTrendingMoviesWeek = () =>
  fetchFromTmdb("trending/movie/week");
export const fetchTrendingTvWeek = () => fetchFromTmdb("trending/tv/week");
export const fetchDiscoverMovies = () => fetchFromTmdb("discover/movie");
export const fetchDiscoverTv = () => fetchFromTmdb("discover/tv");

export const fetchBookmarks = (): Promise<number[]> => {
  return authenticatedFetch("/bookmarks");
};
export const addBookmark = (tmdbId: number): Promise<void> => {
  return authenticatedFetch(`/bookmarks/${tmdbId}`, { method: "POST" });
};
export const deleteBookmark = (tmdbId: number): Promise<void> => {
  return authenticatedFetch(`/bookmarks/${tmdbId}`, { method: "DELETE" });
};
export const fetchMediaDetails = (mediaType: "movie" | "tv", id: number) => {
  return fetchFromTmdb(`${mediaType}/${id}`);
};

export const searchMovies = (query: string) => {
  return fetchFromTmdb(`search/movie?query=${encodeURIComponent(query)}`);
};

export const searchTvShows = (query: string) => {
  return fetchFromTmdb(`search/tv?query=${encodeURIComponent(query)}`);
};

export const fetchTrailerKey = async (
  mediaType: "movie" | "tv",
  id: number
): Promise<string | null> => {
  try {
    const videos: VideoResult[] = await fetchFromTmdb(
      `${mediaType}/${id}/videos`
    );

    const trailer = videos.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error(`Failed to fetch trailer for ${mediaType} ID ${id}:`, error);
    return null;
  }
};

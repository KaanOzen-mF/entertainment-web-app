import { MediaContent } from "../../types";

const API_PROXY_URL = "/api/tmdb";

type TmdbApiResponse = {
  page: number;
  results: MediaContent[];
  total_pages: number;
  total_results: number;
};

const fetchFromTmdb = async (path: string): Promise<MediaContent[]> => {
  try {
    const response = await fetch(`${API_PROXY_URL}/${path}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from TMDB proxy");
    }
    const data: TmdbApiResponse = await response.json();

    return data.results.filter((item) => item.media_type !== "person");
  } catch (error) {
    console.error(error);
    return [];
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

  if (response.status !== 204) {
    return response.json();
  }
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

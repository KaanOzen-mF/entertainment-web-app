import { MediaContent, VideoResult } from "../../types";

// --- TMDB API PROXY HELPERS ---

// The internal Next.js route that acts as a secure proxy to the TMDB API.
const API_PROXY_URL = "/api/tmdb";

/**
 * A centralized function to fetch data from our TMDB API proxy.
 * It intelligently handles both list responses (like search results) and single object responses (like movie details).
 * @param path The TMDB API path to request (e.g., "trending/all/week").
 * @returns The fetched data, or null if an error occurs.
 */
const fetchFromTmdb = async (path: string) => {
  try {
    const response = await fetch(`${API_PROXY_URL}/${path}`);
    if (!response.ok) {
      throw new Error("Proxy request failed: " + response.statusText);
    }
    const data = await response.json();

    // If the response contains a 'results' array, it's a list.
    // We extract and return only the results array.
    if (data.results) {
      return data.results.filter(
        (item: MediaContent) => item.media_type !== "person"
      );
    }

    // Otherwise, it's a single item (e.g., movie details), so we return the whole object.
    return data;
  } catch (error) {
    console.error(`[TMDB Fetch] CATCH BLOCK. Path: ${path}, Error:`, error);
    return null;
  }
};

// --- BACKEND API HELPERS ---

// The base URL for our own Java/Spring Boot backend API.
const BACKEND_API_BASE_URL = "http://69.62.114.171:8081/api/v1";

/**
 * A wrapper around the native fetch API that automatically adds the
 * JWT Authorization header to requests sent to our backend.
 * @param endpoint The backend API endpoint to call (e.g., "/bookmarks").
 * @param options Standard fetch options (method, body, etc.).
 * @returns The parsed JSON response, or nothing if the response is empty.
 */
const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  // Retrieve the authentication token from browser's local storage.
  const token = localStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // If a token exists, add it to the Authorization header.
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

  // Handle responses that have no content (e.g., 200 OK from a POST/DELETE).
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return; // Return nothing for empty responses.
};

// --- EXPORTED TMDB API FUNCTIONS ---

// Functions for fetching general media lists from TMDB.
export const fetchTrendingAllWeek = () => fetchFromTmdb("trending/all/week");
export const fetchTrendingMoviesWeek = () =>
  fetchFromTmdb("trending/movie/week");
export const fetchTrendingTvWeek = () => fetchFromTmdb("trending/tv/week");
export const fetchDiscoverMovies = () => fetchFromTmdb("discover/movie");
export const fetchDiscoverTv = () => fetchFromTmdb("discover/tv");

// Function for fetching details of a single media item.
export const fetchMediaDetails = (mediaType: "movie" | "tv", id: number) => {
  return fetchFromTmdb(`${mediaType}/${id}`);
};

// Functions for searching media on TMDB.
export const searchMovies = (query: string) => {
  return fetchFromTmdb(`search/movie?query=${encodeURIComponent(query)}`);
};
export const searchTvShows = (query: string) => {
  return fetchFromTmdb(`search/tv?query=${encodeURIComponent(query)}`);
};

/**
 * Fetches all videos for a given media item and returns the key of the first official YouTube trailer.
 * @param mediaType The type of media ('movie' or 'tv').
 * @param id The TMDB ID of the media.
 * @returns The YouTube key as a string, or null if no trailer is found.
 */
export const fetchTrailerKey = async (
  mediaType: "movie" | "tv",
  id: number
): Promise<string | null> => {
  try {
    const videos: VideoResult[] = await fetchFromTmdb(
      `${mediaType}/${id}/videos`
    );

    // Ensure 'videos' is a valid array before trying to find a trailer.
    if (!Array.isArray(videos)) {
      return null;
    }

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

// --- EXPORTED BACKEND API FUNCTIONS ---

// Functions for managing user bookmarks via our own backend.
export const fetchBookmarks = (): Promise<number[]> => {
  return authenticatedFetch("/bookmarks");
};
export const addBookmark = (tmdbId: number): Promise<void> => {
  return authenticatedFetch(`/bookmarks/${tmdbId}`, { method: "POST" });
};
export const deleteBookmark = (tmdbId: number): Promise<void> => {
  return authenticatedFetch(`/bookmarks/${tmdbId}`, { method: "DELETE" });
};

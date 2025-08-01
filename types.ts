/**
 * Represents the structure of a single media item (movie or TV show)
 * received from The Movie Database (TMDB) API.
 */
export type MediaContent = {
  // The unique identifier for the media from TMDB.
  id: number;

  // The title of the media. Primarily used for movies. Optional ('?') because TV shows use 'name'.
  title?: string;

  // The name of the media. Primarily used for TV shows. Optional ('?') because movies use 'title'.
  name?: string;

  // The release date for movies (format: "YYYY-MM-DD").
  release_date?: string;

  // The first air date for TV shows (format: "YYYY-MM-DD").
  first_air_date?: string;

  // The type of the media content, essential for distinguishing between movies and TV shows.
  media_type: "movie" | "tv" | "person";

  // The path to the main backdrop image (used for larger, trending cards).
  backdrop_path: string;

  // The path to the standard poster image (used for smaller, regular cards).
  poster_path: string;

  // The average user rating on a scale of 10.
  vote_average: number;

  // A brief summary or plot of the media.
  overview: string;

  // A list of genre IDs associated with the media.
  genre_ids: number[];

  // A client-side flag to indicate if the current user has bookmarked this item.
  // This property is not from TMDB; we add it ourselves in the frontend.
  isBookmarked?: boolean;
};

/**
 * Represents the structure of a single video/trailer result
 * within the TMDB video API response.
 */
export type VideoResult = {
  iso_639_1: string; // Language code (e.g., "en")
  iso_3166_1: string; // Country code (e.g., "US")
  name: string; // The title of the video (e.g., "Official Trailer")
  key: string; // The YouTube video key, used to build the embed URL.
  site: string; // The platform where the video is hosted (e.g., "YouTube").
  size: number; // Video resolution (e.g., 1080).
  type: string; // The type of the video (e.g., "Trailer", "Teaser", "Clip").
  official: boolean; // Indicates if the video is an officially released one.
  published_at: string; // The ISO 8601 timestamp of when the video was published.
  id: string; // The unique ID for this video entry.
};

/**
 * Represents the top-level structure of the TMDB API response
 * when fetching a list of videos for a specific movie or TV show.
 */
export type VideoApiResponse = {
  id: number; // The TMDB ID of the parent movie or TV show.
  results: VideoResult[]; // An array containing all available video results.
};

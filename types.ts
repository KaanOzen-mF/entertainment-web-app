export type MediaContent = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv" | "person";
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];

  isBookmarked?: boolean;
};

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type VideoApiResponse = {
  id: number;
  results: VideoResult[];
};

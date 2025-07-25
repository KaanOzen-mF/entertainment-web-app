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

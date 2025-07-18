import data from "../../../../data.json";
import { MediaContent } from "../../../../types";
import MediaGrid from "@/components/MediaGrid";

const MoviesPage = () => {
  const movies = data.filter(
    (item) => item.category === "Movie"
  ) as MediaContent[];

  return (
    <MediaGrid
      data={movies}
      pageTitle="Movies"
      searchPlaceholder="Search for movies"
    />
  );
};

export default MoviesPage;

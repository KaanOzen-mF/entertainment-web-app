// src/app/movies/page.tsx

import data from "../../../data.json";
import { MediaContent } from "../../../types";
import ShowCard from "@/components/ShowCard";

const MoviesPage = () => {
  const movies = data.filter(
    (item) => item.category === "Movie"
  ) as MediaContent[];

  return (
    <section>
      <h1 className="text-xl font-light text-white mb-6 mt-8">Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {movies.map((movie) => (
          <ShowCard key={movie.title} item={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesPage;

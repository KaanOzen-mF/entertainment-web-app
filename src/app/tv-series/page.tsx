// src/app/tv-series/page.tsx

import data from "../../../data.json";
import { MediaContent } from "../../../types";
import ShowCard from "@/components/ShowCard";

const TvSeriesPage = () => {
  const tvSeries = data.filter(
    (item) => item.category === "TV Series"
  ) as MediaContent[];

  return (
    <section className="mt-8">
      <h1 className="text-xl font-light text-white mb-6">TV Series</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {tvSeries.map((series) => (
          <ShowCard key={series.title} item={series} />
        ))}
      </div>
    </section>
  );
};

export default TvSeriesPage;

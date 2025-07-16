import data from "../../../data.json";
import { MediaContent } from "../../../types";
import MediaGrid from "@/components/MediaGrid";

const TvSeriesPage = () => {
  const series = data.filter(
    (item) => item.category === "TV Series"
  ) as MediaContent[];

  return (
    <MediaGrid
      data={series}
      pageTitle="TV Series"
      searchPlaceholder="Search for TV series"
    />
  );
};

export default TvSeriesPage;

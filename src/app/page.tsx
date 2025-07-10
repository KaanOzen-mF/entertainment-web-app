// src/app/page.tsx

import Trending from "@/components/Trending";
import data from "../../data.json";
import Recommended from "@/components/Recommended";

export default function Home() {
  const trendingData = data.filter((item) => item.isTrending);

  return (
    <section>
      {/* Search Bar */}

      <Trending data={trendingData} />

      {/* Suggestion */}
      <Recommended data={data} />
    </section>
  );
}

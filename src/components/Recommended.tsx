// src/components/Recommended.tsx

import { MediaContent } from "../../types";
import ShowCard from "./ShowCard";

type Props = {
  data: MediaContent[];
};

const Recommended = ({ data }: Props) => {
  return (
    <section className="mt-6">
      <h1 className="text-xl font-light text-white mb-6">
        Recommended for you
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:mr-4">
        {data.map((item) => (
          <ShowCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Recommended;

// src/components/Trending.tsx

"use client";

import { useRef } from "react";
import TrendingCard from "./TrendingCard";
import { MediaContent } from "../../types";

type Props = {
  data: MediaContent[];
};

const Trending = ({ data }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="relative mt-8">
      <h1 className="text-xl font-light text-white mb-4">Trending</h1>

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20 pointer-events-none">
        <button
          onClick={() => handleScroll("left")}
          className="bg-black/50 text-white p-2 rounded-full pointer-events-auto hover:bg-white hover:text-black transition-all"
        >
          {"<"}
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="bg-black/50 text-white p-2 rounded-full pointer-events-auto hover:bg-white hover:text-black transition-all"
        >
          {">"}
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-10 -mb-10 scroll-smooth"
        >
          {data.map((item) => (
            <TrendingCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;

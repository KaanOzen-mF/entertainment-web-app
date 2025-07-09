// src/components/Trending.tsx

"use client"; // useRef ve event handler'lar kullanacağımız için client component olmalı.

import { useRef } from "react"; // 1. useRef hook'unu import ediyoruz.
import TrendingCard from "./TrendingCard";

type TrendingData = {
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
};

type Props = {
  data: TrendingData[];
};

const Trending = ({ data }: Props) => {
  // 2. Kaydıracağımız div'e bir referans oluşturuyoruz.
  const scrollRef = useRef<HTMLDivElement>(null);

  // 3. Ok'lara tıklandığında çalışacak fonksiyon.
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 500; // Her tıklamada ne kadar kaydırılacağı (pixel)
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    // 4. Ana konteynere 'relative' ekliyoruz ki okları buna göre konumlandıralım.
    <section className="relative mt-6">
      <h1 className="text-xl font-light text-white mb-4">Trending</h1>

      {/* 5. Navigasyon Okları */}
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
        {/* 6. Oluşturduğumuz referansı (ref) kaydırılacak div'e bağlıyoruz. */}
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

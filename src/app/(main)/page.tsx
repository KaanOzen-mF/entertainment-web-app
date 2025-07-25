// src/app/(main)/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MediaContent } from "../../../types"; // Doğru yolu kontrol et
import useDebounce from "@/hooks/useDebounce";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import ShowCard from "@/components/ShowCard";
import { fetchTrendingAllWeek, fetchDiscoverMovies } from "@/lib/api"; // 1. Doğru API fonksiyonlarını import ediyoruz

export default function Home() {
  const [trendingData, setTrendingData] = useState<MediaContent[]>([]);
  const [recommendedData, setRecommendedData] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 3. Veri çekme işlemini iki ayrı API çağrısı için güncelliyoruz
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Promise.all ile iki isteği aynı anda atıyoruz
        const [trending, recommended] = await Promise.all([
          fetchTrendingAllWeek(),
          fetchDiscoverMovies(),
        ]);
        setTrendingData(trending);
        setRecommendedData(recommended);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 4. Arama mantığını güncelliyoruz
  const isSearching = debouncedSearchTerm.length > 0;
  // Arama, hem trend olanlar hem de önerilenler listesinin birleşimi üzerinde yapılır.
  const allDataForSearch = [...trendingData, ...recommendedData];

  const searchResults = isSearching
    ? allDataForSearch.filter((item) =>
        // TMDB'de filmler için 'title', diziler için 'name' alanı kullanılır.
        (item.title || item.name || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <main>
        <SearchInput
          placeholder="Search for movies or TV series"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p className="text-white mt-6">Loading content...</p>
      </main>
    );
  }

  return (
    <main>
      <SearchInput
        placeholder="Search for movies or TV series"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {isSearching ? (
        // Arama sonuçları gösterimi
        <section>
          <h1 className="text-xl font-light text-white my-6">
            Found {searchResults.length} results for &apos;{debouncedSearchTerm}
            &apos;
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {searchResults.map((item) => (
              <ShowCard key={item.id} item={item} /> // key olarak artık TMDB id'sini kullanmak daha güvenli
            ))}
          </div>
        </section>
      ) : (
        // Normal sayfa görünümü
        <>
          <Trending data={trendingData} />
          <Recommended data={recommendedData} />
        </>
      )}
    </main>
  );
}

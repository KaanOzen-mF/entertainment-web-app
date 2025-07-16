// src/components/MediaGrid.tsx
"use client";

import { useState } from "react";
import { MediaContent } from "../../types";
import ShowCard from "@/components/ShowCard";
import SearchInput from "@/components/SearchInput";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  data: MediaContent[];
  pageTitle: string;
  searchPlaceholder: string;
};

const MediaGrid = ({ data, pageTitle, searchPlaceholder }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = debouncedSearchTerm
    ? data.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : data;

  return (
    <section>
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h1 className="text-xl font-light text-white mb-6">
        {debouncedSearchTerm
          ? `Found ${filteredData.length} results for '${debouncedSearchTerm}'`
          : pageTitle}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {filteredData.map((item) => (
          <ShowCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MediaGrid;

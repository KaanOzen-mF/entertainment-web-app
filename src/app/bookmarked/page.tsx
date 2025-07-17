// src/app/bookmarked/page.tsx
"use client";

import data from "../../../data.json";
import { MediaContent } from "../../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";

const BookmarkedPage = () => {
  const { bookmarkedTitles } = useBookmarks();

  // 3. Tüm veri içinde, başlığı bizim favoriler listemizde olanları filtreliyoruz.
  const bookmarkedItems = data.filter((item) =>
    bookmarkedTitles.includes(item.title)
  ) as MediaContent[];

  return (
    <MediaGrid
      data={bookmarkedItems}
      pageTitle="Bookmarked Movies & TV Series"
      searchPlaceholder="Search in your bookmarks"
    />
  );
};

export default BookmarkedPage;

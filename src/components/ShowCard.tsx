// src/components/ShowCard.tsx

"use client";

import Image from "next/image";
import { MediaContent } from "../../types";
import { useBookmarks } from "@/context/BookmarkContext";

type Props = {
  item: MediaContent;
};

const ShowCard = ({ item }: Props) => {
  const { bookmarkedTitles, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedTitles.includes(item.title);

  const imageUrl = item.thumbnail.regular.large.slice(1);
  const categoryIcon =
    item.category === "Movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";

  return (
    <div className="group flex flex-col gap-2 cursor-pointer">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.title}
          width={280}
          height={174}
          className="w-full h-auto transition duration-300 group-hover:brightness-50"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300"></div>

        <div
          onClick={() => toggleBookmark(item.title)}
          className="group absolute top-4 right-4 z-20 bg-lightBlue/80 p-3 rounded-full flex items-center justify-center
                   hover:bg-white transition-colors duration-300"
        >
          <Image
            src={
              isBookmarked
                ? "/assets/icon-bookmark-full.svg"
                : "/assets/icon-bookmark-empty.svg"
            }
            alt="Bookmark"
            width={12}
            height={14}
            className="filter transition-all duration-200 group-hover:invert"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/25 p-2 pr-5 rounded-full flex items-center gap-4 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
            <Image
              src="/assets/icon-play.svg"
              alt="Play"
              width={30}
              height={30}
            />
            <span className="text-white font-bold text-text3">Play</span>
          </div>
        </div>
      </div>

      <div className="text-white">
        <div className="flex items-center gap-2 text-white/75 text-text5">
          <span>{item.year}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Image src={categoryIcon} alt="Category" width={12} height={12} />
            <span>{item.category}</span>
          </div>
          <span>•</span>
          <span>{item.rating}</span>
        </div>
        <h3 className="text-text3 font-bold mt-1">{item.title}</h3>
      </div>
    </div>
  );
};

export default ShowCard;

"use client";

import Image from "next/image";
import { MediaContent } from "../../types";
import { useBookmarks } from "@/context/BookmarkContext";

type Props = {
  item: MediaContent;
};

const TrendingCard = ({ item }: Props) => {
  const { bookmarkedTmdbIds, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarkedTmdbIds.includes(item.id);

  const imageUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
  const categoryIcon =
    item.media_type === "movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;

  return (
    <div className="group relative flex-shrink-0 min-w-[340px] md:min-w-[420px] h-[230px] rounded-lg overflow-hidden cursor-pointer">
      <Image
        src={imageUrl}
        alt={title || "Media Image"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      <div
        onClick={() => toggleBookmark(item)}
        className="absolute top-4 right-4 z-20 bg-lightBlue/80 p-3 rounded-full flex items-center justify-center hover:bg-blue transition-colors"
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
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      <div className="absolute bottom-6 left-6 z-10">
        <div className="flex items-center gap-4 text-white/75 text-text4">
          <span>{releaseDate}</span>
          <div className="flex items-center gap-2">
            <Image src={categoryIcon} alt="Category" width={12} height={12} />
            <span>{item.media_type === "movie" ? "Movie" : "TV Show"}</span>
          </div>
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
        <h3 className="text-text2 font-bold text-white mt-1">{item.title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;

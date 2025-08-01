"use client";

import Image from "next/image";
import { MediaContent } from "../../types";
import { useBookmarks } from "@/context/BookmarkContext";
import { useTrailer } from "@/context/TrailerContext";

type Props = {
  item: MediaContent;
};

const TrendingCard = ({ item }: Props) => {
  const { bookmarkedTmdbIds, toggleBookmark } = useBookmarks();
  const { playTrailer } = useTrailer();
  const isBookmarked = bookmarkedTmdbIds.includes(item.id);

  const imageUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
  const categoryIcon =
    item.media_type === "movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <div className="group relative flex-shrink-0 min-w-[470px] h-[230px] rounded-lg overflow-hidden cursor-pointer">
      <Image
        src={imageUrl}
        alt={title || "Media poster"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(item);
        }}
        className="absolute top-4 right-4 z-20 bg-darkBlue/50 p-3 rounded-full flex items-center justify-center hover:bg-white transition-colors"
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
          <span>{year}</span>
          <div className="flex items-center gap-2">
            <Image src={categoryIcon} alt="Category" width={12} height={12} />
            <span>{item.media_type === "movie" ? "Movie" : "TV Series"}</span>
          </div>
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
        <h3 className="text-text2 font-bold text-white mt-1">{title}</h3>
      </div>

      <div
        onClick={() => playTrailer(item)}
        className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="bg-white/25 p-2 pr-5 rounded-full flex items-center gap-4">
          <Image
            src="/assets/icon-play.svg"
            alt="Play"
            width={30}
            height={30}
          />
          <span className="text-white font-bold">Play</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;

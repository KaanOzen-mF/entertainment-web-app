"use client";

import Image from "next/image";
import { MediaContent } from "../../types";
import { useBookmarks } from "@/context/BookmarkContext";
import { useTrailer } from "@/context/TrailerContext";

/**
 * Defines the props accepted by the TrendingCard component.
 */
type Props = {
  item: MediaContent; // The full media content object to display.
};

/**
 * A larger card component specifically for displaying trending media items.
 * It features a wide backdrop image and overlays for information and actions.
 */
const TrendingCard = ({ item }: Props) => {
  // 1. Get global state and functions from our custom contexts.
  const { bookmarkedTmdbIds, toggleBookmark } = useBookmarks();
  const { playTrailer } = useTrailer();

  // 2. Determine if this item is bookmarked by checking the global state.
  const isBookmarked = bookmarkedTmdbIds.includes(item.id);

  // 3. Prepare data from the TMDB item for display.
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
  const categoryIcon =
    item.media_type === "movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    // Main container for the card. 'flex-shrink-0' is crucial for horizontal scrolling layouts.
    <div className="group relative flex-shrink-0 min-w-[470px] h-[230px] rounded-lg overflow-hidden cursor-pointer">
      {/* The main backdrop image. Fills the container. */}
      <Image
        src={imageUrl}
        alt={title || "Media poster"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />

      {/* Bookmark Icon Button */}
      <div
        onClick={(e) => {
          // Stop the click from propagating to the parent div, which would trigger the trailer.
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

      {/* Gradient Overlay: A dark gradient at the bottom to make the text more readable. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Info Section: Displayed at the bottom-left of the card. */}
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

      {/* Play Button Overlay: Appears on top of everything when the card is hovered. */}
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

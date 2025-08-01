// src/components/ShowCard.tsx
"use client";

import Image from "next/image";
import { MediaContent } from "../../types";
import { useBookmarks } from "@/context/BookmarkContext";
import { useTrailer } from "@/context/TrailerContext";

/**
 * Defines the props accepted by the ShowCard component.
 */
type Props = {
  item: MediaContent; // The full media content object to display.
};

/**
 * A reusable card component to display a single movie or TV show.
 * It includes functionality for bookmarking and playing a trailer.
 */
const ShowCard = ({ item }: Props) => {
  // 1. Get global state and functions from our custom contexts.
  const { bookmarkedTmdbIds, toggleBookmark } = useBookmarks();
  const { playTrailer } = useTrailer();

  // 2. Determine if this specific item is currently bookmarked by checking if its ID is in the global list.
  const isBookmarked = bookmarkedTmdbIds.includes(item.id);

  // 3. Prepare data from the TMDB item for display.
  //    - Construct the full image URL. TMDB provides only the path.
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  //    - Select the correct category icon based on the media type.
  const categoryIcon =
    item.media_type === "movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";
  //    - Use 'title' for movies and 'name' for TV shows. This is crucial.
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <div className="group flex flex-col gap-2 cursor-pointer">
      {/* --- IMAGE & OVERLAY CONTAINER --- */}
      <div className="relative rounded-lg overflow-hidden">
        {/* The main poster image. */}
        <Image
          src={imageUrl}
          alt={title || "Media Image"}
          width={280}
          height={174}
          // Apply a brightness filter on hover for a darkening effect.
          className="w-full h-auto transition duration-300 group-hover:brightness-50"
        />

        {/* Bookmark Icon Button */}
        <div
          onClick={() => toggleBookmark(item)}
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
            // The inner 'group-hover:invert' makes the icon visible when the background turns white.
            className="filter transition-all duration-200 group-hover:invert"
          />
        </div>

        {/* Play Button Overlay */}
        <div
          onClick={() => playTrailer(item)}
          // This overlay is invisible by default and appears on hover.
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {/* The visual representation of the play button. */}
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

      {/* --- INFO SECTION --- */}
      <div className="text-white">
        <div className="flex items-center gap-2 text-white/75 text-text5">
          <span>{year}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Image src={categoryIcon} alt="Category" width={12} height={12} />
            <span>{item.media_type === "movie" ? "Movie" : "TV Show"}</span>
          </div>
          <span>•</span>
          {/* Display the vote average with one decimal place. */}
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
        {/* FIX: Use the 'title' variable which correctly handles both movies and TV shows. */}
        <h3 className="text-text3 font-bold mt-1">{title}</h3>
      </div>
    </div>
  );
};

export default ShowCard;

// src/components/TrendingCard.tsx

import Image from "next/image";
import { MediaContent } from "../../types";

type Props = {
  item: MediaContent;
};

const TrendingCard = ({ item }: Props) => {
  const imageUrl = item.thumbnail.trending?.large || "";

  const correctedImageUrl = imageUrl.slice(1);
  const correctedCategoryIcon =
    item.category === "Movie"
      ? "/assets/icon-category-movie.svg"
      : "/assets/icon-category-tv.svg";

  return (
    <div className="group relative flex-shrink-0 min-w-[470px] h-[230px] rounded-lg overflow-hidden cursor-pointer">
      <Image
        src={correctedImageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div
        className="group absolute top-4 right-4 z-20 bg-darkBlue/50 p-3 rounded-full flex items-center justify-center 
                hover:bg-white transition-colors duration-300"
      >
        <Image
          src={
            item.isBookmarked
              ? "/assets/icon-bookmark-full.svg"
              : "/assets/icon-bookmark-empty.svg"
          }
          alt="Bookmark"
          width={12}
          height={14}
          className="filter transition-all duration-200 group-hover:invert"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-6 left-6 z-10">
        <div className="flex items-center gap-4 text-white/75 text-text4">
          <span>{item.year}</span>
          <div className="flex items-center gap-2">
            <Image
              src={correctedCategoryIcon}
              alt="Category"
              width={12}
              height={12}
            />
            <span>{item.category}</span>
          </div>
          <span>{item.rating}</span>
        </div>
        <h3 className="text-text2 font-bold text-white mt-1">{item.title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;

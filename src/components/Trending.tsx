"use client";

import { useRef } from "react";
import TrendingCard from "./TrendingCard";
import { MediaContent } from "../../types";

/**
 * Defines the props accepted by the Trending component.
 */
type Props = {
  data: MediaContent[]; // An array of media content flagged as 'trending'.
};

/**
 * A component that displays a horizontally scrollable list of trending media items.
 * It includes navigation arrows for easy scrolling.
 */
const Trending = ({ data }: Props) => {
  // 1. Create a ref to get direct access to the scrollable div element in the DOM.
  //    This allows us to programmatically control its scroll position.
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the click events for the left and right scroll arrows.
   * @param direction The direction to scroll ('left' or 'right').
   */
  const handleScroll = (direction: "left" | "right") => {
    // Ensure the ref is connected to an element.
    if (scrollRef.current) {
      const scrollAmount = 500; // The number of pixels to scroll on each click.
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    // The main container is 'relative' to position the absolute arrows inside it.
    <section className="relative mt-8">
      <h1 className="text-xl font-light text-white mb-4">Trending</h1>

      {/* 2. Navigation Arrows Container */}
      {/* - 'absolute' positions the arrows on top of the content.
            - 'pointer-events-none' on the container and 'pointer-events-auto' on the buttons
              ensures that only the buttons are clickable, not the space between them.
      */}
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

      {/* 3. Scrollable Content Area */}
      {/* - 'overflow-hidden' on the wrapper hides the scrollbar pushed down by the inner div. */}
      <div className="overflow-hidden">
        {/* - 'ref={scrollRef}' connects our ref to this div.
            - 'overflow-x-auto' enables horizontal scrolling.
            - 'scroll-smooth' makes the programmatic scrolling animated.
            - 'pb-10 -mb-10' is a trick to hide the scrollbar visually while keeping it functional.
        */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-10 -mb-10 scroll-smooth"
        >
          {/* 4. Map over the data to render a TrendingCard for each item. */}
          {data.map((item) => (
            <TrendingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;

"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { fetchTrailerKey } from "@/lib/api";
import TrailerModal from "@/components/TrailerModal";
import { MediaContent } from "../../types";

/**
 * Defines the shape of the data that will be available through the TrailerContext.
 */
interface TrailerContextType {
  // A function that any component can call to request playing a trailer.
  playTrailer: (item: MediaContent) => void;
}

// Create the context with an initial undefined value.
const TrailerContext = createContext<TrailerContextType | undefined>(undefined);

/**
 * The TrailerProvider component manages the state for the trailer modal.
 * It provides a function to play a trailer and handles rendering the modal itself,
 * making it globally available throughout the application.
 */
export const TrailerProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the YouTube key of the video that should be currently playing.
  // If it's 'null', the modal is closed. If it has a key, the modal is open.
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  /**
   * Fetches the trailer key for a given media item and opens the modal.
   * @param item The MediaContent object for which to play the trailer.
   */
  const playTrailer = async (item: MediaContent) => {
    // Ensure the media type is supported before making an API call.
    if (item.media_type === "movie" || item.media_type === "tv") {
      const key = await fetchTrailerKey(item.media_type, item.id);
      if (key) {
        // If a trailer key is found, update the state to open the modal with that video.
        setTrailerKey(key);
      } else {
        // If no official trailer is found, play a fallback video as a fun surprise.
        console.warn(
          `No official trailer found for "${
            item.title || item.name
          }", playing fallback.`
        );
        setTrailerKey("dQw4w9WgXcQ"); // The key for the fallback video.
      }
    } else {
      // Handle unsupported media types.
      console.warn(
        `Cannot play trailer for media type "${item.media_type}". Only movie and tv are supported.`
      );
      setTrailerKey("dQw4w9WgXcQ");
    }
  };

  /**
   * Closes the trailer modal by resetting the trailerKey state to null.
   */
  const closeTrailer = () => {
    setTrailerKey(null);
  };

  return (
    <TrailerContext.Provider value={{ playTrailer }}>
      {children}
      {/* Conditionally render the TrailerModal.
          It will only be displayed on the screen if 'trailerKey' is not null. */}
      {trailerKey && (
        <TrailerModal youtubeKey={trailerKey} onClose={closeTrailer} />
      )}
    </TrailerContext.Provider>
  );
};

/**
 * A custom hook for easily accessing the TrailerContext from any component.
 */
export const useTrailer = () => {
  const context = useContext(TrailerContext);
  if (context === undefined) {
    throw new Error("useTrailer must be used within a TrailerProvider");
  }
  return context;
};

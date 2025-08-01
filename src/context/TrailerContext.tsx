// src/context/TrailerContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { fetchTrailerKey } from "@/lib/api";
import TrailerModal from "@/components/TrailerModal";
import { MediaContent } from "../../types";

interface TrailerContextType {
  playTrailer: (item: MediaContent) => void;
}

const TrailerContext = createContext<TrailerContextType | undefined>(undefined);

export const TrailerProvider = ({ children }: { children: ReactNode }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const playTrailer = async (item: MediaContent) => {
    if (item.media_type === "movie" || item.media_type === "tv") {
      const key = await fetchTrailerKey(item.media_type, item.id);
      if (key) {
        setTrailerKey(key);
      } else {
        console.warn(
          `No official trailer found for "${
            item.title || item.name
          }", playing fallback.`
        );
        setTrailerKey("dQw4w9WgXcQ");
      }
    } else {
      console.warn(
        `Cannot play trailer for media type "${item.media_type}". Only movie and tv are supported.`
      );
      setTrailerKey("dQw4w9WgXcQ");
    }
  };

  const closeTrailer = () => {
    setTrailerKey(null);
  };

  return (
    <TrailerContext.Provider value={{ playTrailer }}>
      {children}
      {trailerKey && (
        <TrailerModal youtubeKey={trailerKey} onClose={closeTrailer} />
      )}
    </TrailerContext.Provider>
  );
};

export const useTrailer = () => {
  const context = useContext(TrailerContext);
  if (context === undefined) {
    throw new Error("useTrailer must be used within a TrailerProvider");
  }
  return context;
};

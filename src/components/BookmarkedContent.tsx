import { useEffect, useState } from "react";
import { MediaContent } from "../../types";
import MediaGrid from "@/components/MediaGrid";
import { useBookmarks } from "@/context/BookmarkContext";
import { fetchMediaDetails } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const BookmarkedContent = () => {
  const { bookmarkedTmdbIds, isLoading: areBookmarksLoading } = useBookmarks();
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (areBookmarksLoading) {
      return;
    }

    const fetchBookmarkedDetails = async () => {
      if (bookmarkedTmdbIds.length === 0) {
        setBookmarkedItems([]);
        setIsLoading(false);
        return;
      }

      try {
        const promises = bookmarkedTmdbIds.map((id) =>
          fetchMediaDetails("movie", id)
            .catch(() => fetchMediaDetails("tv", id))
            .catch(() => {
              return null;
            })
        );

        const results = await Promise.all(promises);

        const validItems = results.filter(
          (item): item is MediaContent => item !== null
        );
        setBookmarkedItems(validItems);
      } catch (error) {
        console.error(error);
        setBookmarkedItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedDetails();
  }, [bookmarkedTmdbIds, areBookmarksLoading]);

  if (isLoading || areBookmarksLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MediaGrid
      initialData={bookmarkedItems}
      pageTitle="Bookmarked Shows"
      searchPlaceholder="Search in your bookmarked shows"
    />
  );
};

export default BookmarkedContent;

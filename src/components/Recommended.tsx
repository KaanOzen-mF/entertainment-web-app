import { MediaContent } from "../../types";
import ShowCard from "./ShowCard";

/**
 * Defines the props accepted by the Recommended component.
 */
type Props = {
  data: MediaContent[]; // An array of media content to be displayed.
};

/**
 * A component that displays a grid of recommended movies and TV shows.
 * It's typically used on the home page for non-trending content.
 */
const Recommended = ({ data }: Props) => {
  return (
    <section className="mt-6">
      <h1 className="text-xl font-light text-white mb-6">
        Recommended for you
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:mr-4">
        {/* Map over the provided 'data' array to render a ShowCard for each item. */}
        {data.map((item) => (
          // The 'key' prop is essential for React to efficiently update lists.
          // We use the unique TMDB 'id' as the key.
          <ShowCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Recommended;

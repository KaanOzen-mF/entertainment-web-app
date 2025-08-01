"use client";

/**
 * Defines the props accepted by the TrailerModal component.
 */
type Props = {
  youtubeKey: string; // The unique key of the YouTube video to be embedded.
  onClose: () => void; // A callback function to close the modal.
};

/**
 * A modal component that displays an embedded YouTube video player.
 * It appears as an overlay on top of the page content.
 */
const TrailerModal = ({ youtubeKey, onClose }: Props) => {
  return (
    // 1. Overlay Container: A semi-transparent background that covers the entire screen.
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center"
      onClick={onClose}
    >
      {/* 2. Modal Content Wrapper */}
      {/* - 'onClick={(e) => e.stopPropagation()}': This is crucial. It prevents a click
            inside the modal from bubbling up to the overlay and closing the modal accidentally.
      */}
      <div
        className="relative w-full max-w-3xl aspect-video bg-black rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3. Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-red transition-colors cursor-pointer"
        >
          &times;
        </button>

        {/* 4. YouTube Iframe Player */}
        {/* - The 'src' is constructed using the provided 'youtubeKey'.
            - '?autoplay=1': Makes the video play automatically when the modal opens.
            - '&rel=0': Prevents showing related videos from other channels at the end.
        */}
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;

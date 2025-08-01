"use client";

type Props = {
  youtubeKey: string;
  onClose: () => void;
};

const TrailerModal = ({ youtubeKey, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl aspect-video bg-black rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-red transition-colors cursor-pointer"
        >
          &times;
        </button>

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

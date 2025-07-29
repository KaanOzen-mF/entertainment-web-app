// src/components/LoadingSpinner.tsx

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full pt-80">
      <div className="w-12 h-12 border-4 border-lightBlue border-t-red rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

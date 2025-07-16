// src/components/SearchInput.tsx
"use client";

import Image from "next/image";

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-4 w-full mb-6 mt-8">
      <Image
        src="/assets/icon-search.svg"
        alt="Search"
        width={24}
        height={24}
        className="md:w-8 md:h-8"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent w-full text-white text-base md:text-text2 font-light border-b-2 border-transparent focus:border-lightBlue outline-none transition-colors"
      />
    </div>
  );
};

export default SearchInput;

"use client";

import Image from 'next/image';
import SearchImage from "@/assets/icons/searchIcon.svg";
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="max-w-[640px] mx-auto w-full">
        <div className="relative flex items-center border-b-2 sm:border-b-2 md:border-b-2 lg:border-b-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pr-[55px] py-[9px] text-lg text-black-700 sm:py-[9px] md:py-[13px] lg:py-[22px] text-2xl"
          />
          <button className="absolute right-2 h-full w-10 flex items-center justify-center cursor-pointer sm:w-10 md:w-10 lg:w-15" onClick={handleSearch}>
            <Image src={SearchImage} alt="검색이미지" />
          </button>
        </div>
      </div>
    </>
  );
}

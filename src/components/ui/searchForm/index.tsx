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
      <div className="pt-20 max-w-[680px] mx-auto w-full px-5 sm:pt-20 md:pt-22 lg:pt-22">
        <div className="relative flex items-center border-b-2 sm:border-b-2 md:border-b-2 lg:border-b-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pr-10 py-[9px] text-lg text-black-700 sm:py-[9px] text-lg md:py-[13px] text-xl lg:py-[22px] text-2xl"
          />
          <button className="absolute right-2" onClick={handleSearch}>
            <Image src={SearchImage} alt="검색이미지" />
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from 'next/image';
import SearchImage from "@/assets/icons/searchIcon.svg";
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[640px] mx-auto w-full">
      <div className="relative flex items-center border-b-2 sm:border-b-2 md:border-b-2 lg:border-b-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력해주세요."
          className="w-full pr-[55px] py-[13px] lg:py-[25px] text-lg md:text-xl lg:text-2xl text-black-700"
        />
        <button
          type="submit"
          className="absolute right-2 h-full w-10 flex items-center justify-center cursor-pointer sm:w-10 md:w-10 lg:w-15"
        >
          <Image
            src={SearchImage}
            alt="검색 돋보기 아이콘"
            className="w-[13px] h-[13px] md:w-5 md:h-5 lg:w-9 lg:h-9"
          />
        </button>
      </div>
    </form>
  );
}

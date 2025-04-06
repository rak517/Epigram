"use client";

import { useEffect, useState } from 'react';
import MainHeader from "@/components/ui/header/MainHeader";
import SearchForm from '@/components/ui/searchForm';
import SearchSave from '@/components/ui/searchSave';

export default function SearchPage() {

  const [results, setResults] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    setResults([]); // 현재는 결과 없음 처리

    const updated = [query, ...recentSearches.filter(item => item !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClear = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>

      <MainHeader />
      <SearchForm onSearch={handleSearch} />
      <SearchSave searches={recentSearches} onClear={handleClear} />

      <div className="max-w-[680px] mx-auto w-full px-5 mt-4">
        {results.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {results.map((item, index) => (
              <li key={index} className="py-2">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">검색 결과가 없습니다.</p>
        )}
      </div>

    </>
  );
}

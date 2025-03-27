"use client";

import { useState } from 'react';
import MainHeader from "@/components/ui/header/MainHeader";
import SearchForm from '@/components/ui/searchForm';

export default function SearchPage() {
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // 여기에 API 호출 또는 검색 로직을 추가할 수 있습니다.
    // 현재는 데이터가 없으므로 결과를 빈 배열로 업데이트합니다.
    setResults([]);
  };

  return (
    <>

      <MainHeader />
      <SearchForm onSearch={handleSearch} />

      <div className="max-w-[680px] mx-auto w-full px-5 mt-4">
        <p className="p-4">
          검색어 저장 컴포넌트 적용 예정
        </p>
        <p className="p-4">
          하단 리스트 컴포넌트 적용 예정
        </p>
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

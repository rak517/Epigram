'use client';

import { useRouter } from 'next/navigation';

import type { RefObject } from 'react';
import type { JSX } from 'react';
import { Iropke } from "@/fonts";

interface Epigram {
  id: number;
  content: string;
  author: string;
  referenceTitle: string | null;
  referenceUrl: string | null;
  writerId: number;
  likeCount: number;
  tags: { id: number; name: string }[];
  isLiked?: boolean;
}

interface SearchListProps {
  results: Epigram[];
  keyword: string;
  hasMore: boolean;
  observerRef: RefObject<HTMLDivElement | null>;
}

function highlightKeyword(text: string, keyword: string): JSX.Element {
  if (!keyword) return <>{text}</>;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={index} className="text-illust-blue">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export default function SearchList({ results, keyword, hasMore, observerRef }: SearchListProps) {
  const router = useRouter();

  const goToDetail = (id: number) => {
    router.push(`/epigrams/${id}`);
  };

  return (
    <div className="max-w-[680px] mx-auto w-full px-5 mt-4">
      {results.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {results.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="py-4 md:py-4 xl:py-6 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => goToDetail(item.id)}
            >
              <p className={`${Iropke.className} text-black-600 mb-1 sm:mb-1 md:mb-2 lg:mb-6 text-lg md:text-lg lg:text-xl leading-snug`}>
                {highlightKeyword(item.content, keyword)}
              </p>
              <p className={`${Iropke.className} text-blue-400 mb-2 md:mb-2 lg:mb-4 text-lg md:text-lg lg:text-xl`}>
                - {item.author} -
              </p>

              <div className="flex flex-wrap gap-3 justify-end">
                {item.tags.map(tag => (
                  <span key={tag.id} className="text-blue-400 text-lg md:text-lg lg:text-xl">
                    #{highlightKeyword(tag.name, keyword)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10 md:mt-10 lg:mt-20">검색 결과가 없습니다.</p>
      )}

      {hasMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
}

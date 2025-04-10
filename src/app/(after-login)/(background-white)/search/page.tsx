"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import MainHeader from "@/components/ui/header/MainHeader";
import SearchForm from "@/components/ui/searchForm";
import SearchSave from "@/components/ui/searchSave";
import { getEpigrams } from "@/apis/epigram";
import SearchList from "@/components/ui/searchList";

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

export default function SearchPage() {
  const router = useRouter();

  const [results, setResults] = useState<Epigram[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false); // 클라이언트 여부 체크

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 결과 더 불러오기
  const fetchMore = useCallback(
    async (query: string, currentCursor: number, isNewSearch = false) => {
      try {
        const response = await getEpigrams({
          keyword: query,
          limit: 10,
          cursor: currentCursor,
        });

        if (response?.list) {
          setResults(prev => (isNewSearch ? response.list : [...prev, ...response.list]));
          setCursor(response.nextCursor ?? 0);
          setHasMore(response.list.length > 0);
        }
      } catch (error) {
        console.error("무한스크롤 실패:", error);
      }
    },
    []
  );

  // 클라이언트 여부 체크
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 새로고침 시 URL에서 검색어 받아서 자동 검색
  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
      fetchMore(q, 0, true); 
    }
  }, [isClient, fetchMore]);

  // 검색 실행 함수
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCursor(0);
    setResults([]);

    // 검색어 URL에 반영
    const params = new URLSearchParams(window.location.search);
    params.set("q", query);
    router.push(`?${params.toString()}`);

    // 최근 검색어 업데이트
    const updated = [query, ...recentSearches.filter(item => item !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    await fetchMore(query, 0, true);
  };

  // IntersectionObserver로 무한 스크롤
  useEffect(() => {
    if (!hasMore || !searchQuery) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMore(searchQuery, cursor);
        }
      },
      { threshold: 1.0 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [cursor, fetchMore, searchQuery, hasMore]);

  const handleClear = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      <MainHeader />
      <SearchForm onSearch={handleSearch} />
      <SearchSave searches={recentSearches} onClear={handleClear} />
      <SearchList
        results={results}
        keyword={searchQuery}
        hasMore={hasMore}
        observerRef={observerRef}
      />
    </>
  );
}

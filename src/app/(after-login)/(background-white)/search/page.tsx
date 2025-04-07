"use client";
import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import MainHeader from "@/components/ui/header/MainHeader";
import SearchForm from '@/components/ui/searchForm';
import SearchSave from '@/components/ui/searchSave';
import { getEpigrams } from '@/apis/epigram';
import { Iropke } from '@/fonts';
import SearchList from '@/components/ui/searchList';

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
  const [results, setResults] = useState<Epigram[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 검색 실행
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCursor(0);
    setResults([]);

    const updated = [query, ...recentSearches.filter(item => item !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    await fetchMore(query, 0, true);
  };

  // 더 불러오기 함수
  const fetchMore = useCallback(async (query: string, currentCursor: number, isNewSearch = false) => {
    try {
      const response = await getEpigrams({
        keyword: query,
        limit: 10,
        cursor: currentCursor,
      });

      if (response?.list) {
        setResults(prev => isNewSearch ? response.list : [...prev, ...response.list]);
        setCursor(response.nextCursor ?? 0);
        setHasMore(response.list.length > 0);
      }
    } catch (error) {
      console.error("무한스크롤 실패:", error);
    }
  }, []);

  // IntersectionObserver
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

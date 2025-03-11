"use client"; 

import React, { useState } from 'react';
import SideBar from '../components/ui/sideBar'

const TestPage = () => {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'search'>('feed');

  // 탭 선택 시 상태 업데이트
  const handleTabSelect = (tab: 'feed' | 'search') => {
    setSelectedTab(tab);
    console.log(`선택된 탭: ${tab}`); // 콘솔에 출력하여 확인
  };

  return (
    <div>
      <h1>테스트 페이지</h1>
      <p>현재 선택된 탭: {selectedTab}</p>

      {/* 사이드바 컴포넌트에 onSelectedTab 전달 */}
      <SideBar onSelectedTab={handleTabSelect} />
    </div>
  );
};

export default TestPage;

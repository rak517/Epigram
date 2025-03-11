import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SideBarProps {
  onSelectedTab: (tab: 'feed' | 'search') => void;
}

export default function SideBar({ onSelectedTab }: SideBarProps) {
  const [isopen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isopen);

  const handleTabSelect = (tab: 'feed' | 'search') => {
    onSelectedTab(tab); // 상위 컴포넌트로 선택된 탭 전달
    setIsOpen(false); // 사이드바 닫기
  };

  return (
    <React.Fragment>
      {/* 햄버거 버튼 */}
      <button className='flex h-6 w-6 items-center justify-center' onClick={toggleSidebar}>
        <Image src='/sideBar.svg' alt='sideBarIcon' width={18} height={12} />
      </button>

      {/* 오버레이 */}
      {isopen && <div className='absolute inset-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onClick={toggleSidebar}></div>}

      {/* 사이드바 */}
      <motion.div
        initial={{ x: '-100%' }} // 사이드바 시작 위치
        animate={{ x: isopen ? 0 : '-100%' }} // 사이드바가 열리고 닫힐 때의 애니메이션
        transition={{ type: 'spring', stiffness: 20 }}
        className='fixed top-0 bottom-0 left-0 w-55 bg-blue-100 text-black'
      >
        <div className='w-55'>
          <div className='flex h-12.5 w-full items-center justify-center border-b border-gray-100'>
            <div className='flex h-6 w-47 justify-end'>
              <Image src='/X.svg' alt='xIcon' width={24} height={24} onClick={toggleSidebar} />
            </div>
          </div>
        </div>
        <div className='h-37'>
          <div className='ml-5 flex h-18.5 items-center' onClick={() => handleTabSelect('feed')}>
            <p className='h-6.5 w-7'>피드</p>
          </div>
          <div className='ml-5 flex h-18.5 items-center' onClick={() => handleTabSelect('search')}>
            <p className='h-6.5 w-7'>검색</p>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import sideBarIcon from '@/assets/icons/sideBar.svg';
import closeIcon from '@/assets/icons/X.svg';

export interface SideBarProps {
  items: { label: string; value: string }[]; // 메뉴를 동적으로 받기
  onSelect: (value: string) => void; // 메뉴 선택 시 실행될 함수
  isOpen?: boolean;
}

export default function SideBar({ items, onSelect, isOpen = false }: SideBarProps) {
  const [isopen, setIsOpen] = useState(isOpen);
  const toggleSidebar = () => setIsOpen(!isopen);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {/* 햄버거 버튼 */}
      <button className="flex h-6 w-6 items-center justify-center" onClick={toggleSidebar}>
        <Image src={sideBarIcon} alt="sideBarIcon" width={18} height={12} />
      </button>

      {/* 오버레이 */}
      {isopen && (
        <div className="absolute inset-0 bg-black bg-opacity-60" onClick={toggleSidebar}></div>
      )}

      {/* 사이드바 */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isopen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 20 }}
        className="fixed top-0 bottom-0 left-0 w-55 bg-blue-100 text-black"
      >
        <div className="w-55">
          {/* 닫기 버튼 */}
          <div className="flex h-12.5 w-full items-center justify-center border-b border-gray-100">
            <div className="flex h-6 w-47 justify-end">
              <Image src={closeIcon} alt="xIcon" width={24} height={24} onClick={toggleSidebar} />
            </div>
          </div>

          {/* 동적으로 메뉴 렌더링 */}
          <div className="h-37">
            {items.map((item) => (
              <div
                key={item.value}
                className="ml-5 flex h-18.5 items-center cursor-pointer"
                onClick={() => {
                  onSelect(item.value);
                  setIsOpen(false);
                }}
              >
                <p className="h-6.5 w-7">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

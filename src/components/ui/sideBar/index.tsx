import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import closeIcon from '@/assets/icons/X.svg';
import Link from 'next/link';

export interface SideBarProps {
  items: { label: string; value: string }[]; // 메뉴를 동적으로 받기
  isOpen?: boolean;
}

export default function SideBar({ items, isOpen = false }: SideBarProps) {
  const [isopen, setIsOpen] = useState(isOpen);
  const toggleSidebar = () => setIsOpen(!isopen);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 */}
      {isopen && <div className='absolute inset-0 bg-black opacity-60' onClick={toggleSidebar}></div>}

      {/* 사이드바 */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isopen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 20 }}
        className='fixed top-0 bottom-0 left-0 z-20 w-55 bg-blue-100 text-black'
      >
        <div className='w-55'>
          {/* 닫기 버튼 */}
          <div className='flex h-13 w-full items-center justify-center border-b border-gray-100'>
            <div className='flex h-6 w-47 justify-end'>
              <Image src={closeIcon} alt='xIcon' width={24} height={24} onClick={toggleSidebar} />
            </div>
          </div>

          {/* 동적으로 메뉴 렌더링 */}
          <div className='flex h-37 flex-col gap-2.5 px-3 py-2'>
            {items.map((item) => (
              <Link
                key={item.value}
                className='cursor-pointer items-center rounded-2xl px-4 py-6 transition-all duration-300 ease-in-out hover:translate-x-1 hover:scale-[1.02] hover:bg-gray-100 hover:shadow-md active:scale-[0.98]'
                href={item.value}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

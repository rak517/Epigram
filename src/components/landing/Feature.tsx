'use client';

import dynamic from 'next/dynamic';
import { useScroll, useTransform } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import feature_img_1 from '@/assets/landings/img_Desktop_landing01.svg';
import feature_img_2 from '@/assets/landings/img_Desktop_landing02.svg';
import feature_img_3 from '@/assets/landings/img_Desktop_landing03.svg';
import { Ref, useRef } from 'react';
import { cn } from '@/utils/cn';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });

interface FEATURE_CONTENT {
  point: number;
  title: string;
  description: string;
  image: StaticImageData;
  imageClassName?: string;
  reverse?: boolean;
}

const FEATURE_CONTENTS: FEATURE_CONTENT[] = [
  {
    point: 1,
    title: '명언이나 글귀,\n토막 상식을 공유해 보세요.',
    description: '나만 알던 소중한 글들을 다른 사람들에게 전파하세요.',
    image: feature_img_1,
  },
  {
    point: 2,
    title: '감정 상태에 따라,\n알맞은 위로를 받을 수 있어요.',
    description: '태그를 통해 글을 모아 볼 수 있어요.',
    image: feature_img_2,
    reverse: true,
  },
  {
    point: 3,
    title: '내가 요즘 어떤 감정 상태인지\n통계로 한눈에 볼 수 있어요',
    description: '감정 달력으로 내 마음에 담긴 감정을 확인해보세요',
    image: feature_img_3,
  },
];

interface FeatureProps {
  ref?: Ref<HTMLDivElement>;
}

const getTopPosition = (index: number) => {
  const BASE_TOP = 10;
  const INCREMENT = 5;
  return `${BASE_TOP + index * INCREMENT}rem`;
};

export default function Feature({ ref }: FeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end 80%'],
  });

  const scaleFactors = [useTransform(scrollYProgress, [0, 0.33], [1, 0.96]), useTransform(scrollYProgress, [0.33, 0.66], [1, 0.98]), useTransform(scrollYProgress, [0.66, 1], [1, 1])];

  const opacityFactors = [useTransform(scrollYProgress, [0, 0.33], [1, 0.4]), useTransform(scrollYProgress, [0.33, 1], [1, 1]), useTransform(scrollYProgress, [0.66, 1], [1, 1])];

  const zIndexValues = [
    useTransform(scrollYProgress, [0, 0.33, 0.34], [30, 20, 10]),
    useTransform(scrollYProgress, [0.32, 0.33, 0.66, 0.67], [40, 30, 30, 10]),
    useTransform(scrollYProgress, [0.65, 0.66, 1], [50, 30, 30]),
  ];

  const yValues = [useTransform(scrollYProgress, [0, 0.33], [0, 0]), useTransform(scrollYProgress, [0.33, 0.66], [0, 0]), useTransform(scrollYProgress, [0.66, 1], [0, 0])];

  return (
    <section ref={containerRef} className='relative mt-20 grid place-items-center px-5 py-5 md:px-15 lg:px-20'>
      <div className='relative flex w-full max-w-[1200px] flex-col gap-10' ref={ref}>
        {FEATURE_CONTENTS.map((item, index) => (
          <MotionDiv
            key={item.point}
            className={cn('sticky overflow-hidden rounded-xl bg-white shadow-lg lg:flex lg:h-[400px] lg:max-w-[1200px]', item.reverse ? '' : 'lg:flex-row-reverse')}
            style={{
              top: getTopPosition(index),
              scale: scaleFactors[index],
              opacity: opacityFactors[index],
              zIndex: zIndexValues[index],
              y: yValues[index],
            }}
          >
            <div className='flex flex-col justify-end gap-10 p-10 lg:w-[48%] lg:pt-[7.5rem] lg:pl-20'>
              <h3 className='text-black-950 text-2xl font-bold whitespace-pre-wrap lg:text-3xl'>{item.title}</h3>
              {item.description && <p className='text-lg text-blue-600 lg:text-xl'>{item.description}</p>}
            </div>
            <figure className={cn('lg:flex lg:w-[52%] lg:items-end', item.imageClassName)}>
              <Image src={item.image} alt={item.title} className='h-auto w-full' />
            </figure>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

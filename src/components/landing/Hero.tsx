import { Iropke } from '@/fonts';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import arrow from '@/assets/icons/ic_up.svg';
import Link from 'next/link';
import { easeInOut } from 'motion';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() =>
  import('framer-motion').then((mod) => ({
    default: mod.motion.div,
  })),
);

const MotionLink = dynamic(() =>
  import('framer-motion').then((mod) => ({
    default: mod.motion(Link),
  })),
);

const TYPING_SPEED = 100;
const HERO_TEXT = `나만 갖고 있기엔\n아까운 글이 있지 않나요?`;
const HERO_SUBTEXT = '다른 사람들과 감정을 공유해보세요.';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { ease: easeInOut } },
};

interface HeroProps {
  handleScroll: () => void;
}

export default function Hero({ handleScroll }: HeroProps) {
  const typedText = useTypingEffect(HERO_TEXT, TYPING_SPEED);
  return (
    <MotionDiv
      initial='initial'
      whileInView='animate'
      variants={containerVariants}
      className='after:zigzag px relative flex h-[672px] flex-col items-center justify-center bg-[repeating-linear-gradient(to_bottom,white_0px,white_24px,#f2f2f2_25px)] md:h-[674px] lg:h-[960px]'
    >
      <div className='flex flex-col items-center gap-6 md:gap-8 lg:gap-12'>
        <div className={cn('flex flex-col items-center gap-2 md:gap-6 lg:gap-10', Iropke.className)}>
          <h2 className='text-black-500 h-[90px] text-center text-2xl whitespace-pre-wrap md:text-3xl lg:text-4xl'>{typedText}</h2>
          <span className='text-black-300 text-md md:text-xl'>{HERO_SUBTEXT}</span>
        </div>
        <MotionLink
          variants={childVariants}
          href='/epigrams'
          className='bg-black-500 flex h-12 w-[112px] items-center justify-center rounded-xl px-4 text-lg font-semibold text-blue-100 lg:h-16 lg:w-[286px] lg:text-xl'
        >
          시작하기
        </MotionLink>
      </div>

      <div className='absolute bottom-18 flex cursor-pointer flex-col items-center gap-1' onClick={handleScroll}>
        <span className='text-xs font-semibold text-blue-400 md:text-lg'>더 알아보기 </span>
        <Image src={arrow} width={24} height={24} alt='아래로 스크롤' priority />
      </div>
    </MotionDiv>
  );
}

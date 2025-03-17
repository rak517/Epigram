import Image from 'next/image';
import landing_logo from '@/assets/landings/landing_logo.svg';
import { easeInOut } from 'motion';
import { motion } from 'motion/react';
import Link from 'next/link';

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

export default function Footer() {
  const MotionLink = motion.create(Link);

  return (
    <motion.footer
      initial='initial'
      whileInView='animate'
      variants={containerVariants}
      className='after:zigzag-top relative mt-25 flex h-[600px] items-center justify-center bg-[repeating-linear-gradient(to_bottom,white_0px,white_24px,#f2f2f2_25px)] md:h-[528px] lg:h-[960px]'
    >
      <div className='flex flex-col items-center justify-center gap-12'>
        <Image src={landing_logo} alt='로고' />
        <MotionLink
          variants={childVariants}
          href='/epigrams'
          className='bg-black-500 flex h-12 w-[112px] items-center justify-center rounded-xl px-4 text-lg font-semibold text-blue-100 lg:h-16 lg:w-[286px] lg:text-xl'
        >
          시작하기
        </MotionLink>
      </div>
    </motion.footer>
  );
}

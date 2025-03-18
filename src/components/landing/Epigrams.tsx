import card_1 from '@/assets//landings/card_1.png';
import card_2 from '@/assets//landings/card_2.png';
import card_3 from '@/assets//landings/card_3.png';
import { Iropke } from '@/fonts';
import { cn } from '@/utils/cn';
import { easeInOut, motion } from 'motion/react';
import Image, { StaticImageData } from 'next/image';

interface EPIGRAM_CONTENT {
  image: StaticImageData;
  title: string;
  tag: string[];
}

const EPIGRAM_CONTENT: EPIGRAM_CONTENT[] = [
  {
    image: card_1,
    title: '인용 에피그램',
    tag: ['#나아가야할때', '#꿈을이루고싶을때'],
  },
  {
    image: card_2,
    title: '인용 에피그램',
    tag: ['#나아가야할때', '#꿈을이루고싶을때'],
  },
  {
    image: card_3,
    title: '인용 에피그램',
    tag: ['#나아가야할때', '#꿈을이루고싶을때'],
  },
];

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      ease: easeInOut,
    },
  }),
};

export default function Epigrams() {
  return (
    <section className='relative mx-auto mt-20 flex flex-col items-center gap-10 px-5 text-center'>
      <h3 className='text-black-950 text-2xl font-bold lg:text-3xl'>
        사용자들이 직접
        <br /> 인용한 에피그램들
      </h3>
      {EPIGRAM_CONTENT.map((item, index) => (
        <motion.li key={index} custom={index} variants={cardVariants} initial='initial' whileInView='animate' className='max-w-[640px] list-none overflow-hidden rounded-lg'>
          <figure>
            <Image src={item.image} alt={item.title} />
          </figure>
          <div className='flex justify-end gap-4'>
            {item.tag.map((item, index) => (
              <span className={cn('text-md mr-2 font-light text-blue-400 md:text-lg lg:text-2xl', Iropke.className)} key={index}>
                {item}
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </section>
  );
}

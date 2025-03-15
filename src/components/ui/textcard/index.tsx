import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { Iropke } from '@/fonts';
import dropdown_icon from '@/assets/icons/dropdown_icon.svg';
import Image from 'next/image';

const textCardVariants = cva(`border border-line-100 border-solid rounded-xl font-normal ${Iropke.className}`, {
  variants: {
    variant: {
      fixedHeight: '',
      variableHeight: 'min-h-[106px]',
    },

    width: {
      w286: 'w-[286px]',
      w294: 'w-[294px]',
      w312: 'w-[312px]',
      w366: 'w-[366px]',
      w384: 'w-[384px]',
      w472: 'w-[472px]',
      w540: 'w-[540px]',
      w585: 'w-[585px]',
      w640: 'w-[640px]',
      w744: 'w-[744px]',
    },

    fixedSize: {
      w294h180: 'w-[294px] h-[180px]',
      w312h140: 'w-[312px] h-[140px]',
      w585h259: 'w-[585px] h-[259px]',
    },

    tagPosition: {
      topLeft: '',
      bottomRight: '',
    },

    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
  },
});

type DropdownSizeType = 'wh24' | 'wh36';

const getDropdownSize = (size: DropdownSizeType | undefined) => {
  switch (size) {
    case 'wh24':
      return { width: 24, height: 24 };
    case 'wh36':
      return { width: 36, height: 36 };
    default:
      return { width: 24, height: 24 };
  }
};

interface TextCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof textCardVariants> {
  isDropdown?: boolean;
  cardContent?: string;
  author?: string;
  tags?: string[];
  maxTags?: number; // 최대 표시할 태그 수
  dropdownSize?: DropdownSizeType;
}

export default function TextCard({ isDropdown, cardContent, author, tags = [], maxTags = 2, variant, width, fixedSize, fontSize, tagPosition, dropdownSize, className, ...props }: TextCardProps) {
  let fixedSizeClass = '';
  if (fixedSize === 'w294h180') fixedSizeClass = 'w-[294px] h-[180px]';
  else if (fixedSize === 'w312h140') fixedSizeClass = 'w-[312px] h-[140px]';
  else if (fixedSize === 'w585h259') fixedSizeClass = 'w-[585px] h-[259px]';

  const displayTags = tags.length > maxTags ? [...tags.slice(0, maxTags), '...'] : tags;

  // 드롭다운 아이콘 사이즈
  const iconSize = getDropdownSize(dropdownSize);

  if (fixedSize) {
    return (
      <div
        className={`${textCardVariants({
          variant,
          width,
          fontSize,
          tagPosition,
          className,
        })} relative mx-auto`}
        {...props}
      >
        <div className={`${fixedSizeClass} relative`}>
          <div className='p-[22px]'>
            <div className='line-clamp-4'>{cardContent}</div>

            {author && <div className='absolute right-5 bottom-5 text-blue-400'>- {author} -</div>}
          </div>
          {isDropdown && (
            <div className='absolute top-4 right-4 cursor-pointer'>
              <Image src={dropdown_icon} alt='드롭다운 메뉴 아이콘' width={iconSize.width} height={iconSize.height} />
            </div>
          )}
        </div>
        {tags.length > 0 && (
          <div
            className={`${tagPosition === 'topLeft' ? 'absolute left-0' : 'absolute right-0 text-right'} flex flex-row flex-wrap text-blue-400`}
            style={{
              top: tagPosition === 'topLeft' ? `calc(-1.5em - 12px)` : undefined,
              bottom: tagPosition === 'bottomRight' ? `calc(-1.5em - 12px)` : undefined,
            }}
          >
            {displayTags.map((tag, index) => (
              <span key={index} className='px-2 py-1 text-blue-400'>
                {tag === '...' ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${textCardVariants({
        variant,
        width,
        fixedSize,
        fontSize,
        tagPosition,
        className,
      })} relative mx-auto`}
      {...props}
    >
      <div>
        <div className='p-[22px]'>
          <div className='mb-4 line-clamp-4'>{cardContent}</div>

          {author && <div className='text-right text-blue-400'>- {author} -</div>}
        </div>
        {isDropdown && (
          <div className='absolute top-4 right-4 cursor-pointer'>
            <Image src={dropdown_icon} alt='드롭다운 메뉴 아이콘' width={iconSize.width} height={iconSize.height} />
          </div>
        )}
      </div>
      {tags.length > 0 && (
        <div
          className={`${tagPosition === 'topLeft' ? 'absolute left-0' : 'absolute right-0 text-right'} text-blue-400`}
          style={{
            top: tagPosition === 'topLeft' ? `calc(-1.5em - 12px)` : undefined,
            bottom: tagPosition === 'bottomRight' ? `calc(-1.5em - 12px)` : undefined,
          }}
        >
          {displayTags.map((tag, index) => (
            <span key={index} className='px-2 py-1 text-blue-400'>
              {tag === '...' ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

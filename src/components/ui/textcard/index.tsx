import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { Iropke } from '@/fonts';
import DropdownMenu from '../DropdownMenu';
import { Tag } from '@/types';

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

    //높이가 변하지 않는 text card
    fixedSize: {
      w294h180: 'w-[294px] h-[180px]',
      w312h140: 'w-[312px] h-[140px]',
      w585h259: 'w-[585px] h-[259px]',
    },

    tagPosition: {
      topLeft: '',
      bottomRight: '',
    },

    isBackground: {
      true: 'bg-[linear-gradient(white_90%,#f2f2f2)] bg-[length:100%_20px] bg-repeat shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'fixedHeight',
    tagPosition: 'bottomRight',
    isBackground: true,
  },
});

interface TextCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof textCardVariants> {
  isDropdown?: boolean;
  cardContent?: string;
  author?: string;
  tags?: Tag[];
  maxTags?: number; // 최대 표시할 태그 수
}

export default function TextCard({ isDropdown, cardContent, author, tags = [], maxTags = 2, variant, width, fixedSize, tagPosition, isBackground, className, ...props }: TextCardProps) {
  let fixedSizeClass = '';
  if (fixedSize === 'w294h180') fixedSizeClass = 'w-[294px] h-[180px]';
  else if (fixedSize === 'w312h140') fixedSizeClass = 'w-[312px] h-[140px]';
  else if (fixedSize === 'w585h259') fixedSizeClass = 'w-[585px] h-[259px]';

  const displayTags = tags.length > maxTags ? [...tags.slice(0, maxTags), { id: -1, name: '...' }] : tags;

  if (fixedSize) {
    return (
      <div
        className={`${textCardVariants({
          variant,
          width,
          tagPosition,
          isBackground,
          className,
        })} relative`}
        {...props}
      >
        <div className={`${fixedSizeClass} relative`}>
          <div className='p-[22px]'>
            <div className='line-clamp-4'>{cardContent}</div>

            {author && <div className='absolute right-5 bottom-5 text-blue-400'>- {author} -</div>}
          </div>
          {isDropdown && (
            <div className='absolute right-0' style={{ top: `calc(-1.5em - 12px)` }}>
              <DropdownMenu />
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
            {displayTags.map((tag) => (
              <span key={tag.id} className='space-x-2 py-1 text-blue-400'>
                {tag.name === '...' ? tag.name : `#${tag.name}`}
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
        tagPosition,
        isBackground,
        className,
      })} relative`}
      {...props}
    >
      <div>
        <div className='p-[22px]'>
          <div className='mb-4 line-clamp-4'>{cardContent}</div>

          {author && <div className='text-right text-blue-400'>- {author} -</div>}
        </div>
        {isDropdown && (
          <div className='absolute right-0' style={{ top: `calc(-1.5em - 12px)` }}>
            <DropdownMenu />
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
          {displayTags.map((tag) => (
            <span key={tag.id} className='space-x-2 py-1 text-blue-400'>
              {tag.name === '...' ? tag.name : `#${tag.name}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

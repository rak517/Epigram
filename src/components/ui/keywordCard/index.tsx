import { Iropke, Pretendard } from '@/fonts';

interface KeywordCardProps {
  text: string;
  author: string;
  hashtags: string[];
  inputText: string;
}

const KeywordCard = ({ text, author, hashtags, inputText }: KeywordCardProps) => {
  const highlightText = (content: string) => {
    if (!inputText) return content;

    const regex = new RegExp(`(${inputText})`, 'gi'); // 입력값과 일치하는 부분 찾기
    return content.split(regex).map((part, index) =>
      part.toLowerCase() === inputText.toLowerCase() ? (
        <span key={index} className='text-[rgba(81,149,238,1)]'>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className='h-37 w-full border-b border-gray-100 p-4 pt-4 pr-6 pb-4 pl-6 md:h-[152px] lg:h-[176px] lg:p-6'>
      <div className='flex h-29 flex-col justify-between md:h-[120px] lg:h-[128px]'>
        <div className='flex h-20.5 w-full flex-col justify-between lg:h-[80px]'>
          <p className={`${Iropke.className} --text-xl h-13 overflow-hidden text-[16px] leading-[26px] font-normal lg:h-[28px] lg:text-xl`}>{highlightText(text)}</p>
          <p className={`${Iropke.className} h-6.5 text-sm text-[16px] leading-[26px] font-normal text-gray-400 lg:h-[28px] lg:text-xl`}>- {highlightText(author)} -</p>
        </div>
        <p className={`${Pretendard.className} flex h-6.5 justify-end overflow-hidden text-sm text-[16px] leading-[26px] font-normal text-blue-400 lg:h-[32px] lg:text-[20px] lg:leading-[32px]`}>
          <span className='flex max-w-full flex-nowrap gap-3 overflow-hidden'>
            {hashtags.map((tag, index) => (
              <span key={index} className='whitespace-nowrap'>
                #{highlightText(tag)}
              </span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};

export default KeywordCard;

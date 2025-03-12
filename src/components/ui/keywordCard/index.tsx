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
    <div className='h-37 p-4 pt-4 pr-6 pb-4 pl-6 w-full border-b border-gray-100 md:h-[152px] lg:h-[176px] lg:p-6'>
      <div className='flex h-29 flex-col justify-between md:h-[120px] lg:h-[128px]' >
        <div className='flex h-20.5 w-full flex-col justify-between lg:h-[80px]'>
          <p className='h-13 overflow-hidden lg:h-[28px]'>{highlightText(text)}</p>
          <p className='h-6.5 text-sm text-gray-500 lg:h-[28px]'>- {highlightText(author)} -</p>
        </div>  
        <p className='flex h-6.5 justify-end text-sm text-blue-500 overflow-hidden whitespace-nowrap lg:h-[32px]'>
          {hashtags.map((tag, index) => (
            <span key={index} className={index !== hashtags.length - 1 ? 'mr-3' : ''}>
              #{highlightText(tag)}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default KeywordCard;

import TextArea from '../ui/textarea';

interface ContentProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
}

const Content = ({ content, onChange }: ContentProps) => {
  return (
    <div className="gap-2md:h-42 flex h-41.5 w-full flex-col xl:h-51.75 xl:gap-6">
      <div className={`flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className="text-md font-semibold md:text-lg xl:text-xl">내용</p>
        <p className="flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl">*</p>
      </div>
      <TextArea
        id="content"
        value={content}
        className="relative z-0"
        size={'text'}
        maxLength={500}
        onChange={onChange} 
      />
    </div>
  );
};

export default Content;

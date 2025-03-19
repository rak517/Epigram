import { UseFormRegister, FieldErrors, UseFormTrigger } from 'react-hook-form';
import TextArea from '../ui/textarea';

interface ContentProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: UseFormRegister<{ content: string }>;
  errors: FieldErrors<{ content: string }>;
  trigger: UseFormTrigger<{ content: string }>;
}

const Content = ({ content, onChange, register, errors, trigger }: ContentProps) => {
  return (
    <div className="gap-2md:h-42 flex h-41.5 w-full flex-col xl:h-51.75 xl:gap-6">
      <div className="flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25">
        <p className="text-md font-semibold md:text-lg xl:text-xl">내용</p>
        <p className="flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl">*</p>
      </div>
      <TextArea
        id="content"
        {...register('content', { required: '내용을 입력하세요.' })}
        value={content}
        className="relative z-0"
        size={'text'}
        maxLength={500}
        onChange={(e) => {
          onChange(e);
          trigger('content'); // 입력할 때마다 유효성 검사
        }}
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
    </div>
  );
};

export default Content;

import { ContentProps } from '@/components/addEditForm/types'; 
import TextArea from '../ui/textarea';



const Content = ({ register, errors, trigger }: ContentProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25'>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>내용</p>
        <p className='flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl'>*</p>
      </div>

      <TextArea
        size='sm'
        className='h-33 w-full xl:h-37'
        {...register('content', {
          required: '내용을 입력해주세요',
          onBlur: () => trigger('content'),
        })}
      />

      {errors.content && <p className='text-sm text-red-500'>{errors.content.message}</p>}
    </div>
  );
};

export default Content;

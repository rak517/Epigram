import TextArea from '../ui/textarea';
import { UseFormRegister } from 'react-hook-form';

type FormData = {
  content: string;
  author: string;
  source: string;
  tags: string[];
};

interface SourceProps {
  register: UseFormRegister<FormData>;
}

export default function Source({ register }: SourceProps) {
  return (
    <div className='flex h-32 w-full flex-col gap-2 md:h-32.5 xl:h-50 xl:gap-6'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>출처</p>
      </div>
      <TextArea 
        size={'source'} 
        maxLength={100} 
        {...register('source')}
      />
            <TextArea 
        size={'source'} 
        maxLength={100} 
        {...register('source')}
      />
    </div>
  );
}
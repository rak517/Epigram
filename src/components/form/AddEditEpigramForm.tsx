import { AddEditEpigramFormProps } from './types';

export default function AddEditEpigramForm({ children, className, ...props }: AddEditEpigramFormProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex-grow py-6 md:py-8 lg:py-14'>
        <form className={`mx-auto w-[312px] pt-10 md:pt-12 lg:w-[640px] lg:pt-14 ${className || ''}`} {...props}>
          {children}
        </form>
      </div>
    </div>
  );
}

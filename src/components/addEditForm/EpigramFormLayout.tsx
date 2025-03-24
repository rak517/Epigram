import { AddEditEpigramFormProps } from './types';

export default function EpigramFormLayout({ children, className, ...props }: AddEditEpigramFormProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex-grow py-12 md:py-12 lg:py-14'>
        <form className={`mx-auto w-[312px] pt-10 md:pt-12 lg:w-[640px] lg:pt-14 ${className || ''}`} {...props}>
          {children}
        </form>
      </div>
    </div>
  );
}

import { AddEditEpigramFormProps } from './types';

export default function EpigramFormLayout({ children, className, ...props }: AddEditEpigramFormProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex-grow'>
        <form className={`mx-auto w-full ${className || ''}`} {...props}>
          {children}
        </form>
      </div>
    </div>
  );
}

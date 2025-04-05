'use client';

import React, { useEffect, useState } from 'react';
import { ToastProps, useToast } from './ToastContext';

export const Toast: React.FC<ToastProps> = ({ id, title, message, variant, duration = 3000 }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => removeToast(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, removeToast]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-400';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-400';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-400';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-400';
    }
  };

  return (
    <div
      className={`fixed right-4 z-50 min-w-[280px] rounded border px-4 py-3 shadow-md transition-all duration-300 ${getVariantClasses()} ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
      role='alert'
      data-testid='toast-message'
      style={{ top: '20px' }}
    >
      <div className='flex justify-between'>
        <div className='flex-1'>{title && <div className='font-semibold'>{title}</div>}</div>
        <button
          className='ml-2 text-gray-400 hover:text-gray-900'
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => removeToast(id), 300);
          }}
        >
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>

      <div className='mt-1 text-sm'>
        <span className='block'>{message}</span>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

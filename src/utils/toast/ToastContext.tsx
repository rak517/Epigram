'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastProps[];
  showToast: (message: string, variant?: ToastVariant, title?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'info', title?: string, duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastProps = {
        id,
        message,
        variant,
        title,
        duration,
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);

      return id;
    },
    [removeToast],
  );

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast는 ToastProvider안에서만 사용되어야 합니다.');
  }
  return context;
};

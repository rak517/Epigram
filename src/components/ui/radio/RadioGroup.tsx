'use client';

import { cn } from '@/utils/cn';
import { HTMLAttributes, ReactNode, createContext, useState } from 'react';

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  children: ReactNode;
}

export function RadioGroup({ defaultValue = '', onValueChange, name = 'radio-group', children, className, ...props }: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (val: string) => {
    setValue(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <RadioGroupContext.Provider value={{ name, value, onChange: handleChange }}>
      <div className={cn('flex gap-6', className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export { RadioGroupContext };

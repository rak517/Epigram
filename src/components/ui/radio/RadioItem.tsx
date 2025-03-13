'use client';

import React from 'react';
import { RadioGroupItem } from './RadioGroupItem';
import { RadioLabel } from './RadioLabel';

export interface RadioItemProps {
  value: string;
  id: string;
  radioSize?: 'sm' | 'md';
  label: string;
}

export function RadioItem({ value, id, radioSize = 'md', label }: RadioItemProps) {
  const fontSizeClass = radioSize === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <div className='flex items-center gap-2 space-x-2'>
      <RadioGroupItem value={value} id={id} radioSize={radioSize} />
      <RadioLabel htmlFor={id} className={fontSizeClass}>
        {label}
      </RadioLabel>
    </div>
  );
}

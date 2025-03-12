'use client';

import { useState } from 'react';

interface Emotions {
  id: number;
  name: string;
  emoji: string;
}

export const EMOTIONS: Emotions[] = [
  { id: 0, name: '감동', emoji: '😍' },
  { id: 1, name: '기쁨', emoji: '😊' },
  { id: 2, name: '고민', emoji: '🤔' },
  { id: 3, name: '슬픔', emoji: '😥' },
  { id: 4, name: '화남', emoji: '🤬' },
];

interface EmotionsProps {
  onSelect?: (emotion: Emotions) => void;
}

export default function Emotion({ onSelect }: EmotionsProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (emotion: Emotions) => {
    setSelected(emotion.name);
    onSelect?.(emotion);
  };

  return (
    <div className='flex space-x-4 p-4'>
      {EMOTIONS.map((emotion) => (
        <button key={emotion.name} onClick={() => handleSelect(emotion)} className={`cursor-pointer text-4xl transition ${selected === emotion.name ? 'scale-125' : 'scale-100'}`}>
          {emotion.emoji}
        </button>
      ))}
    </div>
  );
}

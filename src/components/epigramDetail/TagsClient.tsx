'use client';

import { useRouter } from 'next/navigation';
import { Tag } from '@/apis/epigram/types';

interface TagsClientProps {
  tags: Tag[];
  tagPosition: 'topLeft' | 'bottomRight';
  tagClassName?: string;
}

export default function TagsClient({ tags, tagPosition, tagClassName }: TagsClientProps) {
  const router = useRouter();

  const handleTagClick = (tagName: string) => {
    router.push(`/search?keyword=${encodeURIComponent(tagName)}`);
  };

  return (
    <div
      className={`${tagPosition === 'topLeft' ? 'absolute left-0' : 'absolute right-0 text-right'} space-x-2 text-blue-400`}
      style={{
        top: tagPosition === 'topLeft' ? `calc(-1.5em - 12px)` : undefined,
        bottom: tagPosition === 'bottomRight' ? `calc(-1.5em - 12px)` : undefined,
      }}
    >
      {tags.map((tag) => (
        <span key={tag.id} className={`cursor-pointer py-1 text-blue-400 ${tagClassName}`} onClick={() => handleTagClick(tag.name)}>
          {tag.name === '...' ? tag.name : `#${tag.name}`}
        </span>
      ))}
    </div>
  );
}

'use client';

const CommentSkeleton = () => {
  return (
    <div className='flex gap-4 border-b border-gray-100 p-4'>
      <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200' />

      <div className='flex-1'>
        <div className='mb-2 flex items-center gap-2'>
          <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
          <div className='h-3 w-16 animate-pulse rounded bg-gray-100' />
        </div>

        <div className='space-y-2'>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
};

export default function CommentsSkeleton() {
  return (
    <div className='w-full'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <CommentSkeleton />
        </div>
      ))}
    </div>
  );
}

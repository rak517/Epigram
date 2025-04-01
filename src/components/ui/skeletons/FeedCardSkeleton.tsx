export function FeedEpigramSkeleton() {
  return (
    <div className='space-y-2'>
      <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='mb-4 space-y-2'>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>

          <div className='h-4 w-4/5 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-11/12 animate-pulse rounded bg-gray-200'></div>
        </div>

        <div className='mt-4 flex justify-end'>
          <div className='h-4 w-1/3 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>

      <div className='mt-2 flex justify-end space-x-2'>
        <div className='h-4 w-24 animate-pulse rounded bg-gray-200'></div>
        <div className='h-4 w-28 animate-pulse rounded bg-gray-200'></div>
      </div>
    </div>
  );
}

export function FeedEpigramButtonSkeleton() {
  return (
    <div className='flex w-full justify-center space-x-2'>
      <div className='h-10 w-32 animate-pulse rounded-full bg-gray-200'></div>
    </div>
  );
}

export function FeedEpigramSkeletonList({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FeedEpigramSkeleton key={i} />
      ))}
    </>
  );
}

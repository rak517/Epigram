import EpigramList from '@/components/feed/EpigramList';

export default function Feed() {
  return (
    <div className='flex w-full flex-col items-center gap-18 lg:gap-40'>
      <div className='flex w-full max-w-[1200px] flex-col gap-18 px-6 lg:gap-40'>
        <EpigramList />
      </div>
    </div>
  );
}

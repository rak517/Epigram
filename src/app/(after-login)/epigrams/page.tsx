import EpigramList from '@/components/epigrams/EpigramList';
import MainHeader from '@/components/ui/header/MainHeader';

export default function Epigrams() {
  return (
    <>
      <MainHeader />
      <main className='bg-background-100 mt-16 flex min-h-[calc(100dvh-4rem)] flex-col items-center gap-16 pt-6 pb-20'>
        <div className='w-[312px] sm:w-[384px] md:w-[640px]'>
          <EpigramList />
        </div>
      </main>
    </>
  );
}

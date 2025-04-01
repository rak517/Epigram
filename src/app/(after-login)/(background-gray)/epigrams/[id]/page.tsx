import EpigramComment from '@/components/epigramDetail/epigramComment';
import EpigramContent from '@/components/epigramDetail/epigramContent';
import MainHeader from '@/components/ui/header/MainHeader';

export default function Page() {
  return (
    <div className='-mt-6 w-full pt-0 md:-mt-8 lg:-mt-10'>
      <MainHeader />
      <EpigramContent />
      <EpigramComment />
    </div>
  );
}

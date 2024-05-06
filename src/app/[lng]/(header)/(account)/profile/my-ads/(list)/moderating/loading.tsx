import { Skeleton } from '@nextui-org/skeleton';

export default function LoadingModerating() {
  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      <Skeleton className='w-full h-[420px] rounded-2xl' />
      <Skeleton className='w-full h-[420px] rounded-2xl' />
      <Skeleton className='w-full h-[420px] rounded-2xl' />
    </div>
  );
}

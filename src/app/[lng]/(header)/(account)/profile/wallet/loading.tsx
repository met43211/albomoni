import { Skeleton } from '@nextui-org/skeleton';

export default function LoadingWallet() {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4'>
        <Skeleton className='w-40 h-8 md:h-10 rounded-2xl mt-5 md:mt-10' />
        <Skeleton className='w-64 h-12 md:h-[72px] rounded-2xl' />
        <Skeleton className='w-full md:w-56 h-12 rounded-2xl' />
      </div>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mt-5 md:mt-9'>
        <Skeleton className='w-64 h-6 md:h-8 rounded-lg md:rounded-xl' />
        <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
        <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
        <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
      </div>
    </div>
  );
}

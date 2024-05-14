import { Skeleton } from '@nextui-org/skeleton';

export const AdsListSkeleton = () => {
  const skeletons = Array(7).fill(null);

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <Skeleton className='w-64 h-7 rounded-xl' />
      <div className='w-full h-fit grid gap-5 gap-y-6 flex-shrink-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {skeletons.map(() => (
          <Skeleton
            key={Math.random()}
            className='w-full h-[325px] rounded-2xl'
          />
        ))}
      </div>
    </div>
  );
};

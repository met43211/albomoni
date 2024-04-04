import { Skeleton } from '@nextui-org/skeleton';

export const CategoriesListSkeleton = () => {
  const skeletons = Array(7).fill(null);

  return (
    <div className='grid grid-flow-col grid-rows-2 sm:flex sm:flex-row gap-4 py-1 px-4 overflow-y-hidden'>
      {skeletons.map(() => (
        <Skeleton key={Math.random()} className='w-36 h-48 rounded-2xl' />
      ))}
    </div>
  );
};

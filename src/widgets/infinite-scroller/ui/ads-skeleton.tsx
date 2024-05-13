import { Skeleton } from '@nextui-org/skeleton';

export const AdsSkeleton = () => {
  const skeletons = Array(12).fill(null);

  return (
    <>
      {skeletons.map(() => (
        <Skeleton
          key={Math.random()}
          className='w-full h-[416px] rounded-2xl'
        />
      ))}
    </>
  );
};

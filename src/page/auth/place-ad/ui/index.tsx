import { PlaceAd } from '@albomoni/features/place-ad';
import { Suspense } from 'react';

export const PlaceAdPage = () => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Новое объявление
        </h2>
        <Suspense>
          <PlaceAd />
        </Suspense>
      </div>
    </main>
  );
};

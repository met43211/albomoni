import { Suspense } from 'react';
import { AdsListSkeleton } from '@albomoni/widgets/ads-list/ui/skeleton';
import { FavoritesList } from './favorites';

type Props = {
  lng: string;
};

export const FavoritePage = async ({ lng }: Props) => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <Suspense fallback={<AdsListSkeleton />}>
          <FavoritesList lng={lng} />
        </Suspense>
      </div>
    </main>
  );
};

import { Suspense } from 'react';
import { AdsListSkeleton } from '@albomoni/widgets/ads-list/ui/skeleton';
import { AdsList } from '@albomoni/widgets/ads-list';
import { Ad } from '@albomoni/entities/ad/model/ad.type';

type Props = {
  lng: string;
  data: Ad[];
};

export const FavoritePage = async ({ lng, data }: Props) => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <Suspense fallback={<AdsListSkeleton />}>
          <AdsList
            titleSize='xl'
            title='Избранные объявления'
            cols={3}
            lng={lng}
            data={data}
          />
        </Suspense>
      </div>
    </main>
  );
};

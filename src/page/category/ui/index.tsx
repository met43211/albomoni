import { AdsList } from '@albomoni/widgets/ads-list/ui';
import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';
import { CategoryHeader } from './category-header';

type Props = {
  lng: string;
  categoryId: string;
};

export const CategoryPage = ({ lng, categoryId }: Props) => (
  <main className='flex flex-col gap-10 items-center'>
    <Suspense
      fallback={
        <div className='max-w-7xl w-full px-4'>
          <Skeleton className='w-full h-52 rounded-3xl' />
        </div>
      }
    >
      <CategoryHeader lng={lng} categoryId={categoryId} />
    </Suspense>

    <div className='w-full max-w-7xl px-4 flex flex-col-reverse lg:flex-row gap-6'>
      <Suspense>
        <AdsList title='Недавние объявления' cols={4} />
      </Suspense>
      {/* <div className='flex flex-col gap-8 w-96 '>
        <ShowHistoryButton />
      </div> */}
    </div>
  </main>
);

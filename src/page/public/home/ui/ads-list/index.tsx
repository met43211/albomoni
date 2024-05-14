import { apiClient } from '@albomoni/shared/api/base';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller/ui/ads-infinite-scroller';
import { getCurrenciesAsync } from '@albomoni/entities/ad/api/get-currencies';

export const HomeAdsList = async ({ lng }: { lng: string }) => {
  const initialData = await apiClient.get<Ad[]>('ad/page/1');
  const currencies = await getCurrenciesAsync();

  const fetchFunction = () => async (page: number) => {
    'use server';

    return apiClient.get<Ad[]>(`ad/page/${page}`);
  };

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <AdsInfiniteScroller
        initialData={initialData}
        currencies={currencies}
        fetchFunction={fetchFunction()}
      />
    </div>
  );
};

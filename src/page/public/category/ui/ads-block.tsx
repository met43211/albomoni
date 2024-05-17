import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { cookies } from 'next/headers';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  lng: string;
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryAdsBlock = async ({
  lng,
  categoryId,
  searchParams,
}: Props) => {
  cookies();

  const parsedFilters = searchParams.filters
    ? JSON.parse(atob(searchParams.filters as string))
    : null;

  const normalizedFilters = parsedFilters
    ? Object.values(parsedFilters).map((filter: any) => filter.selected)
    : null;

  const initialData = await apiClient.post<Ad[]>('ads/1', {
    filters: [categoryId, ...(normalizedFilters || [])],
  });

  const currencies = await getCurrenciesAsync();

  const fetchFunction = () => async (page: number) => {
    'use server';

    return apiClient.post<Ad[]>(`ads/${page}`, {
      filters: [categoryId, ...(normalizedFilters || [])],
    });
  };

  return initialData.length > 0 ? (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <AdsInfiniteScroller
        initialData={initialData}
        currencies={currencies}
        fetchFunction={fetchFunction()}
        isDisableCategory
      />
    </div>
  ) : (
    <div className='w-full flex flex-col gap-4 items-center mt-20'>
      <PiMagnifyingGlass size={64} className='opacity-50' />
      <h3 className='text-xl font-semibold'>Объявления не найдены</h3>
      <h4 className='opacity-50 font-medium max-w-64 text-center'>
        Попробуйте выбрать другие фильтры.
      </h4>
    </div>
  );
};

'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

export const AdsContainer = ({
  currencies,
  categoryId,
  normalizedFilters,
}: {
  currencies: { [key: string]: number };
  categoryId: string;
  normalizedFilters: any[] | null;
}) => {
  const [isAds, setIsAds] = useState(true);
  const address = getLocation();

  const fetchAds = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_key, page] = queryKey;

    try {
      return await apiClient.post<Ad[]>(`ads/${page}`, {
        filters: [categoryId, ...(normalizedFilters || [])],
        address,
      });
    } catch (error) {
      throw new Error('Error fetching ads');
    }
  };

  return isAds ? (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <AdsInfiniteScroller
        currencies={currencies}
        fetchFunc={fetchAds}
        setIsAds={setIsAds}
        queryKey={`category-${categoryId}-scroll`}
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

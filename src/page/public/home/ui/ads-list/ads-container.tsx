'use client';

import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useState } from 'react';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { fetchAds } from '../../api/get-ads/fetch-ads';

export const AdsContainer = ({
  currencies,
}: {
  currencies: { [key: string]: number };
}) => {
  const [isAds, setIsAds] = useState(true);
  const location = getLocation();

  return isAds ? (
    <AdsInfiniteScroller
      setIsAds={setIsAds}
      currencies={currencies}
      fetchFunc={fetchAds}
      queryKey={`home-scroll_${location.lat}_${location.lon}`}
    />
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Объявления не найдены'
      desc='Создайте первое объявление в своём городе!'
    />
  );
};

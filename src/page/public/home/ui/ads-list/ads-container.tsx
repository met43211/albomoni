'use client';

import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useState } from 'react';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { fetchAds } from '../../api/get-ads/fetch-ads';
import { HomeAdsPlaceholder } from './placeholder';

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
      queryKey={`home-scroll_${location.address}_${location.lon}`}
    />
  ) : (
    <HomeAdsPlaceholder />
  );
};

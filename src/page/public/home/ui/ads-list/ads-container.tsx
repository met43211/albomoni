'use client';

import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { fetchAds } from '../../api/get-ads/fetch-ads';

export const AdsContainer = ({
  currencies,
}: {
  currencies: { [key: string]: number };
}) => {
  return <AdsInfiniteScroller currencies={currencies} fetchFunc={fetchAds} />;
};

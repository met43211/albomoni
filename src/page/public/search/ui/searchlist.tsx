'use client';

import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useEffect, useState } from 'react';
import { useCurrencies } from '@albomoni/shared/lib/providers/currencies-provider';
import { useRouter } from 'next/navigation';
import { getSearchResults } from '../api/get-search-results';

export const SearchList = ({ query }: { query: string }) => {
  const [isAds, setIsAds] = useState(true);
  const { refresh } = useRouter();

  const location = getLocation();
  const currencies = useCurrencies();

  useEffect(() => {
    refresh();
  }, [query]);

  return (
    <AdsInfiniteScroller
      setIsAds={setIsAds}
      currencies={currencies}
      fetchFunc={getSearchResults(query)}
      queryKey={`search_${query}_${location.lon}`}
    />
  );
};

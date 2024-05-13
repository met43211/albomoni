/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { AdCard } from '@albomoni/entities/ad';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { useLangContext } from '@albomoni/shared/lib/providers';
import { AdsListSkeleton } from '@albomoni/widgets/ads-list/ui/skeleton';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';

type Props = {
  initialData: Ad[];
  currencies: { [key: string]: number };
  status: string;
};

export const AdsInfiniteScroller = ({
  initialData,
  currencies,
  status,
}: Props) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const token = getCookie('token');
  const lng = useLangContext();
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '300px',
    threshold: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newAds = await apiClient.get<Ad[]>(
        `my-ads/${status}/${page}`,
        {},
        { Authorization: `Bearer ${token}` },
      );

      if (newAds.length === 0) {
        setIsEnded(true);
      }

      setData([...data, ...newAds]);
    };

    if (page > loadedPages) {
      try {
        fetchData();
        setLoadedPages(loadedPages + 1);
      } catch {
        return;
      } finally {
        setIsLoading(false);
      }
    }
  }, [page]);

  useEffect(() => {
    if (intersection && intersection.intersectionRatio === 1) {
      setPage(page + 1);
    }
  }, [intersection]);

  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {data.map((ad) => {
        return (
          <AdCard
            key={ad.ad.id}
            data={ad}
            lng={lng as string}
            currencies={currencies}
          />
        );
      })}
      {isLoading && <AdsListSkeleton />}
      {!isEnded && <div ref={intersectionRef} />}
    </div>
  );
};

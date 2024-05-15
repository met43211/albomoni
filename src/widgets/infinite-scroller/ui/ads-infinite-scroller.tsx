/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { AdCard } from '@albomoni/entities/ad/ui/ad-card';
import { useLangContext } from '@albomoni/shared/lib/providers';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import { Spinner } from '@nextui-org/spinner';

type Props = {
  initialData: Ad[];
  currencies: { [key: string]: number };
  fetchFunction: (page: number) => Promise<Ad[]>;
  isDisableCategory?: boolean;
};

export const AdsInfiniteScroller = ({
  initialData,
  currencies,
  fetchFunction,
  isDisableCategory,
}: Props) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(initialData.length < 12);
  const lng = useLangContext();
  const intersectionRef = useRef(null);

  useEffect(() => {
    setData(initialData);
    setPage(1);
    setLoadedPages(1);
  }, [initialData]);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '300px',
    threshold: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newAds = await fetchFunction(page);

      if (newAds.length < 12) {
        setIsEnded(true);
      }

      setData([...data, ...newAds]);
      setIsLoading(false);
    };

    if (page > loadedPages) {
      try {
        fetchData();
        setLoadedPages(loadedPages + 1);
      } catch {
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
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data.map((ad) => {
          return (
            <AdCard
              key={ad.ad.id}
              data={ad}
              currencies={currencies}
              isDisableCategory={isDisableCategory}
            />
          );
        })}
      </div>
      {isLoading && <Spinner className='mt-6' />}
      {!isEnded && <div ref={intersectionRef} />}
    </>
  );
};

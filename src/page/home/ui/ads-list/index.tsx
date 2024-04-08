'use client';

import { AdsList } from '@albomoni/widgets/ads-list';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import { GetAdsQueries } from '../../api';

export const HomeAdsList = () => {
  const { data } = useQuery(GetAdsQueries());

  return data ? (
    <div className='w-full max-w-7xl px-4'>
      <AdsList
        title='Последние опубликованные объявления'
        data={data}
        titleSize='big'
        cols={3}
      />
    </div>
  ) : (
    <Spinner />
  );
};

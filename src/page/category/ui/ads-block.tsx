import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsList } from '@albomoni/widgets/ads-list';
import { cookies } from 'next/headers';

type Props = {
  lng: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryAdsBlock = async ({ lng, searchParams }: Props) => {
  cookies();

  const ads = await apiClient.post<Ad[]>('ads/', {
    filters: searchParams.filters || null,
  });

  return (
    <AdsList lng={lng} title='Актуальные объявления' cols={3} data={ads} />
  );
};

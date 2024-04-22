import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsList } from '@albomoni/widgets/ads-list';
import { cookies } from 'next/headers';

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

  const fullFilters = normalizedFilters
    ? [categoryId, ...normalizedFilters]
    : null;

  const ads = await apiClient.post<Ad[]>('ads/', {
    filters: fullFilters,
  });

  return (
    <AdsList lng={lng} title='Актуальные объявления' cols={3} data={ads} />
  );
};

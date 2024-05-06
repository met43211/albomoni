import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsList } from '@albomoni/widgets/ads-list';
import { cookies } from 'next/headers';
import { PiMagnifyingGlass } from 'react-icons/pi';

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

  const ads = await apiClient.post<Ad[]>('ads/', {
    filters: [categoryId, ...(normalizedFilters || [])],
  });

  console.log(ads)

  return ads.length > 0 ? (
    <AdsList lng={lng} title='Актуальные объявления' cols={3} data={ads} />
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

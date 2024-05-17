import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { apiClient } from '@albomoni/shared/api/base';
import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { NoFavorites } from './no-favorites';

type Props = {
  lng: string;
  favoritesId: string;
};

export const FavoritesList = async ({ lng, favoritesId }: Props) => {
  const getFavsArray = (): number[] => {
    try {
      return JSON.parse(favoritesId) as number[];
    } catch {
      return [];
    }
  };

  const favoritesArray = getFavsArray();

  const currencies = await getCurrenciesAsync();

  const initialData = await apiClient.post<Ad[]>('favorite/1', {
    favorites: favoritesArray,
  });

  const fetchFunction = () => async (page: number) => {
    'use server';

    return apiClient.post<Ad[]>(`favorite/${page}`, {
      favorites: favoritesArray,
    });
  };

  return initialData.length > 0 ? (
    <div className='w-full h-min flex flex-col gap-10'>
      <h2 className='text-2xl md:text-3xl font-bold'>Избранные объявления</h2>
      <AdsInfiniteScroller
        currencies={currencies}
        initialData={initialData}
        fetchFunction={fetchFunction()}
      />
    </div>
  ) : (
    <NoFavorites />
  );
};

import { AdsList } from '@albomoni/widgets/ads-list';
import { getFavoritesAsync } from '../api/get-favorites';
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

  const favorites = await getFavoritesAsync(favoritesArray);

  return favorites.length > 0 ? (
    <AdsList
      titleSize='xl'
      title='Избранные объявления'
      cols={3}
      lng={lng}
      data={favorites}
    />
  ) : (
    <NoFavorites />
  );
};

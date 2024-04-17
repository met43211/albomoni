import { AdsList } from '@albomoni/widgets/ads-list';
import { getFavoritesAsync } from '../api/get-favorites';

type Props = {
  lng: string;
  favoritesId: string;
};

export const FavoritesList = async ({ lng, favoritesId }: Props) => {
  const getFavsArray = () => {
    try {
      return JSON.parse(favoritesId);
    } catch {
      return [];
    }
  };
  const favoritesArray = getFavsArray();

  const favorites = await getFavoritesAsync(favoritesArray);

  return (
    <AdsList
      titleSize='xl'
      title='Избранные объявления'
      cols={3}
      lng={lng}
      data={favorites}
    />
  );
};

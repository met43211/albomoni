import { cookies } from 'next/headers';
import { AdsList } from '@albomoni/widgets/ads-list';
import { getFavoritesAsync } from '../api/get-favorites';

type Props = {
  lng: string;
};

export const FavoritesList = async ({ lng }: Props) => {
  const favoritesId = cookies().get('favorites');
  const getFavsArray = () => {
    try {
      return JSON.parse(favoritesId?.value as any);
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

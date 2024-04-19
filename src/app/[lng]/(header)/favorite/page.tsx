import { FavoritePage } from '@albomoni/page/favorite';
import { getFavoritesAsync } from '@albomoni/page/favorite/api/get-favorites';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const getFavorites = async () => {
  const favoritesId = getCookie('favorites', { cookies });

  const getFavsArray = () => {
    try {
      return JSON.parse(favoritesId as string);
    } catch {
      return [];
    }
  };

  const favoritesArray = getFavsArray();
  return getFavoritesAsync(favoritesArray);
};

export default async function Favorites({
  params: { lng },
}: {
  params: I18nLangParam;
}) {
  const data = await getFavorites();

  return <FavoritePage lng={lng} data={data} />;
}

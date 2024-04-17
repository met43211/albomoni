import { FavoritePage } from '@albomoni/page/favorite';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Favorites({
  params: { lng },
}: {
  params: I18nLangParam;
}) {
  const favoritesId = cookies().get('favorites');

  return <FavoritePage lng={lng} favoritesId={favoritesId?.value} />;
}

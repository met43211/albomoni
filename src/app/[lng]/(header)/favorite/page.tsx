import { FavoritePage } from '@albomoni/page/favorite';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

export default async function Favorites({
  params: { lng },
}: {
  params: I18nLangParam;
}) {
  return <FavoritePage lng={lng} />;
}

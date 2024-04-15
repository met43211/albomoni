import { AdsList } from '@albomoni/widgets/ads-list';
import { getAdsAsync } from '../../api/get-ads/get-ads';

export const HomeAdsList = async ({ lng }: { lng: string }) => {
  const ads = await getAdsAsync();

  return (
    <AdsList
      title='Актуальные объявления'
      data={ads}
      titleSize='big'
      cols={3}
      lng={lng}
    />
  );
};

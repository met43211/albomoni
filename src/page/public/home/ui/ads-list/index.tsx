import { AdsList } from '@albomoni/widgets/ads-list';
import { cookies } from 'next/headers';
import { getAdsAsync } from '../../api/get-ads/get-ads';

export const HomeAdsList = async ({ lng }: { lng: string }) => {
  cookies();

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
import { AdsList } from '@albomoni/widgets/ads-list';
import { cookies } from 'next/headers';
import { getAdsAsync } from '../../api/get-ads/get-ads';

export const HomeAdsList = async () => {
  cookies();
  const ads = await getAdsAsync();

  return (
    <div className='w-full max-w-7xl px-4'>
      <AdsList
        title='Актуальные объявления'
        data={ads}
        titleSize='big'
        cols={3}
      />
    </div>
  );
};

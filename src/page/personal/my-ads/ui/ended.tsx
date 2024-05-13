import { getCurrenciesAsync } from '@albomoni/entities/ad/api/get-currencies';
import { MyAd } from '@albomoni/entities/ad/model/ad.type';
import { MyAdCard } from '@albomoni/entities/ad/ui/my-ad-card';
import { apiClient } from '@albomoni/shared/api/base';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { MyAdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  lng: string;
};

export const MyAdsEndedPage = async ({ lng }: Props) => {
  const token = getCookie('token', { cookies });
  const currencies = await getCurrenciesAsync();

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/ended/1',
    {},
    { Authorization: `Bearer ${token}` },
  );

  return myAds.length > 0 ? (
    <MyAdsInfiniteScroller
      initialData={myAds}
      currencies={currencies}
      status='ended'
    />
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={60} className='opacity-50 mt-6' />}
      title='Ничего не найдено'
      desc='Попробуйте создать и запустить новое объявление'
    />
  );
};

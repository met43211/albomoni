import { MyAdCard } from '@albomoni/entities/ad';
import { MyAd } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

type Props = {
  lng: string;
};

export const MyAdsActivePage = async ({ lng }: Props) => {
  const token = getCookie('token', { cookies });

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/active/',
    {},
    { Authorization: `Bearer ${token}` },
  );

  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {myAds.map((ad) => {
        return <MyAdCard key={ad.id} ad={ad} lng={lng} />;
      })}
    </div>
  );
};

import { MyAdCard } from '@albomoni/entities/ad';
import { MyAd } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  lng: string;
};

export const MyAdsArchivedPage = async ({ lng }: Props) => {
  const token = getCookie('token', { cookies });

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/archived/',
    {},
    { Authorization: `Bearer ${token}` },
  );

  return myAds.length > 0 ? (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {myAds.map((ad) => {
        return <MyAdCard key={ad.id} ad={ad} lng={lng} />;
      })}
    </div>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={60} />}
      title='Ничего не найдено'
      desc='У вас пока нет завершённых объявлений.'
    />
  );
};

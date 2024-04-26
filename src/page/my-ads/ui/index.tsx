import { MyAdCard } from '@albomoni/entities/ad';
import { Ad, MyAd } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const MyAdsPage = async () => {
  const token = getCookie('token', { cookies });

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/',
    {},
    { Authorization: `Bearer ${token}` },
  );

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Мои объявления
        </h2>
        <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {myAds.map((ad) => {
            return <MyAdCard key={ad.id} ad={ad} />;
          })}
        </div>
      </div>
    </main>
  );
};

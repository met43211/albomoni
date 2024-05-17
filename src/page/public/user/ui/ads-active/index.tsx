import { cookies } from 'next/headers';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { PublicAdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { getPublicAds } from '../../api/get-public-ads';

type Props = {
  userId: string;
  lng: string;
};

export const UserAdsActive = async ({ userId, lng }: Props) => {
  cookies();
  // const { t } = await useTranslation(lng);
  const initialData = await getPublicAds(userId, 'active', 1);
  const currencies = await getCurrenciesAsync();

  const fetchFunction = () => async (page: number) => {
    'use server';

    return getPublicAds(userId, 'active', page);
  };

  return (
    <div className='w-full flex flex-col gap-6 items-center'>
      {initialData.length > 0 ? (
        <>
          {/* <Chip className='self-start'>
            {t('active_ads_count.t', { count: ads[0].count })}
          </Chip> */}
          <PublicAdsInfiniteScroller
            initialData={initialData}
            currencies={currencies}
            fetchFunction={fetchFunction()}
          />
        </>
      ) : (
        <Placeholder
          icon={<PiMagnifyingGlass size={60} className='opacity-50 mt-6' />}
          title='Ничего не найдено'
          desc='У пользователя отсутствуют активные объявления'
        />
      )}
    </div>
  );
};

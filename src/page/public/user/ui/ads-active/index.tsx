import { cookies } from 'next/headers';
import { UserAdCard } from '@albomoni/entities/ad/ui/user-ad-card';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useTranslation } from '@albomoni/shared/i18n';
import { Chip } from '@nextui-org/chip';
import { getCurrenciesAsync } from '@albomoni/entities/ad/api/get-currencies';
import { getPublicAds } from '../../api/get-public-ads';

type Props = {
  userId: string;
  lng: string;
};

export const UserAdsActive = async ({ userId, lng }: Props) => {
  cookies();
  const ads = await getPublicAds(userId, 'active');
  const { t } = await useTranslation(lng);
  const currencies = await getCurrenciesAsync();

  return (
    <div className='w-full flex flex-col gap-6 items-center'>
      {ads.length > 0 ? (
        <>
          <Chip className='self-start'>
            {t('active_ads_count.t', { count: ads.length })}
          </Chip>
          <div className='w-full grid md:grid-cols-2 gap-4'>
            {ads.map((ad) => (
              <UserAdCard
                lng={lng}
                key={ad.id}
                ad={ad}
                currencies={currencies}
              />
            ))}
          </div>
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

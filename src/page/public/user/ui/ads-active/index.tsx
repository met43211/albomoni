import { cookies } from 'next/headers';
import { UserAd } from '@albomoni/entities/ad';
import { getPublicAds } from '../../api/get-public-ads';

type Props = {
  userId: string;
};

export const UserAdsActive = async ({ userId }: Props) => {
  cookies();
  const ads = await getPublicAds(userId, 'active');

  return (
    <div className='w-full grid grid-cols-2'>
      {ads.map((ad) => (
        <UserAd key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

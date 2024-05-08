import { cookies } from 'next/headers';
import { getPublicAds } from '../../api/get-public-ads';

type Props = {
  userId: string;
};

export const UserAdsActive = async ({ userId }: Props) => {
  cookies();
  const ads = await getPublicAds(userId, 'active');

  console.log(ads);

  return <p>{ads.length}</p>;
};

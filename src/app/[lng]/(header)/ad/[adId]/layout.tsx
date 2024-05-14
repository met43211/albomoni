import { getAdAsync } from '@albomoni/entities/ad/api/get-ad';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: {
    adId: string;
  };
};

export default async function AdLayout({ children, params: { adId } }: Props) {
  const token = getCookie('token', { cookies });

  if (token) {
    const data = await getAdAsync(adId);
    const user = await getUserAsync(token as string);

    if (data.seller.user_id === user.user_id) {
      redirect(`/profile/my-ads/ad/${adId}`);
    }
  }

  return children;
}

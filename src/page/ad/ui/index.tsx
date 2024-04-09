import { cookies } from 'next/headers';
import { getAdAsync } from '../api/get-ad';

type Props = {
  lng: string;
  adId: string;
};

export const AdPage = async ({ lng, adId }: Props) => {
  cookies();
  const data = await getAdAsync(adId);

  return <p>{data.id}</p>;
};

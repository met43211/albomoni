import { cookies } from 'next/headers';
import { ImageViewer } from '@albomoni/widgets/fancybox/ui';
import { getAdAsync } from '../api/get-ad';

type Props = {
  lng: string;
  adId: string;
};

export const AdPage = async ({ lng, adId }: Props) => {
  cookies();
  const data = await getAdAsync(adId);

  return (
    <div className='w-full flex items-center justify-center'>
      <ImageViewer images={data.images} />
    </div>
  );
};

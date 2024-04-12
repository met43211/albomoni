import { cookies } from 'next/headers';
import { getAdAsync } from '../api/get-ad';
import { AdGallery } from './gallery';
import { AdActions } from './actions';
import { AdInfo } from './info';

type Props = {
  lng: string;
  adId: string;
};

export const AdPage = async ({ lng, adId }: Props) => {
  cookies();
  const data = await getAdAsync(adId);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col lg:flex-row gap-8 max-w-7xl lg:px-4 pt-2 pb-40'>
        <AdGallery data={data} lng={lng} />
        <AdActions data={data} lng={lng} />

        <div className='flex lg:hidden px-4'>
          <AdInfo data={data} lng={lng} />
        </div>
      </div>
    </div>
  );
};

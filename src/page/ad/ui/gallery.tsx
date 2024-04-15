import { ImageViewer } from '@albomoni/widgets/fancybox/ui';
import { Skeleton } from '@nextui-org/skeleton';
import { Suspense } from 'react';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { getAdTitle } from '@albomoni/entities/ad/lib/get-ad-title';
import { AdInfo } from './info';

type Props = {
  data: Ad;
  lng: string;
};

export const AdGallery = async ({ data, lng }: Props) => {
  return (
    <div className='w-full flex flex-col gap-6 flex-shrink'>
      <div className='w-full overflow-clip lg:rounded-xl flex-shrink'>
        <Suspense
          fallback={
            <Skeleton className='w-full aspect-square md:aspect-[3/2] rounded-xl flex-shrink' />
          }
        >
          <ImageViewer images={data.ad.images} />
        </Suspense>
      </div>

      <h2 className='text-2xl font-bold px-4 lg:px-0 select-text pt-1'>
        {getAdTitle(data, lng)}
      </h2>

      <div className='w-full hidden lg:flex'>
        <AdInfo data={data} lng={lng} />
      </div>
    </div>
  );
};

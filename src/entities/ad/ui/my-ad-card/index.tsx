import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { PiMapPinBold } from 'react-icons/pi';
import Link from 'next/link';
import { getAdTitle } from '../../lib/get-ad-title';
import { MyAd } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';
import { MyAdCardChips } from './chips';
import { MyAdCardStats } from './stats';

type Props = {
  ad: MyAd;
  lng: string;
};

export const MyAdCard = ({ ad, lng }: Props) => {
  const {
    id,
    title,
    additional,
    category,
    cost,
    currency: adCurrency,
    geoposition,
    views,
    status,
    favorites,
  } = ad;

  return (
    <div className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative'>
      <ImageGallery images={ad.images} />

      <Link
        href={`/profile/my-ads/ad/${id}`}
        className='w-full flex flex-col gap-5 p-4'
      >
        <div className='w-full flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1'>
            {getAdTitle(lng, title, additional, category)}
          </h5>
          <h6 className='text-xl font-semibold line-clamp-1'>
            {normalizePrice({ price: cost, currency: adCurrency, adCurrency })}
          </h6>
        </div>

        <MyAdCardChips status={status} />

        <div className='w-full flex gap-2 items-center'>
          <PiMapPinBold size={16} />
          <p className='text-sm font-medium'>{geoposition}</p>
        </div>
      </Link>
      <div className='w-full flex flex-col gap-5 px-4 pt-2 pb-4'>
        <MyAdCardStats views={views} favorites={favorites} />
      </div>
    </div>
  );
};

import { Divider } from '@nextui-org/divider';
import { AddToFavoritesButton } from '@albomoni/features/add-to-favorites';
import { PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { MEDIA_URL } from '@albomoni/shared/config';
import { PublicAdType } from '../../model/ad.type';
import { getAdTitle } from '../../lib/get-ad-title';
import { ImageGallery } from '../image-gallery';

type Props = {
  ad: PublicAdType;
  lng: string;
  currencies: { [key: string]: number };
};

const DynamicAdWatchedMessage = dynamic(
  () => import('../ad-card/watched').then((mod) => mod.AdWatchedMessage),
  { ssr: false },
);

export const UserAdCard = ({ ad, lng, currencies }: Props) => {
  const userCurrency = getCookie('currency', { cookies });
  const {
    title,
    additional,
    category,
    id,
    image,
    geoposition,
    cost,
    currency,
  } = ad;

  const isUnmatchedCurrencies = userCurrency !== currency;
  const images = image.map((img) => ({
    full: `${MEDIA_URL}/${img.file}`,
    preview: `${MEDIA_URL}/${img.file_preview}`,
  }));

  return (
    <Link
      href={`/ad/${id}`}
      className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative'
    >
      <DynamicAdWatchedMessage adId={id} />
      <ImageGallery images={images} />
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <div className='absolute top-4 right-4'>
          <AddToFavoritesButton postId={id} />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1 pr-10'>
            {getAdTitle(lng, title, additional, category)}
          </h5>
          <div className='flex gap-1 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs font-medium'>
              {geoposition.split(', ').slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        <p className='text-xl font-bold'>
          {isUnmatchedCurrencies && '~ '}
          {normalizePrice({
            price: cost,
            currency: userCurrency,
            adCurrency: currency,
            currencies,
          })}
        </p>
      </div>
    </Link>
  );
};

import { Divider } from '@nextui-org/divider';
import { Rating } from '@albomoni/shared/ui/rating';
import { AddToFavoritesButton } from '@albomoni/features/add-to-favorites';
import { PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import { Ad } from '../../model/ad.type';
import { getAdTitle } from '../../lib/get-ad-title';
import { ImageGallery } from '../image-gallery';

type Props = {
  data: Ad;
  lng: string;
};

const DynamicAdWatchedMessage = dynamic(
  () => import('./watched').then((mod) => mod.AdWatchedMessage),
  { ssr: false },
);

export const AdCard = ({ data, lng }: Props) => {
  const userCurrency = cookies().get('currency');
  const { ad, seller } = data;
  const { title, additional, category } = ad;

  const isUnmatchedCurrencies = userCurrency?.value !== data.ad.currency;

  return (
    <Link
      href={`/ad/${ad.id}`}
      className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative'
    >
      <DynamicAdWatchedMessage adId={data.ad.id} />
      <ImageGallery images={ad.images} />
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <Rating value={seller.rating} feedback={seller.feedback_count} />
        <div className='absolute top-4 right-4'>
          <AddToFavoritesButton postId={data.ad.id} />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1'>
            {getAdTitle(lng, title, additional, category)}
          </h5>
          <div className='flex gap-1 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs font-medium'>
              {data.ad.geoposition.split(', ').slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        <p className='text-xl font-bold'>
          {isUnmatchedCurrencies && '~ '}
          {normalizePrice({
            price: ad.cost,
            currency: userCurrency?.value,
            adCurrency: data.ad.currency,
          })}
        </p>
      </div>
    </Link>
  );
};

import Image from 'next/image';
import { Divider } from '@nextui-org/divider';
import { Rating } from '@albomoni/shared/ui/rating';
import { AddToFavoritesButton } from '@albomoni/features/add-to-favorites';
import { PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { Ad } from '../../model/ad.type';

type Props = {
  data: Ad;
  lng: string;
};

export const AdCard = ({ data, lng }: Props) => {
  const { ad, seller } = data;

  return (
    <Link
      href={`/ad/${ad.id}`}
      className='w-full flex-shrink-0 flex flex-col shadow-medium dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer'
    >
      <div className='h-40 flex gap-[1px] overflow-x-scroll scrollbar-hide bg-[--element] snap-x snap-mandatory'>
        {ad.images.map(({ full, preview }) => (
          <Image
            key={full}
            src={full}
            blurDataURL={preview}
            placeholder='blur'
            alt='image'
            width={240}
            height={160}
            quality={40}
            className='snap-start flex-shrink-0 object-cover h-full'
          />
        ))}
      </div>
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <Rating
          value={seller.rating}
          feedback={seller.feedback_count}
          lng={lng}
        />
        <div className='absolute top-4 right-4'>
          <AddToFavoritesButton />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold '>Название объявления</h5>
          <div className='flex gap-1 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs'>Турция, Анкара</p>
          </div>
        </div>

        <p className='text-xl font-bold'>{ad.cost} ₽</p>
      </div>
    </Link>
  );
};

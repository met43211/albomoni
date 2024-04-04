import Image from 'next/image';
import img1 from '@albomoni/shared/assets/img1.jpg';
import img2 from '@albomoni/shared/assets/img2.jpeg';
import { Divider } from '@nextui-org/divider';
import { Rating } from '@albomoni/shared/ui/rating';
import { AddToFavoritesButton } from '@albomoni/features/add-to-favorites';
import { PiMapPin } from 'react-icons/pi';

export const AdCard = () => {
  return (
    <div className='w-full flex-shrink-0 flex flex-col shadow-medium rounded-2xl overflow-clip cursor-pointer'>
      <div className='h-40 flex gap-[1px] overflow-x-scroll scrollbar-hide bg-[--element] snap-x snap-mandatory'>
        <Image
          src={img1}
          alt='img'
          height={160}
          quality={60}
          className='snap-start w-auto h-auto flex-shrink-0'
        />
        <Image
          src={img2}
          alt='img'
          width={160}
          quality={60}
          className='snap-start w-auto h-auto flex-shrink-0'
        />
        <Image
          src={img1}
          alt='img'
          width={160}
          quality={60}
          className='snap-start w-auto h-auto flex-shrink-0'
        />
        <Image
          src={img2}
          alt='img'
          width={160}
          quality={60}
          className='snap-start w-auto h-auto flex-shrink-0'
        />
        <Image
          src={img1}
          alt='img'
          width={160}
          quality={60}
          className='snap-start w-auto h-auto flex-shrink-0'
        />
      </div>
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <Rating value={4.1} />
        <div className='absolute top-4 right-4'>
          <AddToFavoritesButton />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold'>1+1 квартира, 78 м², 4/11 этаж</h5>
          <div className='flex gap-1 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs'>Турция, Анкара</p>
          </div>
        </div>

        <p className='text-xl font-bold'>110000 ₽ в месяц</p>
      </div>
    </div>
  );
};

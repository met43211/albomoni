import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Chip } from '@nextui-org/chip';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { parseDate } from '@albomoni/shared/lib/utils/parse-date';
import {
  PiEyeBold,
  PiHeartBold,
  PiMapPinBold,
  PiPhonePlusBold,
} from 'react-icons/pi';
import { TbMessageCircle } from 'react-icons/tb';
import { getAdTitle } from '../../lib/get-ad-title';
import { MyAd } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';

type Props = {
  ad: MyAd;
  lng: string;
};

export const MyAdCard = ({ ad, lng }: Props) => {
  const {
    title,
    additional,
    category,
    cost,
    currency: adCurrency,
    geoposition,
    views,
    favorites,
  } = ad;

  return (
    <div className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative'>
      <ImageGallery images={ad.images} />

      <div className='w-full flex flex-col gap-5 p-4'>
        <div className='w-full flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1'>
            {getAdTitle(lng, title, additional, category)}
          </h5>
          <h6 className='text-xl font-semibold line-clamp-1'>
            {normalizePrice({ price: cost, currency: adCurrency, adCurrency })}
          </h6>
        </div>

        <ScrollShadow
          orientation='horizontal'
          hideScrollBar
          className='w-full flex gap-2 items-center'
        >
          <Chip
            variant='flat'
            color='success'
            classNames={{ content: 'font-medium' }}
          >
            Активно
          </Chip>
          <Chip
            variant='flat'
            color='primary'
            classNames={{ content: 'font-medium' }}
          >
            Осталось 27 дней
          </Chip>
        </ScrollShadow>

        <div className='w-full flex gap-2 items-center'>
          <PiMapPinBold size={16} />
          <p className='text-sm font-medium'>{geoposition}</p>
        </div>

        <div className='w-full flex mt-2'>
          <div className='w-full flex flex-col gap-2 items-center '>
            <PiEyeBold size={24} />
            <p className='text-sm font-semibold'>{views}</p>
          </div>
          <div className='w-full flex flex-col gap-2 items-center '>
            <PiPhonePlusBold size={24} />
            <p className='text-sm font-semibold'>5</p>
          </div>
          <div className='w-full flex flex-col gap-2 items-center '>
            <PiHeartBold size={24} />
            <p className='text-sm font-semibold'>{favorites}</p>
          </div>
          <div className='w-full flex flex-col gap-2 items-center opacity-50 '>
            <TbMessageCircle size={24} />
            <p className='text-sm font-semibold'>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';
import { MEDIA_URL } from '@albomoni/shared/config';
import { PublicAdType } from '../../model/ad.type';

type Props = {
  ad: PublicAdType;
};

export const UserAd = ({ ad }: Props) => {
  const { image } = ad;

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full aspect-[4/3] relative rounded-xl overflow-clip'>
        <Image
          alt={ad.title || ad.description}
          fill
          src={`${MEDIA_URL}${image[0].file}`}
          className='snap-start flex-shrink-0 object-cover h-full'
        />
      </div>
    </div>
  );
};

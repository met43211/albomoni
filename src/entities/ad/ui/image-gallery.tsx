import Image from 'next/image';
import { ImageType } from '../model/ad.type';

type Props = {
  images: ImageType[];
};

export const ImageGallery = ({ images }: Props) => {
  return (
    <div className='h-40 flex gap-[1px] overflow-x-scroll scrollbar-hide bg-[--element] snap-x snap-mandatory'>
      {images.map(({ full, preview }) => (
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
  );
};

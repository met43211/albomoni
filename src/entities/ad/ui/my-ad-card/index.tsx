import { MyAd } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';

type Props = {
  ad: MyAd;
};

export const MyAdCard = ({ ad }: Props) => {
  return (
    <div className='w-full flex-shrink-0 flex flex-col shadow-medium dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative'>
      <ImageGallery images={ad.images} />
      <div className='w-full flex flex-col gap-4 p-4'>{ad.description}</div>
    </div>
  );
};

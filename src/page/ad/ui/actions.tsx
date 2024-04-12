import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Rating } from '@albomoni/shared/ui/rating';
import { PiUserBold } from 'react-icons/pi';
import { Ad } from '@albomoni/entities/ad/model/ad.type';

type Props = {
  data: Ad;
  lng: string;
};

export const AdActions = ({ data, lng }: Props) => {
  const { ad, seller } = data;

  return (
    <div className='flex flex-col px-4 lg:px-0'>
      <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
        <div className='flex flex-col gap-4'>
          <button
            type='button'
            className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold hover:scale-105 active:scale-95 transition-transform'
          >
            Посмотреть номер
          </button>

          <Button size='lg' className='w-full font-semibold'>
            Написать
          </Button>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-md font-semibold opacity-50'>Цена</h3>
          <h4 className='text-2xl font-bold'>
            {normalizePrice({ price: ad.cost, lng })}
          </h4>
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='text-md font-semibold opacity-50'>Продавец</h3>
          <div className='w-full h-14 flex gap-4 items-center'>
            <Avatar
              src={seller.avatar}
              icon={<PiUserBold size={24} className='opacity-50' />}
              className='w-14 h-14 flex-shrink-0'
            />
            <div className='flex flex-col gap-1 justify-between w-full h-full'>
              <p className='text-lg font-bold'>{seller.name}</p>
              <Rating
                value={seller.rating}
                feedback={seller.feedback_count}
                lng={lng}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-md font-semibold opacity-50'>Адрес</h3>
          <h4 className='text-lg font-bold'>Турция, Анкара, метро Mesa</h4>
        </div>
      </div>
    </div>
  );
};

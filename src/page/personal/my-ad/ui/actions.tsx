import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Button } from '@nextui-org/button';
import { Rating } from '@albomoni/shared/ui/rating';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { cookies } from 'next/headers';
import { UserAvatar } from '@albomoni/entities/user';
import { PiPencilSimpleBold, PiTrendUpBold } from 'react-icons/pi';
import { MyAdCardChips, MyAdCardStats } from '@albomoni/entities/ad';
import { StopAdButton } from '@albomoni/features/ad/stop-ad';
import { StartAdButton } from '@albomoni/features/ad/start-ad';
import Link from 'next/link';

type Props = {
  data: Ad;
  lng: string;
};

export const MyAdActions = async ({ data, lng }: Props) => {
  const userCurrency = cookies().get('currency');
  const { ad, seller } = data;

  return (
    <div className='flex flex-col px-4 lg:px-0'>
      <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
        <div className='flex flex-col gap-4'>
          <StartAdButton id={ad.id} status={ad.status} />

          <div className='w-full flex gap-4'>
            <Button
              as={Link}
              href={`/profile/my-ads/ad/${ad.id}/edit`}
              size='lg'
              className='w-full font-semibold'
            >
              <PiPencilSimpleBold size={18} />
              Редактировать
            </Button>

            {(ad.status === 'active' || ad.status === 'moderating') && (
              <StopAdButton id={data.ad.id} status={data.ad.status} />
            )}
          </div>
        </div>
        <MyAdCardChips status={ad.status} />
        <MyAdCardStats views={ad.views} favorites={ad.favorites} />

        <div className='flex flex-col gap-1'>
          <div className='w-full flex gap-2 justify-start'>
            <h3 className='text-md font-semibold opacity-50'>Цена</h3>
          </div>

          <h4 className='text-2xl font-bold select-text'>
            {normalizePrice({
              price: ad.cost,
              currency: userCurrency?.value,
              adCurrency: data.ad.currency,
            })}
          </h4>
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='text-md font-semibold opacity-50'>Продавец (Вы)</h3>
          <div className='w-full h-14 flex gap-4 items-center'>
            <div className='w-14 h-14 flex-shrink-0'>
              <UserAvatar
                src={seller.avatar}
                isSubscribed={seller.subscription}
              />
            </div>
            <div className='flex flex-col gap-1 justify-between w-full h-full'>
              <p className='text-lg font-bold'>{seller.name}</p>
              <Rating value={seller.rating} feedback={seller.feedback_count} />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-md font-semibold opacity-50'>Адрес</h3>
          <h4 className='text-lg font-bold select-text'>{ad.geoposition}</h4>
        </div>
      </div>
    </div>
  );
};

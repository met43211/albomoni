import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Button } from '@nextui-org/button';
import { Rating } from '@albomoni/shared/ui/rating';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { cookies } from 'next/headers';
import { InfoButton } from '@albomoni/shared/ui/info-button';
import { UserAvatar } from '@albomoni/entities/user';
import Link from 'next/link';

type Props = {
  data: Ad;
  lng: string;
};

export const AdActions = async ({ data, lng }: Props) => {
  const userCurrency = cookies().get('currency');
  const { ad, seller } = data;
  const isUnmatchedCurrencies = userCurrency?.value !== data.ad.currency;

  return (
    <div className='flex flex-col px-4 lg:px-0'>
      <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
        <div className='flex flex-col gap-4'>
          <Button className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold text-md'>
            Посмотреть номер
          </Button>

          <Button size='lg' className='w-full font-semibold'>
            Написать
          </Button>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='w-full flex gap-2 justify-start'>
            <h3 className='text-md font-semibold opacity-50'>Цена</h3>
            <InfoButton>
              {isUnmatchedCurrencies ? (
                <p className='font-medium'>
                  Продавец указал стоимость в валюте {data.ad.currency},
                  отличной от вашей. Верхняя цена указана приблизительно, исходя
                  из актуального курса. Фактическая цена в валюте продавца
                  указана ниже.
                </p>
              ) : (
                <p className='font-medium'>
                  Валюта продавца соответствует вашей. Указана точная цена.
                </p>
              )}
            </InfoButton>
          </div>

          <h4 className='text-2xl font-bold select-text'>
            {isUnmatchedCurrencies && '~ '}
            {normalizePrice({
              price: ad.cost,
              currency: userCurrency?.value,
              adCurrency: data.ad.currency,
            })}
          </h4>

          {isUnmatchedCurrencies && (
            <h5 className='text-lg font-semibold opacity-50 select-text'>
              {normalizePrice({
                price: ad.cost,
                currency: data.ad.currency,
                adCurrency: data.ad.currency,
              })}
            </h5>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='text-md font-semibold opacity-50'>Продавец</h3>
          <Link
            href={`/user/${data.seller.user_id}`}
            className='w-full h-14 flex gap-4 items-center active:scale-95 transition-transform'
          >
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
          </Link>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-md font-semibold opacity-50'>Адрес</h3>
          <h4 className='text-lg font-bold select-text'>{ad.geoposition}</h4>
        </div>
      </div>
    </div>
  );
};

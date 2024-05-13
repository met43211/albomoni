import { AdCard } from '@albomoni/entities/ad';
import { getCurrenciesAsync } from '@albomoni/entities/ad/api/get-currencies';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { clsx } from 'clsx';

type Props = {
  title: string;
  cols?: 3 | 4;
  titleSize?: 'small' | 'big' | 'xl';
  data?: Ad[];
  lng: string;
};

export const AdsList = async ({
  title,
  cols = 3,
  titleSize = 'small',
  data,
  lng,
}: Props) => {
  const titleStyles = clsx('font-bold', {
    'text-xl': titleSize === 'small',
    'text-xl md:text-2xl': titleSize === 'big',
    'text-2xl md:text-3xl mb-3': titleSize === 'xl',
  });

  const listStyles = clsx('w-full h-fit grid gap-5 gap-y-6 flex-shrink-0', {
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': cols === 3,
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': cols === 4,
  });

  const currencies = await getCurrenciesAsync();

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className={titleStyles}>{title}</h2>
      <div className={listStyles}>
        {data?.reverse().map((ad) => (
          <AdCard key={ad.ad.id} data={ad} lng={lng} currencies={currencies} />
        ))}
      </div>
    </div>
  );
};

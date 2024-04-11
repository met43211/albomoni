import { AdCard } from '@albomoni/entities/ad';
import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { clsx } from 'clsx';

type Props = {
  title: string;
  cols?: 3 | 4;
  titleSize?: 'small' | 'big';
  data?: Ad[];
};

export const AdsList = ({
  title,
  cols = 3,
  titleSize = 'small',
  data,
}: Props) => {
  const titleStyles = clsx('font-bold', {
    'text-xl': titleSize === 'small',
    'text-xl md:text-2xl': titleSize === 'big',
  });

  const listStyles = clsx('w-full h-fit grid gap-5 gap-y-6 flex-shrink-0', {
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': cols === 3,
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': cols === 4,
  });

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className={titleStyles}>{title}</h2>
      <div className={listStyles}>
        {data?.reverse().map((ad) => (
          <AdCard key={ad.id} data={ad} />
        ))}
      </div>
    </div>
  );
};

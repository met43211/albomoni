import { AdCard } from '@albomoni/entities/ad';
import { clsx } from 'clsx';

type Props = {
  title: string;
  cols?: 3 | 4;
  titleSize?: 'small' | 'big';
};

export const AdsList = ({ title, cols = 3, titleSize = 'small' }: Props) => {
  const titleStyles = clsx('font-bold', {
    'text-xl': titleSize === 'small',
    'text-xl md:text-2xl': titleSize === 'big',
  });

  const listStyles = clsx(
    'w-full h-fit grid gap-4 gap-y-6 flex-shrink-0',
    {
      'grid-cols-1 sm:grid-cols-3': cols === 3,
      'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4': cols === 4,
    },
  );

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className={titleStyles}>{title}</h2>
      <div className={listStyles}>
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
    </div>
  );
};

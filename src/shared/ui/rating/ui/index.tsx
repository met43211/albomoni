import { clsx } from 'clsx';
import { PiStarFill } from 'react-icons/pi';

type Props = { value: number };

export const Rating = ({ value }: Props) => {
  const bubbleStyles = clsx(
    'px-2 py-1 rounded-full text-xs text-white font-semibold',
    {
      'bg-[--success]': value >= 4,
      'bg-[--warning]': value < 4 && value >= 3,
      'bg-[--error]': value < 3,
    },
  );

  const roundedValue = Math.round(value);

  return (
    <div className='flex gap-3 items-center'>
      <div className={bubbleStyles}>{value.toFixed(1)}</div>
      <div className='flex'>
        <PiStarFill
          size={14}
          className={roundedValue >= 1 ? 'text-[--warning]' : 'opacity-20'}
        />
        <PiStarFill
          size={14}
          className={roundedValue >= 2 ? 'text-[--warning]' : 'opacity-20'}
        />
        <PiStarFill
          size={14}
          className={roundedValue >= 3 ? 'text-[--warning]' : 'opacity-20'}
        />
        <PiStarFill
          size={14}
          className={roundedValue >= 4 ? 'text-[--warning]' : 'opacity-20'}
        />
        <PiStarFill
          size={14}
          className={roundedValue >= 5 ? 'text-[--warning]' : 'opacity-20'}
        />
      </div>
      <p className='text-sm opacity-50'>63 отзыва</p>
    </div>
  );
};

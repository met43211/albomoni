import { PiBell, PiStar, PiUserList } from 'react-icons/pi';

export const ProfileSecondaryControls = () => {
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 -mt-[11px]'>
      <button
        type='button'
        aria-label='my-ads'
        className='w-full h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform'
      >
        Мои объявления
        <div className='bg-default dark:bg-default-200 px-[11px] py-1 rounded-full dark:shadow-base'>
          3
        </div>
        <PiUserList className='absolute w-auto h-full -bottom-8 -right-6 opacity-10' />
      </button>

      <button
        type='button'
        aria-label='my-ads'
        className='w-full h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform'
      >
        Уведомления
        <PiBell className='absolute w-auto h-[80%] -bottom-4 -right-3 opacity-10' />
      </button>

      <button
        type='button'
        aria-label='my-ads'
        className='w-full h-24 md:h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform col-span-2 md:col-span-1'
      >
        Albomoni Pro
        <PiStar className='w-auto h-full md:h-[80%] absolute -bottom-3 -right-1 md:-bottom-5 opacity-10' />
      </button>
    </div>
  );
};

import { PiPlusCircleBold } from 'react-icons/pi';
import Link from 'next/link';
import { WelcomeBlockScreen } from './screen';

export const WelcomeBlock = () => {
  return (
    <div className='w-full h-[500px] lg:h-[410px] bg-gradient-to-bl from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-500 flex justify-center'>
      <div className='max-w-7xl w-full px-4 flex py-8 items-start lg:items-center relative'>
        <div className='flex flex-col gap-5 w-full sm:w-1/2'>
          <h2 className='text-3xl lg:text-5xl font-bold !leading-[1.3] subpixel-antialiased text-indigo-900 dark:text-indigo-100'>
            Поиск и размещение объявлений
          </h2>
          <p className='text-md lg:text-lg text-blue-900 dark:text-blue-100 opacity-90 mb-1'>
            Совершайте выгодные сделки каждый день
          </p>
          <Link href='/place-ad'>
            <button
              type='button'
              className='w-fit flex gap-2 items-center py-3 px-5 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 hover:scale-105 active:scale-95 transition-transform text-white'
            >
              <PiPlusCircleBold size={20} />
              Разместить объявление
            </button>
          </Link>
        </div>
        <div className='absolute bottom-0 right-4 overflow-clip w-full h-[270px] md:w-[600px] md:h-[350px]'>
          <WelcomeBlockScreen />
        </div>
      </div>
    </div>
  );
};

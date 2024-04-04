import { Button } from '@nextui-org/react';
import { PiPlusCircleBold } from 'react-icons/pi';

export const WelcomeBlock = () => {
  return (
    <div className='w-full h-[410px] bg-gradient-to-tr from-blue-100 to-indigo-200 dark:from-blue-800 dark:to-indigo-500 flex justify-center'>
      <div className='max-w-7xl w-full px-4 flex py-8 items-start md:items-center relative'>
        <div className='flex flex-col gap-5 w-full sm:w-1/2'>
          <h2 className='text-3xl lg:text-5xl font-bold !leading-[1.3] subpixel-antialiased text-indigo-900'>
            Поиск и размещение объявлений
          </h2>
          <p className='text-md md:text-lg text-blue-900 opacity-90 mb-1'>
            Совершайте выгодные сделки каждый день
          </p>
          <Button size='lg' variant='shadow' color='primary' className='w-min'>
            <PiPlusCircleBold size={20} />
            Разместить объявление
          </Button>
        </div>
      </div>
    </div>
  );
};

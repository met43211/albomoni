'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export const RegistrationWidget = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push('/login');
  };

  return (
    <div className='w-full max-w-[420px] flex flex-col shadow-medium bg-[--bg] dark:bg-default-50 rounded-2xl overflow-clip'>
      <h2 className='text-lg font-bold px-6 py-6'>Создание учётной записи</h2>

      <div className='flex gap-4 justify-end py-4 px-6'>
        <Button variant='light' onPress={handleClickBack}>
          Назад ко входу
        </Button>
        <Button color='primary' variant='shadow' type='submit'>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

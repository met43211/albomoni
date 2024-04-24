'use client';

import removeCookie from '@albomoni/shared/lib/utils/server/remove-cookie';
import { Button } from '@nextui-org/react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const { push } = useRouter();
  const handleLogout = () => {
    removeCookie('token');
    deleteCookie('token');
    push('/');
  };

  return (
    <Button
      size='lg'
      className='w-full md:w-48 text-danger mt-4 font-medium bg-white dark:bg-default shadow-base'
      onPress={handleLogout}
    >
      Выйти
    </Button>
  );
};

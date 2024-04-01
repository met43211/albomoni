'use client';

import { useValidateToken } from '@albomoni/widgets/header/lib/use-validate-token';
import { Spinner } from '@nextui-org/react';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
  const { isLogged, isPending } = useValidateToken();

  if (isPending) {
    return (
      <div className='w-dvw h-dvh flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (isLogged) {
    redirect('/');
  }

  return children;
}

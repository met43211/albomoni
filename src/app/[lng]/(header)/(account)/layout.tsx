'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Spinner } from '@nextui-org/react';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const { isPending, isLogged } = useSession();

  if (isPending) {
    return (
      <div className='w-dvw h-dvh flex justify-center items-center pb-40'>
        <Spinner />
      </div>
    );
  }

  if (!isLogged) {
    redirect('/login');
  }

  return children;
}

'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Spinner } from '@nextui-org/spinner';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const { isPending, isLogged } = useSession();

  if (isPending) {
    return (
      <div className='absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!isLogged) {
    redirect('/login');
  }

  return children;
}

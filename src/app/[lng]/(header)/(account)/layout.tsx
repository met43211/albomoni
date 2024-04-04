'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Spinner } from '@nextui-org/spinner';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const { isPending, isLogged } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className='w-dvw h-dvh flex justify-center items-center pb-40'>
        <Spinner />
      </div>
    );
  }

  if (!isLogged) {
    router.push('/login');
    return (
      <div className='w-dvw h-dvh flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }
  
  return children;
}

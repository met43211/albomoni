'use client';

import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { Spinner } from '@nextui-org/spinner';
import { permanentRedirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic'

export default function GuestLayout({ children }: Props) {
  const { isLogged, isPending } = useValidateToken();

  if (isPending) {
    return (
      <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (isLogged) {
    permanentRedirect('/');
  }

  return children;
}

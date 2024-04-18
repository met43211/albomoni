'use client';

import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { Spinner } from '@nextui-org/spinner';

type Props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
  const { isLogged, isPending } = useValidateToken();

  if (isPending) {
    return (
      <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return !isLogged ? children : <>Go away</>;
}

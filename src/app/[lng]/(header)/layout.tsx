import { Header } from '@albomoni/widgets/header';
import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
  params: { lng: string };
};

export default function HeaderLayout({ children, params: { lng } }: Props) {
  return (
    <>
      <Suspense fallback={<div className='w-full h-32' />}>
        <Header lang={lng} />
      </Suspense>

      {children}
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';

type Props = {
  children: React.ReactNode;
};

const DynamicHeader = dynamic(
  () => import('@albomoni/widgets/header').then((mod) => mod.Header),
  {
    ssr: false,
    loading: () => <div className='w-full h-[140px] lg:h-32' />,
  },
);

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <DynamicHeader />
      {children}
    </>
  );
}

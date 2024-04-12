'use client';

import dynamic from 'next/dynamic';
import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { Skeleton } from '@nextui-org/skeleton';

const DynamicFixedBars = dynamic(
  () => import('./fixed-bars').then((mod) => mod.FixedBars),
  { ssr: false },
);

const DynamicStaticHeader = dynamic(
  () => import('./static-header').then((mod) => mod.StaticHeader),
  {
    loading: () => (
      <div className='w-full h-20 max-w-7xl mx-auto flex items-center gap-4 lg:gap-8 px-4'>
        <Skeleton className='w-28 h-12 rounded-2xl hidden md:flex flex-shrink-0' />
        <Skeleton className='w-full h-12 rounded-[14px] ' />
        <Skeleton className='w-12 md:w-[126px] h-12 rounded-[14px] flex-shrink-0' />
      </div>
    ),
  },
);

export const Header = () => {
  useValidateToken();

  return (
    <header className='w-full h-20 flex flex-row justify-center z-30'>
      <DynamicStaticHeader />
      <DynamicFixedBars />
    </header>
  );
};

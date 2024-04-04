'use client';

import { useMedia } from 'react-use';
import dynamic from 'next/dynamic';
import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { HeaderMobile } from './header-mobile';
import { HeaderDesktop } from './header-desktop';

const DynamicFixedBars = dynamic(
  () => import('./fixed-bars').then((mod) => mod.FixedBars),
  { ssr: false },
);

export const Header = () => {
  const isMobile = useMedia('(max-width: 1024px)', true);
  useValidateToken();

  return (
    <header className='w-full h-min lg:h-32 flex flex-col items-center z-30'>
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
      <DynamicFixedBars />
    </header>
  );
};

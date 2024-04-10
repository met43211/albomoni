'use client';

import dynamic from 'next/dynamic';
import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { AlbomoniSvg } from '@albomoni/shared/ui/logo';
import { PiMapPinBold } from 'react-icons/pi';
import { Search } from '@albomoni/features/search';
import Link from 'next/link';
import { MenuButton } from '@albomoni/entities/menu';

const DynamicFixedBars = dynamic(
  () => import('./fixed-bars').then((mod) => mod.FixedBars),
  { ssr: false },
);

export const Header = () => {
  useValidateToken();

  return (
    <header className='w-full h-20 flex flex-row justify-center z-30'>
      <div className='flex flex-row gap-4 lg:gap-8 max-w-7xl px-4 w-full items-center'>
        <div className='w-28 hidden md:flex flex-col gap-2 pt-1 flex-shrink-0'>
          <Link href='/'>
            <AlbomoniSvg />
          </Link>

          <button
            type='button'
            className='flex gap-1 justify-start items-center opacity-50 hover:opacity-100 active:scale-95 transition-transform-opacity origin-left'
          >
            <PiMapPinBold size={14} />
            <p className='text-xs font-medium'>Анкара</p>
          </button>
        </div>

        <Search />

        <MenuButton />
      </div>

      <DynamicFixedBars />
    </header>
  );
};

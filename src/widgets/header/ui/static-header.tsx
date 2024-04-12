import { MenuButton } from '@albomoni/entities/menu';
import { Search } from '@albomoni/features/search';
import { AlbomoniSvg } from '@albomoni/shared/ui/logo';
import Link from 'next/link';
import { PiMapPinBold } from 'react-icons/pi';

export const StaticHeader = () => {
  return (
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
  );
};

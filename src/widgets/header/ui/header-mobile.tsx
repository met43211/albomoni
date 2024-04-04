import { Search } from '@albomoni/features/search';
import { Logo } from '@albomoni/shared/ui/logo';
import Link from 'next/link';

export const HeaderMobile = () => {
  return (
    <div className='w-full flex flex-col gap-4 p-4'>
      <div className='w-full flex justify-between'>
        <Link href='/' className='w-32'>
          <Logo />
        </Link>
      </div>
      <Search />
    </div>
  );
};

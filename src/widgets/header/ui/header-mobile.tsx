import { Search } from '@albomoni/features/search';
import { Logo } from '@albomoni/shared/ui/logo';

export const HeaderMobile = () => {
  return (
    <div className='w-full flex flex-col gap-4 p-4'>
      <div className='w-full flex justify-between'>
        <div className='w-32'>
          <Logo />
        </div>
      </div>
      <Search />
    </div>
  );
};

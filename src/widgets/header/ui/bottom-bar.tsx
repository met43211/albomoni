'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Logo } from '@albomoni/shared/ui/logo';
import { Button } from '@nextui-org/button';
import { PiSquaresFour } from 'react-icons/pi';
import { Skeleton } from '@nextui-org/skeleton';
import { UserAvatar } from '@albomoni/entities/user';
import Link from 'next/link';
import { LoginButton } from '@albomoni/features/auth/login/ui/modal/login-button';
import { Search } from '@albomoni/features/search';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';

export const BottomBar = () => {
  const { t } = useClientTranslation();
  const { isLogged, isPending } = useSession();

  const UserAction = isLogged ? UserAvatar : LoginButton;

  return (
    <div className='w-full max-w-7xl px-4 h-14 flex gap-8 items-center'>
      <Link href='/' scroll={false} className='w-36'>
        <Logo />
      </Link>
      <Button
        disableRipple
        size='lg'
        variant='shadow'
        color='primary'
        className='flex-shrink-0 text-sm'
      >
        <PiSquaresFour size={20} className='opacity-50 flex-shrink-0' />
        {t('header.categories')}
      </Button>
      <Search />
      {isPending ? (
        <Skeleton className='w-[186px] h-12 rounded-2xl flex-shrink-0' />
      ) : (
        <UserAction />
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

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
import { useScrolledTo } from '@albomoni/shared/lib/hooks/use-scrolled-to';
import { AnimatePresence, m } from 'framer-motion';
import { useScrollDirection } from '@albomoni/shared/lib/hooks/use-scroll-direction';
import { useValidateToken } from '../lib/use-validate-token';

export const StickyBar = () => {
  const { t } = useClientTranslation();
  const { isLogged, isPending } = useValidateToken();
  const isScrolled = useScrolledTo(128);
  const scrollDir = useScrollDirection();

  const UserAction = isLogged ? UserAvatar : LoginButton;

  return (
    <>
      <AnimatePresence>
        {isScrolled && scrollDir === 'up' && (
          <m.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ ease: [0, 1, 0, 1], duration: 1 }}
            className='fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-center px-4 gap-4'
          >
            <Button isIconOnly color='primary' size='lg'>
              <PiSquaresFour size={20} className='flex-shrink-0' />
            </Button>
            <Search />
          </m.div>
        )}
      </AnimatePresence>
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
    </>
  );
};

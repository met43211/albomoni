import { Search } from '@albomoni/features/search';
import { TooltipTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { useScrollDirection } from '@albomoni/shared/lib/hooks/use-scroll-direction';
import { useScrolledTo } from '@albomoni/shared/lib/hooks/use-scrolled-to';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { AnimatePresence, m } from 'framer-motion';
import { PiSquaresFour } from 'react-icons/pi';
import { useMedia } from 'react-use';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import Link from 'next/link';
import { HeaderNavigationPaths } from '../config/header-navigation-paths';

export const FixedBars = () => {
  const { t } = useClientTranslation();
  const isScrolled = useScrolledTo(128);
  const scrollDir = useScrollDirection();
  const isMobile = useMedia('(max-width: 600px)', false);
  const activePath = usePathname();

  const normalizedPath = activePath.slice(3) === '' ? '/' : activePath.slice(3);

  return (
    <>
      <AnimatePresence>
        {isScrolled && scrollDir === 'up' && (
          <m.div
            initial={{ y: '-150%' }}
            animate={{ y: 0 }}
            exit={{ y: '-150%' }}
            className='fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-center px-4 gap-4'
          >
            <Button isIconOnly color='primary' size='lg' radius='full'>
              <PiSquaresFour size={20} className='flex-shrink-0' />
            </Button>
            <Search />
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(scrollDir === 'up' || scrollDir === null) && (
          <m.div
            initial={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
            animate={{ y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
            className='fixed bottom-5 md:bottom-6 w-[calc(100%-56px)] sm:w-96 h-14 z-50 flex bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[20px] shadow-base origin-bottom'
          >
            {HeaderNavigationPaths.map(({ id, path, icon: Icon }) => {
              const buttonStyles = clsx(
                'w-full h-full flex justify-center items-center',
                {
                  'opacity-50': path !== normalizedPath,
                },
              );

              return (
                <Tooltip
                  key={id}
                  motionProps={TooltipTransitionVariants}
                  content={t(`pages.${id}`)}
                >
                  <Link
                    href={path}
                    aria-label={t(`pages.${id}`)}
                    className={buttonStyles}
                  >
                    <Icon size={24} />
                  </Link>
                </Tooltip>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

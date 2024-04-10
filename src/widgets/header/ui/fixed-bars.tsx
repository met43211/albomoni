import { Search } from '@albomoni/features/search';
import { TooltipTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { useScrollDirection } from '@albomoni/shared/lib/hooks/use-scroll-direction';
import { useScrolledTo } from '@albomoni/shared/lib/hooks/use-scrolled-to';
import { Tooltip } from '@nextui-org/tooltip';
import { AnimatePresence, m } from 'framer-motion';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import Link from 'next/link';
import { MenuButton } from '@albomoni/entities/menu';
import { HeaderNavigationPaths } from '../config/header-navigation-paths';

export const FixedBars = () => {
  const { t } = useClientTranslation();
  const isScrolled = useScrolledTo(128);
  const scrollDir = useScrollDirection();
  const activePath = usePathname();
  const router = useRouter();

  router.prefetch('/login');

  const normalizedPath = activePath.slice(3) === '' ? '/' : activePath.slice(3);

  return (
    <>
      <AnimatePresence>
        {isScrolled && scrollDir === 'up' && (
          <m.div
            initial={{ y: '-150%' }}
            animate={{ y: 0 }}
            exit={{ y: '-150%' }}
            className='fixed max-w-7xl top-0 w-full h-20 z-50 flex items-center justify-center px-4 gap-4 lg:gap-8'
          >
            <Search isScrollable />
            <MenuButton />
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrollDir !== 'down' && (
          <m.div
            initial={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
            animate={{ y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
            className='fixed bottom-5 md:bottom-6 w-[calc(100%-56px)] sm:w-96 h-14 z-50 flex bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[20px] shadow-base origin-bottom dark:border-1 dark:border-white/10'
          >
            {HeaderNavigationPaths.map(({ id, path, icon: Icon }) => {
              const buttonStyles = clsx(
                'w-full h-full flex justify-center items-center',
                {
                  'opacity-50': path !== normalizedPath,
                },
              );

              router.prefetch(path);

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

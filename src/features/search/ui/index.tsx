'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

export const Search = () => {
  const [search, setSearch] = useState('');
  const { t } = useClientTranslation();

  return (
    <form className='w-full relative flex'>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size='lg'
        placeholder={t('header.search-placeholder')}
        startContent={
          <PiMagnifyingGlass
            size={20}
            className='opacity-60 mx-2 flex-shrink-0'
          />
        }
        classNames={{ input: 'text-sm pr-24' }}
      />
      <AnimatePresence>
        {search.length > 0 && (
          <m.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <Button
              disableRipple
              size='lg'
              variant='shadow'
              color='primary'
              className='absolute right-0 text-sm'
            >
              {t('header.search-button')}
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
};

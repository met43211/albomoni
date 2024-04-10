'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Input } from '@nextui-org/input';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  isScrollable?: boolean;
};

export const Search = ({ isScrollable = false }: Props) => {
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
        classNames={{
          input: 'text-sm md:pr-24',
          inputWrapper:
            isScrollable &&
            'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-medium border-1 border-white/10',
        }}
      />
    </form>
  );
};

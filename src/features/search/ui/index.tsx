'use client';

import { apiClient } from '@albomoni/shared/api/base';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Input } from '@nextui-org/input';
import { useEffect, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useDebounce } from 'react-use';

type Props = {
  isScrollable?: boolean;
};

export const Search = ({ isScrollable = false }: Props) => {
  const [search, setSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useClientTranslation();

  useEffect(() => {
    const getSearchTips = async () => {
      const resp = await apiClient.get('search', { search: debouncedValue });

      console.log(resp);
    };

    if (search.length > 0) {
      getSearchTips();
    }
  }, [debouncedValue]);

  useDebounce(
    () => {
      setDebouncedValue(search);
      setIsLoading(false);
    },
    500,
    [search],
  );

  return (
    <form className='w-full relative flex'>
      <Input
        disabled
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

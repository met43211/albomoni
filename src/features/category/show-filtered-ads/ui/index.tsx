'use client';

import { Button } from '@albomoni/shared/ui/button';
import { Filter } from '@albomoni/widgets/category-filter/lib/render-filter-state';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  selectedFilters: { [key: string]: Filter };
};

export const ShowFilteredAdsButton = ({ selectedFilters }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    const jsonData = JSON.stringify(selectedFilters);
    const encodedData = Buffer.from(jsonData).toString('base64');

    router.push(`${pathname}?filters=${encodedData}`);
  };

  return (
    <Button
      size='lg'
      className='bg-gradient-to-tr from-blue-500 to-indigo-400 text-white font-medium'
      onPress={handleClick}
    >
      Показать объявления
    </Button>
  );
};

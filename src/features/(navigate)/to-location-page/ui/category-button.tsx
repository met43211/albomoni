'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiCaretRightBold, PiMapPinBold } from 'react-icons/pi';
import { useLocalStorage } from 'react-use';

export const NavigateToLocationCategoryButton = () => {
  const pathname = usePathname();
  const [, setBackPage] = useLocalStorage<string>('back-page');

  const handleClickLocation = () => {
    setBackPage(pathname);
  };

  return (
    <Button
      as={Link}
      onPress={handleClickLocation}
      href='/location'
      radius='full'
      className='w-fit flex gap-2 items-center -mt-3 bg-white text-black opacity-80'
    >
      <PiMapPinBold size={16} />
      <p className='font-medium'>Турция, Анкара</p>
      <PiCaretRightBold className='mt-[2px]' />
    </Button>
  );
};

import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { PiCopyBold } from 'react-icons/pi';
import { useCopyToClipboard } from 'react-use';

export const ContactWithSellerUserContent = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => {
    if (!isCopied) {
      copyToClipboard('+79320505497');
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <>
      <p className='font-medium opacity-50 -mb-4 w-full'>Номер телефона</p>
      <Button
        size='lg'
        onPress={handleClick}
        color={isCopied ? 'success' : 'default'}
        className='w-full flex px-4 rounded-2xl justify-between items-center font-semibold'
      >
        {isCopied ? (
          <p className='text-lg'>Номер скопирован</p>
        ) : (
          <p className='text-xl opacity-60'>+79320505497</p>
        )}

        <PiCopyBold size={24} className='opacity-60' />
      </Button>
      <p className='font-medium opacity-50'>
        Скопируйте номер и свяжитесь с продавцом напрямую, позвонив ему или
        написав в мессенджеры.
      </p>
    </>
  );
};

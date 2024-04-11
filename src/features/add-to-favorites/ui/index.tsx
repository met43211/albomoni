'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi';

type Props = {
  isLiked?: boolean;
};

export const AddToFavoritesButton = ({ isLiked = false }: Props) => {
  const { isLogged } = useSession();
  const router = useRouter();

  const [isActive, setActive] = useState(isLiked);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogged) {
      router.push('/login');
    } else {
      setActive(!isActive);
    }
  };

  return (
    <Button
      isIconOnly
      size='sm'
      radius='full'
      onClick={handleClick}
      className={
        isActive
          ? 'text-[--error] bg-red-500/10'
          : 'text-[--text] dark:bg-default-200'
      }
    >
      {isActive ? <PiHeartFill size={18} /> : <PiHeartBold size={18} />}
    </Button>
  );
};

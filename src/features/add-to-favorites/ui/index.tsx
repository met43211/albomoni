/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Button } from '@nextui-org/button';
import { MouseEventHandler, useEffect } from 'react';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useFavorites } from '../lib/use-favorites';

type Props = {
  postId: number;
};

export const AddToFavoritesButton = ({ postId }: Props) => {
  const { isLogged } = useSession();
  const { favorites, isPending, setFavorites, setIsPending } = useFavorites();
  const token = getCookie('token');
  const pathname = usePathname();

  useEffect(() => {
    if (favorites.length !== 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const isActive = favorites.includes(postId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = isActive
      ? favorites.filter((id) => id !== postId)
      : [...favorites, postId];

    setFavorites(updatedFavorites);

    if (pathname.slice(3) !== '/favorite') {
      revalidateRoute('/favorite');
    }

    if (isLogged) {
      const syncFavsAsync = async () => {
        setIsPending(true);

        await apiClient.post(
          'favorites/',
          { id: postId },
          { Authorization: `Bearer ${token}` },
        );

        setIsPending(false);
      };

      syncFavsAsync();
    }
  };

  return (
    <Button
      isDisabled={isPending}
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

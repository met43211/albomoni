/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { MouseEventHandler, useEffect } from 'react';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi';
import { useFavorites } from '../lib/use-favorites';

type Props = {
  postId: number;
};

export const AddToFavoritesButton = ({ postId }: Props) => {
  const { isLogged } = useSession();
  const { favorites, setFavorites } = useFavorites();

  useEffect(() => {
    const storedItems = localStorage.getItem('favorites');
    if (storedItems) {
      setFavorites(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    if (favorites.length !== 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const isActive = favorites.includes(postId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogged) {
      const updatedFavorites = isActive
        ? favorites.filter((id) => id !== postId)
        : [...favorites, postId];

      setFavorites(updatedFavorites);
    } else {
      return;
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

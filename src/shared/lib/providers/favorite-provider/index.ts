/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useFavorites } from '@albomoni/features/add-to-favorites/lib/use-favorites';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useSession } from '../../hooks/use-session';

type Props = {
  children: React.ReactNode;
};

export const FavoriteProvider = ({ children }: Props) => {
  const token = getCookie('token');
  const { setFavorites, setIsPending } = useFavorites();
  const { isLogged } = useSession();

  useEffect(() => {
    const loadFavorites = async () => {
      if (token) {
        const resp = await apiClient.get<number[]>(
          'favorites/',
          {},
          { Authorization: `Bearer ${token}` },
        );
        setFavorites(resp);
        setIsPending(false);
      } else {
        const favorites = localStorage.getItem('favorites') || '[]';
        setFavorites(JSON.parse(favorites as string));
        setIsPending(false);
      }
    };

    loadFavorites();
  }, [isLogged]);

  return children;
};

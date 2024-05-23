/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useFavorites } from '@albomoni/features/add-to-favorites/lib/use-favorites';
import { apiClient } from '@albomoni/shared/api/base';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSession } from '../../hooks/use-session';

type Props = {
  children: React.ReactNode;
};

export const FavoriteProvider = ({ children }: Props) => {
  const token = getCookie('token');
  const [, , deleteCookie] = useCookies();
  const { setFavorites, setIsPending } = useFavorites();
  const { isLogged } = useSession();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const resp = await apiClient.get<number[]>(
          'favorites/',
          {},
          { Authorization: `Bearer ${token}` },
        );
        setFavorites(resp);
        setIsPending(false);
      } catch {
        deleteCookie('token');
        window.location.reload();
      }
    };

    if (token) {
      loadFavorites();
    } else {
      const favorites = localStorage.getItem('favorites') || '[]';
      setFavorites(JSON.parse(favorites as string));
      setIsPending(false);
    }
  }, [isLogged]);

  return children;
};

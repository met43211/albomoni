/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { deleteCookie, getCookie } from 'cookies-next';
import { validateTokenAsync } from '../../widgets/header/api';

export const useValidateToken = () => {
  const { isPending, isLogged, setUser, setIsValidToken, setIsPending } =
    useSession();
  const token = getCookie('token');

  useEffect(() => {
    const validateToken = async (tokenStr: string) => {
      try {
        const response = await validateTokenAsync(tokenStr);
        setUser(response);
        setIsValidToken(true);
        setIsPending(false);
      } catch {
        deleteCookie('token');
        setIsPending(false);
        setUser(null);
        setIsValidToken(false);
        return;
      }
    };

    if (token) {
      validateToken(token);
    } else {
      setIsPending(false);
      setUser(null);
      setIsValidToken(false);
    }
  }, [token]);

  return { isLogged, isPending };
};

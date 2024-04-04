/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { validateTokenAsync } from '../../widgets/header/api';

export const useValidateToken = () => {
  const [cookie] = useCookies(['token']);
  const { isPending, isLogged, setUser, setIsValidToken, setIsPending } =
    useSession();
  const { token } = cookie;

  useEffect(() => {
    const validateToken = async (tokenStr: string) => {
      try {
        const response = await validateTokenAsync(tokenStr);
        setUser(response);
        setIsValidToken(true);
        setIsPending(false);
      } catch {
        setIsPending(false);
        return;
      }
    };

    if (token) {
      validateToken(token);
    } else {
      setIsPending(false);
    }
  }, [token]);

  return { isLogged, isPending };
};

/* eslint-disable @typescript-eslint/naming-convention */
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@albomoni/shared/ui/button';
import { useCookies } from 'react-cookie';

export const LogoutButton = () => {
  const [_cookie, _setCookie, removeCookie] = useCookies(['token']);
  const { setUser, setIsValidToken } = useSession();

  const handleClick = () => {
    removeCookie('token');
    setUser(null);
    setIsValidToken(false);
  };

  return (
    <Button
      size='sm'
      color='danger'
      variant='light'
      className='w-full text-sm'
      onPress={handleClick}
    >
      Выход
    </Button>
  );
};

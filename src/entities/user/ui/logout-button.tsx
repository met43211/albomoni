/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from '@albomoni/shared/ui/button';
import { useCookies } from 'react-cookie';
import { LuLogOut } from 'react-icons/lu';

export const LogoutButton = () => {
  const [_cookie, _setCookie, removeCookie] = useCookies(['token']);


  const handleClick = () => {
    removeCookie('token');
  };

  return (
    <Button
      size='sm'
      color='danger'
      variant='light'
      className='w-full text-sm justify-between'
      onPress={handleClick}
    >
      Выход
      <LuLogOut size={16} />
    </Button>
  );
};

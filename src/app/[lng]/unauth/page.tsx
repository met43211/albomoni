/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function UnAuth() {
  const [_cookies, _setCookie, removeCookie] = useCookies();
  const router = useRouter();

  removeCookie('token');
  
  router.push('/');
}

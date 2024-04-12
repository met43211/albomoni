/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { permanentRedirect } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function UnAuth() {
  const [_cookies, _setCookie, removeCookie] = useCookies();

  removeCookie('token');
  permanentRedirect('/');
}

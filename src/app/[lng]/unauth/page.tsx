/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { deleteCookie } from 'cookies-next';
import { permanentRedirect } from 'next/navigation';

export default function UnAuth() {
  deleteCookie('token');
  permanentRedirect('/');

  return null;
}

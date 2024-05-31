'use server';

import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function addCookie(key: string, value: string) {
  setCookie(key, value, { cookies });
}

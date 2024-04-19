'use server';

import { cookies } from 'next/headers';

export default async function removeCookie(key: string) {
  cookies().delete(key);
}

'use server';

import { cookies } from 'next/headers';

export default async function addCookie(key: string, value: string) {
  cookies().set(key, value);
}

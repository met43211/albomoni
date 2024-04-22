/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return children;
}

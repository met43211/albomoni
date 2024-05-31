'use client';

import { ReactNode, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useSession } from '../../hooks/use-session';

type Props = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const [locationLocal] = useLocalStorage('location');
  const { user, isPending } = useSession();

  useEffect(() => {
    if (!locationLocal && !user && !isPending) {
      console.log('un');
    }
  }, [isPending]);

  return children;
};

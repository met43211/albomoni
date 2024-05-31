'use client';

import { ReactNode, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useSession } from '../../hooks/use-session';

type Props = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const [locationLocal] = useLocalStorage('location');
  const { user } = useSession();

  useEffect(() => {
    if (!locationLocal && !user) {
      console.log('un');
    }
  }, []);

  return children;
};

'use client';

import { ReactNode, useEffect } from 'react';
import { useGeolocation, useLocalStorage } from 'react-use';
import { useSession } from '../../hooks/use-session';
import { useModal } from '../modal/lib/use-modal';
import { EModalStates } from '../modal/model/modal-states.enum';

type Props = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const [locationLocal] = useLocalStorage('location');
  const { user, isPending } = useSession();
  const location = useGeolocation();

  const { setModalState } = useModal();

  useEffect(() => {
    if (!locationLocal && !user && !isPending && !location.loading) {
      console.log(location);
      setModalState(EModalStates.LOCATION);
    }
  }, [isPending, location.loading]);

  return children;
};

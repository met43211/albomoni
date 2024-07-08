'use client';

import { ReactNode, useEffect } from 'react';
import { getGeolocation } from '@albomoni/shared/api/get-geolocation';
import { googleGeosuggest } from '@albomoni/shared/api/get-google-geosuggest';
import { getCookie, setCookie } from 'cookies-next';
import { saveLocation } from '@albomoni/shared/api/save-location';
import { useSession } from '../../hooks/use-session';
import { useModal } from '../modal/lib/use-modal';
import { EModalStates } from '../modal/model/modal-states.enum';
import { parseLocation } from '../../utils/parse-location';

type Props = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const cookieLocation = getCookie('location');
  const { user, isPending } = useSession();
  const token = getCookie('token');

  const { setModalState } = useModal();
  const userLocation = user?.address;

  useEffect(() => {
    if (!cookieLocation && !isPending) {
      const getGeo = async () => {
        try {
          const resp = await getGeolocation();
          const resp2 = await googleGeosuggest(
            resp.latitude.toString(),
            resp.longitude.toString(),
          );

          const location = parseLocation(resp2.results[0]);

          if (token) {
            try {
              await saveLocation(location, token);
            } catch {
              return;
            }
          }

          setCookie('location', location);
          setModalState(EModalStates.LOCATION);
        } catch {
          return;
        }
      };

      if (userLocation) {
        const { address, city, country, country_code, lat, lon } = user;

        setCookie('location', {
          address,
          city,
          country,
          country_code,
          lat,
          lon,
        });
      } else {
        getGeo();
      }
    }
  }, [isPending]);

  return children;
};

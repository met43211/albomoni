'use client';

import { ReactNode, useEffect } from 'react';
import { getGeolocation } from '@albomoni/shared/api/get-geolocation';
import { googleGeosuggest } from '@albomoni/shared/api/get-google-geosuggest';
import { getCookie, setCookie } from 'cookies-next';
import { saveLocation } from '@albomoni/shared/api/save-location';
import { useSession } from '../../hooks/use-session';
import { useModal } from '../modal/lib/use-modal';
import { EModalStates } from '../modal/model/modal-states.enum';

type Props = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: Props) => {
  const cookieLocation = getCookie('location');
  const { isPending } = useSession();
  const token = getCookie('token');

  const { setModalState } = useModal();

  useEffect(() => {
    if (!cookieLocation && !isPending) {
      const getGeo = async () => {
        try {
          const resp = await getGeolocation();
          const resp2 = await googleGeosuggest(
            resp.latitude.toString(),
            resp.longitude.toString(),
          );
          const address = resp2.results[0].formatted_address;
          const [city, country] = address.split(', ');

          const location = {
            city,
            country,
            address,
            lat: resp.latitude,
            lon: resp.longitude,
            country_code: resp.country_code,
            region_code: resp.region_code,
          };

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

      getGeo();
    }
  }, [isPending]);

  return children;
};

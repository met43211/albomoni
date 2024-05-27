import { apiClient } from '@albomoni/shared/api/base';

export const saveLocation = (
  country_iso_code: string,
  region_iso_code: string,
  geoname_id: string,
  token: string,
) =>
  apiClient.post(
    'location/',
    { country_iso_code, region_iso_code, geoname_id },
    { Authorization: `Bearer ${token}` },
  );

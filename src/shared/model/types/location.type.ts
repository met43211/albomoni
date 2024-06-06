export type TLocation = {
  address: string;
  city: string;
  country: string;
  country_code: string;
  lat: number | (() => number);
  lon: number | (() => number);
  region_code?: string | null;
};

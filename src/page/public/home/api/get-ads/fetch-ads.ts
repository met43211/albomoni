import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';

export const fetchAds = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  const address = getLocation();
  const [_key, page] = queryKey;

  try {
    return await apiClient.put<Ad[]>(`ad/page/${page}`, address);
  } catch (error) {
    throw new Error('Error fetching ads');
  }
};

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const fetchAds = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  const [_key, page] = queryKey;
  try {
    return await apiClient.get<Ad[]>(`ad/page/${page}`);
  } catch (error) {
    throw new Error('Error fetching ads');
  }
};

import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getAdAsync = async (adId: string) =>
  apiClient.get<Ad>(`ad/${adId}`);

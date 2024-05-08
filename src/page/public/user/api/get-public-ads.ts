import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getPublicAds = async (
  userId: string,
  status: 'active' | 'ended',
) => apiClient.post<Ad[]>('ads-public/', { userId, status });

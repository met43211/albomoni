import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getFavoritesAsync = async (favoritesIds: number[]) =>
  apiClient.post<Ad[]>('ad', {
    favorites: favoritesIds,
  });

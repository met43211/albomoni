import { Ad } from '@albomoni/entities/ad/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getAdsAsync = async () => apiClient.get<Ad[]>('ad/');

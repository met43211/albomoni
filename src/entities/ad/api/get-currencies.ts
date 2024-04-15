import { apiClient } from '@albomoni/shared/api/base';

export const getCurrenciesAsync = async () => apiClient.get('currency/');

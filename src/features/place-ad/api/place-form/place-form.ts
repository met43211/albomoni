import { apiClient } from '@albomoni/shared/api/base';
import { PlaceFormInputData, PlaceFormOutputData } from './place-form.type';

export const placeFormAsync = async (queries: PlaceFormInputData) =>
  apiClient.post<PlaceFormOutputData>('place-form/', queries);

import { queryOptions } from '@tanstack/react-query';
import { getContacts } from './get-contacts';

export const GetContactsQuery = (user_id: number, token: string) =>
  queryOptions({
    queryKey: ['get-contacts'],
    queryFn: () => getContacts(user_id, token),
  });

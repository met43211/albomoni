'use client';

import { ProtectedRouteMessage } from '@albomoni/shared/ui/protected-route';
import { getCookie } from 'cookies-next';

type Props = {
  children: React.ReactNode;
};

export default function AuthTemplate({ children }: Props) {
  const token = getCookie('token');

  return token ? children : <ProtectedRouteMessage />;
}

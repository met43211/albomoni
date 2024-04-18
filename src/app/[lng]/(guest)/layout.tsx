import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
  const token = cookies().get('token');

  if (token?.value) {
    permanentRedirect('/login');
  }

  return children;
}

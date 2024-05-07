import { User } from '@albomoni/entities/user';
import { getUserPublic } from '@albomoni/entities/user/api/get-user-public';
import { cookies } from 'next/headers';

type Props = {
  lng: string;
  userId: string;
};

export const UserPage = async ({ lng, userId }: Props) => {
  cookies();
  const user = await getUserPublic(userId);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <User user={user} />
      </div>
    </main>
  );
};

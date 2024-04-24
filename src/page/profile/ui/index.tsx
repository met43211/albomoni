import { cookies } from 'next/headers';
import { LogoutButton } from '@albomoni/features/auth/logout';
import { getCookie } from 'cookies-next';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { ProfileMainControls } from './main-controls';
import { ProfileSecondaryControls } from './secondary-controls';
import { ProfileUser } from './user';

export const ProfilePage = async () => {
  const token = getCookie('token', { cookies });
  const user = await getUserAsync(token as string);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Профиль
        </h2>
        <ProfileUser user={user} />
        <ProfileMainControls />
        <ProfileSecondaryControls user={user} />
        <LogoutButton />
      </div>
    </main>
  );
};

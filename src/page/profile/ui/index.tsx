import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import { LogoutButton } from '@albomoni/features/auth/logout';
import { UserSkeleton } from './user-skeleton';
import { ProfileMainControls } from './main-controls';
import { ProfileSecondaryControls } from './secondary-controls';

const DynamicProfileUser = dynamic(
  () => import('./user').then((mod) => mod.ProfileUser),
  {
    loading: () => <UserSkeleton />,
  },
);

export const ProfilePage = () => {
  cookies();
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Профиль
        </h2>
        <DynamicProfileUser />
        <ProfileMainControls />
        <ProfileSecondaryControls />
        <LogoutButton />
      </div>
    </main>
  );
};

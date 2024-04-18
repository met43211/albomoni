import {
  PiCaretRightBold,
  PiPencilSimpleBold,
  PiWalletBold,
} from 'react-icons/pi';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProfileUser } from './user';

export const ProfilePage = () => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Профиль
        </h2>
        <Suspense>
          <ProfileUser />
        </Suspense>

        <div className='w-full grid md:grid-cols-2 gap-4 md:gap-6'>
          <Link href='/profile/wallet'>
            <button
              type='button'
              className='w-full shadow-base px-5 py-4 dark:bg-default-100 rounded-2xl font-medium flex justify-between items-center hover:scale-[1.02] active:scale-[0.98] transition-transform'
            >
              <div className='flex gap-3 items-center'>
                <PiPencilSimpleBold size={18} />
                Управление профилем
              </div>
              <PiCaretRightBold size={18} className='opacity-50' />
            </button>
          </Link>

          <Link href='/profile/wallet'>
            <button
              type='button'
              className='w-full shadow-base px-5 py-4 dark:bg-default-100 rounded-2xl font-medium flex justify-between items-center hover:scale-[1.02] active:scale-[0.98] transition-transform'
            >
              <div className='flex gap-3 items-center'>
                <PiWalletBold size={18} />
                Кошелёк
              </div>
              <PiCaretRightBold size={18} className='opacity-50' />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

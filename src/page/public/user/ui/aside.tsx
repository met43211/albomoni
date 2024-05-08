'use client';

import { User } from '@albomoni/entities/user';
import { PublicUserType } from '@albomoni/entities/user/model/user.type';
import { Rating } from '@albomoni/shared/ui/rating';
import { Button, Divider } from '@nextui-org/react';
import { PiCaretRightBold, PiInfoBold, PiLinkBold } from 'react-icons/pi';

type Props = {
  user: PublicUserType;
};

export const UserAside = ({ user }: Props) => {
  const { rate, feedback } = user;

  return (
    <aside className='w-full lg:max-w-96 flex flex-col gap-4 flex-shrink-0'>
      <User user={user} />

      <div className='w-full rounded-2xl bg-default overflow-clip'>
        <button
          type='button'
          className='w-full p-4 active:bg-black/10 dark:active:bg-white/10 transition-background text-start flex justify-between items-center'
        >
          <div className='w-full flex gap-3 items-center'>
            <PiInfoBold size={20} className='flex-shrink-0' />
            <p className='font-medium'>Информация</p>
          </div>
          <PiCaretRightBold size={20} className='flex-shrink-0 opacity-50' />
        </button>

        <Divider />
        <button
          type='button'
          className='w-full p-4 active:bg-black/10 dark:active:bg-white/10  transition-background text-start flex justify-between items-center'
        >
          <div className='w-full flex gap-3 items-center'>
            <div className='flex flex-col gap-2'>
              <p className='font-medium'>Отзывы</p>
              <Rating value={rate} feedback={feedback} />
            </div>
          </div>
          <PiCaretRightBold size={20} className='flex-shrink-0 opacity-50' />
        </button>
      </div>
      <Button
        size='lg'
        className='font-medium'
        startContent={<PiLinkBold size={20} className='flex-shrink-0' />}
      >
        Скопировать ссылку
      </Button>
    </aside>
  );
};

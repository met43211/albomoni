'use client';

import { User } from '@albomoni/entities/user';
import { PublicUserType } from '@albomoni/entities/user/model/user.type';
import { CopyLinkButton } from '@albomoni/features/copy-link';
import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Rating } from '@albomoni/shared/ui/rating';
import { Divider } from '@nextui-org/react';
import { PiCaretRightBold, PiInfoBold } from 'react-icons/pi';

type Props = {
  user: PublicUserType;
};

export const UserAside = ({ user }: Props) => {
  const { setModalState, setModalData } = useModal();

  const { rate, feedback, user_id } = user;

  const handleOpenReviews = () => {
    setModalData({ user_id });
    setModalState(EModalStates.SET_REVIEW);
  };

  return (
    <aside className='w-full lg:max-w-96 lg:sticky top-6 h-min flex flex-col gap-4 flex-shrink-0'>
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
          onClick={handleOpenReviews}
          className='w-full p-4 active:bg-black/10 dark:active:bg-white/10  transition-background text-start flex justify-between items-center'
        >
          <div className='w-full flex gap-3 items-center'>
            <div className='flex flex-col gap-2'>
              <p className='font-medium'>Оценки</p>
              <Rating value={rate} feedback={feedback} />
            </div>
          </div>
          <PiCaretRightBold size={20} className='flex-shrink-0 opacity-50' />
        </button>
      </div>

      <CopyLinkButton />
    </aside>
  );
};

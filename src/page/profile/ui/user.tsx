'use client';

import { UserAvatar } from '@albomoni/entities/user';
import { UserType } from '@albomoni/entities/user/model/user.type';
import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { PiCaretRightBold } from 'react-icons/pi';

type Props = {
  user: UserType;
};

export const ProfileUser = ({ user }: Props) => {
  const { setModalState } = useModal();

  const handleClick = () => {
    setModalState(EModalStates.SUBSCRIPTION);
  };

  return (
    <div className='w-full flex flex-row gap-2 md:gap-4' onClick={handleClick}>
      <div className='w-20 h-20 lg:w-28 lg:h-28 flex-shrink-0 p-2'>
        <UserAvatar src={user.avatar} isSubscribed={user.subscription} />
      </div>
      <div className='w-full flex flex-col justify-center'>
        <h3 className='text-xl md:text-2xl font-semibold'>{user.first_name}</h3>

        {user.subscription ? (
          <button type='button' className='flex gap-2 items-center '>
            <p className='font-medium text-primary'>Albomoni Pro</p>
            <PiCaretRightBold size={16} className='mt-[2px] text-primary' />
          </button>
        ) : (
          <button type='button' className='flex gap-2 items-center opacity-50'>
            <p className='font-medium'>Стандартный аккаунт</p>
            <PiCaretRightBold size={16} className='mt-[2px]' />
          </button>
        )}
      </div>
    </div>
  );
};

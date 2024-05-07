'use client';

import { parseDate } from '@albomoni/shared/lib/utils/parse-date';
import { Button } from '@nextui-org/button';
import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { UserAvatar } from './user-avatar';
import { PublicUserType } from '../model/user.type';

type Props = {
  user: PublicUserType;
};

export const User = ({ user }: Props) => {
  const { avatar, subscription, first_name, regDate } = user;
  const { setModalState } = useModal();

  const { date } = parseDate(regDate);

  const handleClick = () => {
    setModalState(EModalStates.SUBSCRIPTION);
  };

  return (
    <div className='w-full flex flex-row gap-2 md:gap-4 text-start items-center'>
      <div className='w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 p-2'>
        <UserAvatar src={user.avatar} isSubscribed={user.subscription} />
      </div>
      <div className='w-full flex flex-col justify-center'>
        <h3 className='text-xl md:text-2xl font-semibold'>{user.first_name}</h3>
        {subscription ? (
          <Button
            onPress={handleClick}
            className='w-min h-8 text-sm mt-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-800 to-red-600'
          >
            Albomoni Pro
          </Button>
        ) : (
          <Button
            onPress={handleClick}
            className='w-min h-8 text-sm mt-2 rounded-full font-semibold'
          >
            Стандартный аккаунт
          </Button>
        )}
      </div>
    </div>
  );
};
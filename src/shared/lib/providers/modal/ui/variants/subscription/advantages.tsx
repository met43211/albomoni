/* eslint-disable react-hooks/exhaustive-deps */

import { UserAvatar } from '@albomoni/entities/user';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  EModalStates,
  ESubscriptionStates,
} from '../../../model/modal-states.enum';
import { cancelSubscription } from '../../../api/cancel-subscription';
import { useModal } from '../../../lib/use-modal';

type Props = {
  setScreen: (state: ESubscriptionStates) => void;
};

export const ModalSubscriptionAdvantages = ({ setScreen }: Props) => {
  const { user } = useSession();
  const token = getCookie('token');
  const router = useRouter();
  const { setModalState } = useModal();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    setScrollPosition(event.target.scrollTop);
  };

  const handleClickConfirm = () => {
    setScreen(ESubscriptionStates.CONFIRMATION);
  };

  const handleClickCancel = async () => {
    await cancelSubscription(token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  return (
    <>
      <ScrollShadow
        hideScrollBar
        onPointerDownCapture={(e) => {
          if (scrollPosition > 0) {
            e.stopPropagation();
          }
        }}
        onScroll={handleScroll}
        className='w-full h-full flex flex-col gap-5 items-center p-8 flex-shrink'
      >
        <div className='w-32 h-32'>
          <UserAvatar src={user?.avatar as string} isSubscribed isBig />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-red-500 inline-block text-transparent bg-clip-text'>
            Albomoni Pro
          </h1>
          <h2 className='text-lg text-white opacity-50 font-medium text-center'>
            Получите больше с единой подпиской.
          </h2>
        </div>
        <div className='w-1 h-[700px] flex-shrink-0' />
      </ScrollShadow>

      <div className='w-full flex items-center justify-center flex-shrink-0 p-6 pt-0'>
        {user?.subscription ? (
          <Button
            size='lg'
            className='w-full font-medium text-white bg-neutral-800'
            onPress={handleClickCancel}
          >
            Отменить подписку
          </Button>
        ) : (
          <Button
            size='lg'
            onPress={handleClickConfirm}
            className='w-full bg-gradient-to-r to-indigo-700 from-red-500 font-medium text-white'
          >
            Оформить за 5000 ₽ в месяц
          </Button>
        )}
      </div>
    </>
  );
};

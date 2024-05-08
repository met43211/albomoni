'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { PiPlayCircleBold, PiTrendUpBold } from 'react-icons/pi';

type Props = {
  id: number;
  status: 'active' | 'moderating' | 'archived' | 'ended';
};

export const StartAdButton = ({ id, status }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClick = () => {
    setModalState(EModalStates.START_AD);
    setModalData({ id, status });
  };

  const isArchived = status === 'archived';

  return (
    <Button
      onPress={handleClick}
      size='lg'
      color={isArchived ? 'success' : 'primary'}
      variant='shadow'
      className='w-full flex-shrink-0 font-semibold'
    >
      {isArchived ? (
        <>
          <PiPlayCircleBold size={24} />
          Запустить объявление
        </>
      ) : (
        <>
          <PiTrendUpBold size={24} />
          Продвижение
        </>
      )}
    </Button>
  );
};

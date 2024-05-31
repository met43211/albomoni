/* eslint-disable jsx-a11y/no-autofocus */

import { Button } from '@nextui-org/button';
import { ModalScrollableArea } from '../../scrollable-area';
import { useModal } from '../../../lib/use-modal';

import { EModalStates } from '../../../model/modal-states.enum';

export const ModalVariantLocation = () => {
  const { setModalState } = useModal();

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>Выбор региона</h1>
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex gap-4'>
        <Button
          onPress={() => setModalState(EModalStates.NULL)}
          size='lg'
          className='w-full font-medium'
        >
          Подтвердить
        </Button>
      </div>
    </>
  );
};

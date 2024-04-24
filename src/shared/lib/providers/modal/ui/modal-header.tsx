import { useModal } from '../lib/use-modal';
import { EModalStates } from '../model/modal-states.enum';

export const ModalHeader = () => {
  const { modalState, setModalState } = useModal();

  const handleClose = () => {
    setModalState(EModalStates.NULL);
  };

  return <div className='flex gap-2 items-start justify-between' />;
};

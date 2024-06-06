import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/button';
import { parseDate } from '@albomoni/shared/lib/utils/parse-date';
import { ModalScrollableArea } from '../../scrollable-area';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';

export const ModalVariantUserInfo = () => {
  const { setModalState } = useModal();
  const { user } = useSelector((state: RootState) => state.modal.modalData);
  const { date } = parseDate(user.regDate);
  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Информация о пользователе
        </h1>
        <div className='w-full'>Дата регистрации: {date}</div>
      </ModalScrollableArea>
      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <Button
          onPress={() => setModalState(EModalStates.NULL)}
          size='lg'
          className='w-full font-medium'
        >
          Закрыть
        </Button>
      </div>
    </>
  );
};

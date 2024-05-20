import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { PiPencilSimpleBold, PiTrashBold } from 'react-icons/pi';

type Props = {
  id: number;
  name: string;
  phone: string;
  isNotLast: boolean;
};

export const PhoneItem = ({ id, name, phone, isNotLast }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClickDelete = () => {
    setModalData({ id, name, phone });
    setModalState(EModalStates.EDIT_DELETE_PHONE);
  };

  return (
    <>
      <div className='flex gap-2 items-center'>
        <div className='text-lg select-text font-medium flex flex-col items-start w-full'>
          <h4>{name}</h4>
          <h5 className='opacity-50 font-normal'>{phone}</h5>
        </div>

        <Button
          size='sm'
          isIconOnly
          radius='lg'
          variant='flat'
          className='mt-[2px] text-danger flex-shrink-0'
          onPress={handleClickDelete}
          startContent={<PiTrashBold size={18} />}
        />
      </div>
      {isNotLast && <Divider />}
    </>
  );
};

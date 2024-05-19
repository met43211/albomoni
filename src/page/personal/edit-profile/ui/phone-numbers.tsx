'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import { Fragment } from 'react';
import { PiPencilSimpleBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';

type Props = {
  numbers: { phone: string; name: string }[];
};

export const EditPhoneNumbers = ({ numbers }: Props) => {
  const { setModalState } = useModal();

  const handleClickAdd = () => {
    setModalState(EModalStates.EDIT_ADD_PHONE);
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='w-full flex gap-4 items-center pb-3'>
        <h3 className='opacity-50 font-medium'>Номера телефонов</h3>
        <Button
          size='sm'
          className='w-fit'
          radius='full'
          startContent={<PiPlusBold />}
          onPress={handleClickAdd}
        >
          Добавить
        </Button>
      </div>

      {numbers.length > 0 ? (
        numbers.map(({ phone, name }, index) => (
          <Fragment key={phone}>
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
                className='mt-[2px] ml-1 flex-shrink-0'
                startContent={<PiPencilSimpleBold size={18} />}
              />
              <Button
                size='sm'
                isIconOnly
                radius='lg'
                variant='flat'
                className='mt-[2px] text-danger flex-shrink-0'
                startContent={<PiTrashBold size={18} />}
              />
            </div>
            {index < numbers.length - 1 && <Divider />}
          </Fragment>
        ))
      ) : (
        <NotificationBubble>
          У вас еще нет номеров, привязанных к этой учётной записи. Добавьте
          один.
        </NotificationBubble>
      )}
    </div>
  );
};

import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import { PiPencilSimpleBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';

type Props = {
  numbers: { number: string; title: string }[];
};

export const EditPhoneNumbers = ({ numbers }: Props) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='w-full flex gap-4 items-center pb-3'>
        <h3 className='opacity-50 font-medium'>Номера телефонов</h3>
        <Button
          size='sm'
          className='w-fit'
          radius='full'
          startContent={<PiPlusBold />}
        >
          Добавить
        </Button>
      </div>

      {numbers.map(({ number, title }, index) => (
        <>
          <div key={number} className='flex gap-2 items-center'>
            <div className='text-lg select-text font-medium flex flex-col items-start w-full'>
              <h4>{title}</h4>
              <h5 className='opacity-50 font-normal'>{number}</h5>
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
        </>
      ))}
    </div>
  );
};

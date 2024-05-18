import { Button } from '@nextui-org/button';
import { PiPencilSimpleBold } from 'react-icons/pi';

type Props = {
  name: string;
};

export const EditName = ({ name }: Props) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <h3 className='opacity-50 font-medium'>Имя</h3>

      <div className='w-full flex gap-4 items-center'>
        <h4 className='text-2xl font-semibold'>{name}</h4>
        <Button
          size='sm'
          isIconOnly
          className='w-fit'
          radius='full'
          startContent={<PiPencilSimpleBold size={18} />}
        />
      </div>
    </div>
  );
};

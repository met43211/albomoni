import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { PiPlusBold, PiTrashBold, PiUser } from 'react-icons/pi';

type Props = {
  url: string | null;
};

export const EditAvatar = ({ url }: Props) => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <h3 className='opacity-50 font-medium'>Аватар</h3>
      <div className='w-full flex gap-4 items-center'>
        <Avatar
          src={url || undefined}
          classNames={{ base: 'w-32 h-32 flex-shrink-0' }}
          icon={<PiUser className='w-1/2 h-1/2 opacity-30' />}
        />
        <div className='w-full flex flex-col gap-3'>
          <Button
            size='md'
            radius='full'
            className='w-fit'
            startContent={<PiPlusBold />}
          >
            {url ? ' Изменить' : 'Загрузить'}
          </Button>
          <Button
            isDisabled={!url}
            size='md'
            radius='full'
            className='w-fit text-danger'
            startContent={<PiTrashBold />}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

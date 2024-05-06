import { Button } from '@nextui-org/button';

import { LuArchive } from 'react-icons/lu';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { stopAd } from '../../../api/stop-ad';

export const ModalVariantStopAd = () => {
  const { setModalState, modalData } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie('token');

  const handleClick = async () => {
    setIsLoading(true);
    const handleStatus = 'archived';
    await stopAd(modalData.id, handleStatus, token as string);

    setModalState(EModalStates.NULL);
    revalidateRoute('/profile/my-ads');
    revalidateRoute(`/profile/my-ads/ad/${modalData.id}`);
  };

  return (
    <div className='p-6 flex flex-col gap-6 items-center'>
      <h1 className='text-xl font-semibold text-white mt-2'>
        Остановка объявления
      </h1>
      <p className='font-medium opacity-50 text-white text-center'>
        Вы уверены, что хотите убрать это объявление из общего доступа и
        перенести его в личный архив? Запусть запись повторно можно будет в
        любой момент.
      </p>

      <Button
        isLoading={isLoading}
        onPress={handleClick}
        size='lg'
        variant='solid'
        className='w-full font-semibold gap-2 mt-2 bg-neutral-800 text-neutral-200'
      >
        <LuArchive size={22} />
        Перенести в архив
      </Button>
    </div>
  );
};

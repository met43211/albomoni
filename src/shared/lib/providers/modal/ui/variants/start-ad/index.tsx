import { Button } from '@nextui-org/button';

import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { PiPlayCircleBold } from 'react-icons/pi';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { stopAd } from '../../../api/stop-ad';

export const ModalVariantStartAd = () => {
  const { setModalState, modalData } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie('token');
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    setScrollPosition(event.target.scrollTop);
  };

  const handleClick = async () => {
    setIsLoading(true);
    const handleStatus = 'moderating';
    await stopAd(modalData.id, handleStatus, token as string);

    setModalState(EModalStates.NULL);
    revalidateRoute('/profile/my-ads');
    revalidateRoute(`/profile/my-ads/ad/${modalData.id}`);
  };

  return (
    <>
      <ScrollShadow
        hideScrollBar
        onPointerDownCapture={(e) => {
          if (scrollPosition > 0) {
            e.stopPropagation();
          }
        }}
        onScroll={handleScroll}
        className='w-full h-full flex flex-col gap-6 items-center p-6 flex-shrink'
      >
        <h1 className='text-xl font-semibold mt-2'>
          Запуск объявления
        </h1>

        <p className='text-sm font-medium opacity-50 text-start'>
          Отправляя объявление на модерацию, вы подтверждаете, что ознакомились
          с правилами платформы. Проверка объявления может занимать от пары
          часов до нескольких суток.
        </p>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Оплата</h2>
          <div className='w-full flex gap-2 flex-wrap'>
            <Button radius='full' className='h-8 font-medium'>
              <p>Раз в месяц</p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                Раз в неделю <span className='font-bold'>+30₽</span>
              </p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                Раз в сутки <span className='font-bold'>+50₽</span>
              </p>
            </Button>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Поднять просмотры</h2>
          <div className='w-full flex gap-2 flex-wrap'>
            <Button radius='full' className='h-8 font-medium'>
              <p> Без продвижения</p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                В 3 раза <span className='font-bold'>+100₽</span>
              </p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                В 5 раз <span className='font-bold'>+200₽</span>
              </p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                В 7 раз <span className='font-bold'>+250₽</span>
              </p>
            </Button>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Оформление</h2>
          <div className='w-full flex gap-2 flex-wrap'>
            <Button radius='full' className='h-8 font-medium'>
              <p>Стандартное</p>
            </Button>

            <Button radius='full' className='h-8 font-medium'>
              <p>
                Выделить цену <span className='font-bold'>+100₽</span>
              </p>
            </Button>
            <Button radius='full' className='h-8 font-medium'>
              <p>
                Выделить запись <span className='font-bold'>+300₽</span>
              </p>
            </Button>
          </div>
        </div>
      </ScrollShadow>

      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <div className='w-full flex flex-col flex-shrink-0'>
          <h2 className='font-medium text-neutral-500'>
            Итоговая стоимость размещения
          </h2>
          <p className='text-xl font-semibold'>100 ₽ / сутки</p>
        </div>

        <Button
          isLoading={isLoading}
          onPress={handleClick}
          size='lg'
          variant='shadow'
          color='success'
          className='w-full font-semibold gap-2 flex-shrink-0'
        >
          <PiPlayCircleBold size={22} />
          Оплатить 3000 ₽ и запустить
        </Button>
      </div>
    </>
  );
};

import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { PiPlayCircleBold } from 'react-icons/pi';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { PromoteOption } from './promote-option';
import { getPromotionPlans } from '../../../api/get-promotion-plans';
import { setPromotionPlan } from '../../../api/set-promotion-plan';
import {
  PromotionVariants,
  PromotionVariantsType,
} from '../../../config/promotion-variants';

export type PromoOptions = 'null' | 'x3' | 'x5' | 'x7';

export const ModalVariantPromoteAd = () => {
  const token = getCookie('token');
  const router = useRouter();
  const { setModalState, modalData } = useModal();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeOption, setActiveOption] = useState<PromoOptions>(
    modalData.plan,
  );

  const currOption = PromotionVariants.find(({ id }) => modalData.plan === id);

  const [currentOption] = useState<PromotionVariantsType>(
    currOption as PromotionVariantsType,
  );

  const { data, isLoading } = useQuery({
    queryKey: ['promotion-options'],
    queryFn: () =>
      getPromotionPlans(
        {
          category: 'real_estate',
          currency: 'RUB',
          price: 100000,
        },
        token as string,
      ),
  });

  const handleClick = async () => {
    await setPromotionPlan(
      { ad: modalData.id, plan: activeOption },
      token as string,
    );

    // const newCurrOption = PromotionVariants.find(
    //   ({ id }) => activeOption === id,
    // );

    setModalState(EModalStates.NULL);
    router.refresh();
  };

  const handleScroll = (event: any) => {
    setScrollPosition(event.target.scrollTop);
  };

  const closeModal = () => {
    setModalState(EModalStates.NULL);
  };

  if (isLoading) {
    return (
      <div className='w-full h-dvh flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const otherOptions = PromotionVariants.filter(
    ({ id }) => id !== currentOption.id,
  );

  const findPrice = (title: PromoOptions) =>
    data?.plans.find(({ name }) => name === title)?.cost;

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
        <h1 className='text-xl font-semibold mt-2'>Продвижение объявления</h1>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Текущий тариф</h2>
          <PromoteOption
            title={currentOption.title}
            id={currentOption.id}
            price={findPrice(currentOption.id) as number}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            properties={currentOption.properties}
          />
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Другие тарифы</h2>
          <div className='w-full flex gap-2 flex-wrap'>
            {otherOptions.map(({ id, title, properties }) => (
              <PromoteOption
                id={id}
                key={id}
                title={title}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                price={findPrice(id) as number}
                properties={properties}
              />
            ))}
          </div>
          <p className='text-sm opacity-50 text-start pt-4'>
            Оплата за продвижение снимается раз в сутки с баланса вашего
            аккаунта. Вы можете отменить продвижение или поменять тариф в любой
            момент времени. При отмене продвижения оплаченный ранее тариф
            действует сутки с момента подтверждения последней оплаты. При
            нехватке средств на аккаунте для продолжения продвижения, тариф
            автоматически сменится на стандартный.
          </p>
        </div>
      </ScrollShadow>

      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <div className='w-full flex flex-col flex-shrink-0'>
          <h2 className='font-medium text-neutral-500'>
            Баланс профиля
            <Button
              as={Link}
              href='/profile/wallet/billing'
              onPress={closeModal}
              variant='faded'
              color='primary'
              radius='full'
              size='sm'
              className='ml-2 h-6 font-medium'
            >
              Пополнить
            </Button>
          </h2>
          <p className='text-xl font-semibold'>5000 ₽</p>
        </div>

        <Button
          isDisabled={activeOption === currentOption.id}
          onPress={handleClick}
          size='lg'
          variant='shadow'
          color={activeOption === 'null' ? 'default' : 'primary'}
          className='w-full font-semibold gap-2 flex-shrink-0'
        >
          {currentOption.id !== 'null' ? (
            <>
              <PiPlayCircleBold size={22} />
              Cменить тариф
            </>
          ) : (
            <>
              {' '}
              <PiPlayCircleBold size={22} />
              Запустить продвижение
            </>
          )}
        </Button>
      </div>
    </>
  );
};

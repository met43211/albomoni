/* eslint-disable jsx-a11y/no-autofocus */

import { Button } from '@nextui-org/button';
import { PiArrowCircleRightBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../lib/use-modal';
import { ModalScrollableArea } from '../../scrollable-area';
import { EModalStates } from '../../../model/modal-states.enum';
import { RatingStars } from './rating-stars';
import { GetReviewStatsQuery } from '../../../api/(reviews)/get-reviews-stats/query';
import { setReview } from '../../../api/(reviews)/set-review/set-review-stats';

export const ModalVariantSetReview = () => {
  const { setModalState, modalData } = useModal();
  const token = getCookie('token');
  const router = useRouter();

  const { data, isLoading, isFetching } = useQuery(
    GetReviewStatsQuery(modalData.user_id, token as string),
  );

  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(data?.rate || 0);
  }, [data]);

  const handleSetRating = async () => {
    await setReview(modalData.user_id, rating, token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-[307px] flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          {data?.rate ? 'Изменить оценку' : 'Оценить продавца'}
        </h1>
        <RatingStars rating={rating} setRating={setRating} />
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex gap-4'>
        <Button
          size='lg'
          onPress={() => setModalState(EModalStates.NULL)}
          className='w-full font-semibold gap-2'
        >
          Отмена
        </Button>
        <Button
          isDisabled={rating < 1}
          size='lg'
          variant='shadow'
          color='primary'
          onPress={handleSetRating}
          className='w-full font-semibold gap-2'
          startContent={<PiArrowCircleRightBold size={18} />}
        >
          Отправить
        </Button>
      </div>
    </>
  );
};

/* eslint-disable react/jsx-props-no-spreading */
import { Checkbox } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<{
    'card-number': number;
    sum: number;
  }>;
};

export const PaymentWidget = ({ register }: Props) => {
  return (
    <div className='w-full md:max-w-[50%] flex flex-col gap-4'>
      <p className='font-medium opacity-50'>Введите данные карты</p>

      <div className='flex flex-col gap-4'>
        <input
          type='tel'
          inputMode='numeric'
          autoComplete='cc-number'
          placeholder='Номер карты'
          // ref={inputNumberRef}
          {...register('card-number')}
          className='bg-default rounded-2xl px-4 h-12 w-full'
        />
        <div className='flex flex-row gap-4'>
          <input
            type='tel'
            inputMode='numeric'
            autoComplete='cc-exp'
            placeholder='Срок действия'
            // ref={inputDateRef}
            className='bg-default rounded-2xl px-4 h-12 w-full'
          />
          <input
            type='tel'
            inputMode='numeric'
            autoComplete='cc-csc'
            placeholder='CVV'
            // ref={inputCvvRef}
            className='bg-default rounded-2xl px-4 h-12 w-full'
          />
        </div>
        <input
          type='email'
          placeholder='Email для получения чека'
          className='bg-default rounded-2xl px-4 h-12 w-full'
        />
        <Checkbox>Сохранить карту</Checkbox>
      </div>
    </div>
  );
};

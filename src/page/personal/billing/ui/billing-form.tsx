/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AnimatePresence, m } from 'framer-motion';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { useCookies } from 'react-cookie';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { useEffect, useState } from 'react';
import { PiWalletBold } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { PaymentWidget } from '@albomoni/widgets/payment-widget';
import { BillingSchema } from '../model/schema';

declare global {
  interface Window {
    cp: any;
  }
}

export const BillingForm = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [isSave, setIsSave] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BillingSchema),
  });

  const [normSum, setNormSum] = useState('100');
  const { currency } = cookies;

  useEffect(() => {
    const setPrice = async () => {
      const currencies: any = await getCurrenciesAsync();

      setNormSum(
        normalizePrice({
          price: 100,
          currency,
          adCurrency: currency,
          currencies,
        }),
      );
    };

    setPrice();
  }, []);

  const onSubmit = async (data: any) => {
    const fieldValues = {
      cvv: data.cvv,
      cardNumber: data['card-number'],
      expDateMonth: data['card-date'].slice(0, 2),
      expDateYear: data['card-date'].slice(3),
    };
    console.log(isSave);
    if (window.cp) {
      const checkout = new window.cp.Checkout({
        publicId: 'pk_96b8fadfcdfac511e6ef7015016e3',
      });
      checkout.createPaymentCryptogram(fieldValues).then((cryptogram: any) => {
        console.log(cryptogram);
      });
    }

    // const { sum } = data;
    // const body = { sum, currency };

    // const response = await fetch(
    //   'https://ansaratracker.store/pay-service/bill/',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${cookies.token}`,
    //     },
    //     body: JSON.stringify(body),
    //   },
    // );

    // const paymentData = await response.json();
    // const {
    //   confirmation: { confirmation_url },
    // } = paymentData;

    // router.push(confirmation_url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-6 relative'
    >
      <input
        min='1'
        step='any'
        type='text'
        className='w-full max-w-[500px] text-5xl md:text-7xl bg-transparent outline-none font-semibold'
        placeholder={normSum}
        inputMode='numeric'
        {...register('sum')}
      />

      <PaymentWidget
        register={register}
        isSave={isSave}
        setIsSave={setIsSave}
      />

      <AnimatePresence>
        {Object.entries(errors).map(([key, error]) => (
          <m.div key={key} layout className='w-full md:max-w-[600px]'>
            <NotificationBubble type='error'>
              {error.message}
            </NotificationBubble>
          </m.div>
        ))}
      </AnimatePresence>

      <m.button
        type='submit'
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='w-full md:w-fit h-12 px-6 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold  flex items-center gap-3 justify-center mt-4'
      >
        <PiWalletBold size={20} />
        Оплатить
      </m.button>
    </form>
  );
};

import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PiPlusCircleBold } from 'react-icons/pi';

export const WalletPage = async () => {
  const currency = cookies().get('currency');
  const token = cookies().get('token');

  const user = await getUserAsync(token?.value as string);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Кошелёк
        </h2>
        <h3 className='text-5xl md:text-7xl font-semibold'>
          {normalizePrice({
            price: user.money,
            currency: currency?.value,
            adCurrency: user.currency,
          })}
        </h3>
        <Link href='/profile/wallet/billing'>
          <button
            type='button'
            className='w-full md:w-fit h-12 px-6 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 justify-center'
          >
            <PiPlusCircleBold size={20} />
            Пополнить баланс
          </button>
        </Link>

        <h2 className='text-xl md:text-2xl font-bold mt-10 md:mt-10 w-full'>
          История транзакций
        </h2>
      </div>
    </main>
  );
};

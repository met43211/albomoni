import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { Balance } from '@albomoni/widgets/profile/balance';
import { Transactions } from '@albomoni/widgets/profile/transactions';
import { cookies } from 'next/headers';

export const WalletPage = async () => {
  const token = cookies().get('token');
  const user = await getUserAsync(token?.value as string);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <Balance user={user} />
        <Transactions />
      </div>
    </main>
  );
};

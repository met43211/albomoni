import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { AdsContainer } from './ads-container';

export const HomeAdsList = async ({ lng }: { lng: string }) => {
  const currencies = await getCurrenciesAsync();

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <AdsContainer currencies={currencies} />
    </div>
  );
};
